
import { useEffect, useState } from "react";
import sparePartService from "../../services/sparepartService";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/spareParts.css";

const emptyForm = {
  name: "",
  partNumber: "",
  quantity: "",
  minimumStock: "",
  location: "",
};

const SpareParts = () => {
  const { role } = useAuthContext();

  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("ALL");

  const [selectedPart, setSelectedPart] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const isAdmin = role === "ADMIN";

  const loadSpareParts = async (
    search = "",
    filter = "ALL"
  ) => {
    try {
      setLoading(true);
setError("");

      let data;

      if (filter === "LOW") {
        data = await sparePartService.getLowStockParts();

        if (search.trim()) {
          data = data.filter((part) =>
            part.name
              ?.toLowerCase()
              .includes(search.trim().toLowerCase())
          );
        }
      } else if (search.trim()) {
        data = await sparePartService.searchSpareParts(
          search.trim()
        );
      } else {
        data = await sparePartService.getAllSpareParts();
      }

      setSpareParts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load spare parts:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load spare parts. Please try again."
      );
      setSpareParts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpareParts();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    loadSpareParts(value, stockFilter);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setStockFilter(value);
    loadSpareParts(searchTerm, value);
  };

  const handleView = async (id) => {
    try {
      setError("");
      const data = await sparePartService.getSparePartById(id);
      setSelectedPart(data);
      setShowViewModal(true);
    } catch (err) {
      console.error("Failed to load spare-part details:", err);
      setError("Unable to load spare-part details.");
    }
  };

  const openAddModal = () => {
    setEditingPart(null);
    setForm(emptyForm);
    setFormError("");
    setShowFormModal(true);
  };

  const openEditModal = (part) => {
    setEditingPart(part);
    setForm({
      name: part.name ?? "",
      partNumber: part.partNumber ?? "",
      quantity: String(part.quantity ?? ""),
      minimumStock: String(part.minimumStock ?? ""),
      location: part.location ?? "",
    });
    setFormError("");
    setShowFormModal(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!isAdmin) return;

    const quantity = Number(form.quantity);
    const minimumStock = Number(form.minimumStock);

    if (
      !form.name.trim() ||
      !form.partNumber.trim() ||
      !form.location.trim() ||
      form.quantity === "" ||
      form.minimumStock === "" ||
      !Number.isInteger(quantity) ||
      !Number.isInteger(minimumStock) ||
      quantity < 0 ||
      minimumStock < 0
    ) {
      setFormError(
        "Enter valid details. Quantities must be whole numbers and cannot be negative."
      );
      return;
    }

    const payload = {
      name: form.name.trim(),
      partNumber: form.partNumber.trim(),
      quantity,
      minimumStock,
      location: form.location.trim(),
    };

    try {
      setSaving(true);
      setFormError("");

      if (editingPart) {
        await sparePartService.updateSparePart(
          editingPart.id,
          payload
        );
        setMessage("Spare part updated successfully!");
      } else {
        await sparePartService.createSparePart(payload);
        setMessage("Spare part added successfully!");
      }

      setShowFormModal(false);
      setEditingPart(null);

      await loadSpareParts(searchTerm, stockFilter);
    } catch (err) {
      console.error("Failed to save spare part:", err);

      const responseData = err.response?.data;
      const serverMessage =
        typeof responseData === "string"
          ? responseData
          : responseData?.message;

      setFormError(
        serverMessage || "Unable to save spare part."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (part) => {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      `Delete spare part "${part.name}" (${part.partNumber})?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await sparePartService.deleteSparePart(part.id);

      setMessage("Spare part deleted successfully!");
      await loadSpareParts(searchTerm, stockFilter);
    } catch (err) {
      console.error("Failed to delete spare part:", err);

      const responseData = err.response?.data;
      setError(
        typeof responseData === "string"
          ? responseData
          : responseData?.message ||
              "Unable to delete spare part."
      );
    }
  };

  const closeFormModal = () => {
    if (saving) return;
    setShowFormModal(false);
    setEditingPart(null);
    setFormError("");
  };

  return (
    <div className="spare-parts-page">
      <div className="spare-parts-heading">
        <div>
          <h1>Spare Parts</h1>
          <p>Manage spare-part inventory and stock levels</p>
        </div>

        {isAdmin && (
          <button
            type="button"
            className="spare-add-btn"
            onClick={openAddModal}
          >
            + Add Spare Part
          </button>
        )}
      </div>

      <div className="spare-parts-content">
        <div className="spare-table-header">
          <div>
            <h2>Inventory List</h2>
            <p>
              {spareParts.length} spare part
              {spareParts.length === 1 ? "" : "s"} displayed
            </p>
          </div>
        </div>

        <div className="spare-filters">
          <input
            type="text"
            className="spare-search"
            placeholder="Search by spare-part name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <select
            className="spare-stock-filter"
            value={stockFilter}
            onChange={handleFilterChange}
          >
            <option value="ALL">All Stock</option>
            <option value="LOW">Low Stock</option>
          </select>
        </div>

        {message && (
          <div className="spare-message success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="spare-message error" role="alert">
            {error}
          </div>
        )}

        <div className="spare-table-wrapper">
          <table className="spare-table">
            <thead>
              <tr>
                <th>Part Name</th>
                <th>Part Number</th>
                <th>Quantity</th>
                <th>Minimum Stock</th>
                <th>Location</th>
                <th>Stock Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="7" className="spare-table-message">
                    Loading spare parts...
                  </td>
                </tr>
              )}

              {!loading && !error && spareParts.length === 0 && (
                <tr>
                  <td colSpan="7" className="spare-table-message">
                    No spare parts found.
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                spareParts.map((part) => {
                  const lowStock =
                    part.quantity <= part.minimumStock;

                  return (
                    <tr key={part.id}>
                      <td>
                        <div className="spare-part-name">
                          {part.name}
                        </div>
                      </td>

                      <td>{part.partNumber}</td>
                      <td>{part.quantity}</td>
                      <td>{part.minimumStock}</td>
                      <td>{part.location}</td>

                      <td>
                        <span
                          className={`spare-stock-status ${
                            lowStock ? "low" : "available"
                          }`}
                        >
                          {lowStock ? "Low Stock" : "Available"}
                        </span>
                      </td>

                      <td>
                        <div className="spare-actions">
                          <button
                            type="button"
                            className="spare-action-btn"
                            onClick={() => handleView(part.id)}
                          >
                            View
                          </button>

                          {isAdmin && (
                            <>
                              <button
                                type="button"
                                className="spare-action-btn"
                                onClick={() => openEditModal(part)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="spare-action-btn"
                                onClick={() => handleDelete(part)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {showViewModal && (
        <div className="spare-modal-overlay">
          <div className="spare-form">
            <div className="spare-modal-header">
              <div>
                <h2>Spare Part Details</h2>
                <p>View inventory information</p>
              </div>

              <button
                type="button"
                className="spare-modal-close"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedPart(null);
                }}
              >
                ×
              </button>
            </div>

            {selectedPart && (
              <div className="spare-form-fields">
                {[
                  ["Part Name", selectedPart.name],
                  ["Part Number", selectedPart.partNumber],
                  ["Quantity", selectedPart.quantity],
                  ["Minimum Stock", selectedPart.minimumStock],
                  ["Location", selectedPart.location],
                  [
                    "Stock Status",
                    selectedPart.quantity <= selectedPart.minimumStock
                      ? "Low Stock"
                      : "Available",
                  ],
                ].map(([label, value]) => (
                  <div className="spare-form-group" key={label}>
                    <label>{label}</label>
                    <input
                      value={value ?? ""}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="spare-modal-actions">
              <button
                type="button"
                className="spare-cancel-btn"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedPart(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showFormModal && isAdmin && (
        <div className="spare-modal-overlay">
          <form className="spare-form" onSubmit={handleSave}>
            <div className="spare-modal-header">
              <div>
                <h2>
                  {editingPart ? "Edit Spare Part" : "Add Spare Part"}
                </h2>
                <p>
                  {editingPart
                    ? "Update inventory information"
                    : "Register a spare part"}
                </p>
              </div>

              <button
                type="button"
                className="spare-modal-close"
                onClick={closeFormModal}
                disabled={saving}
              >
                ×
              </button>
            </div>

            <div className="spare-form-fields">
              <div className="spare-form-group">
                <label>Part Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Enter part name"
                  required
                />
              </div>

              <div className="spare-form-group">
                <label>Part Number</label>
                <input
                  name="partNumber"
                  value={form.partNumber}
                  onChange={handleFormChange}
                  placeholder="Enter unique part number"
                  required
                />
              </div>

              <div className="spare-form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="0"
                  step="1"
                  value={form.quantity}
                  onChange={handleFormChange}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div className="spare-form-group">
                <label>Minimum Stock</label>
                <input
                  type="number"
                  name="minimumStock"
                  min="0"
                  step="1"
                  value={form.minimumStock}
                  onChange={handleFormChange}
                  placeholder="Enter minimum stock"
                  required
                />
              </div>

              <div className="spare-form-group">
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  placeholder="Enter storage location"
                  required
                />
              </div>
            </div>

            {formError && (
              <div className="spare-message error" role="alert">
                {formError}
              </div>
            )}

            <div className="spare-modal-actions">
              <button
                type="button"
                className="spare-cancel-btn"
                onClick={closeFormModal}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="spare-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingPart
                  ? "Save Changes"
                  : "Add Spare Part"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SpareParts;
