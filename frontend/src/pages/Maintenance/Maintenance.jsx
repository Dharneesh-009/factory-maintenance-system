
import { useEffect, useState } from "react";
import maintenanceService from "../../services/maintenanceService";
import machineService from "../../services/machineService";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/maintenance.css";

const initialFormData = {
  machineId: "",
  technicianId: "",
  maintenanceDate: "",
  description: "",
  status: "PENDING",
};

const Maintenance = () => {
  const { role } = useAuthContext();
  const isAdmin = String(role || "")
    .replace("ROLE_", "")
    .toUpperCase() === "ADMIN";

  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // View modal state
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  // Add maintenance state
  const [showAddModal, setShowAddModal] = useState(false);
  const [machines, setMachines] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

// Edit maintenance state
const [showEditModal, setShowEditModal] = useState(false);
const [editingMaintenance, setEditingMaintenance] = useState(null);
const [editFormData, setEditFormData] = useState(initialFormData);
const [editError, setEditError] = useState("");
const [editSuccess, setEditSuccess] = useState("");
const [editSaving, setEditSaving] = useState(false);

// Status update state
const [updatingStatusId, setUpdatingStatusId] = useState(null);
const [statusError, setStatusError] = useState("");

  useEffect(() => {
    loadMaintenance();
  }, []);

  // Load all maintenance records
  const loadMaintenance = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await maintenanceService.getAllMaintenance();

      console.log("MAINTENANCE DATA RECEIVED:", data);

      setMaintenanceRecords(data);
    } catch (err) {
      console.error("MAINTENANCE LOAD ERROR:", err);
      setError("Failed to load maintenance records.");
    } finally {
      setLoading(false);
    }
  };

  // Open the Add Maintenance modal and load dropdown data
  const handleOpenAddModal = async () => {
    setShowAddModal(true);
    setAddError("");
    setAddSuccess("");
    setFormData(initialFormData);
    setDropdownLoading(true);

    try {
      const [machineData, technicianData] = await Promise.all([
        machineService.getAllMachines(),
        maintenanceService.getAllTechnicians(),
      ]);

      setMachines(Array.isArray(machineData) ? machineData : []);
      setTechnicians(Array.isArray(technicianData) ? technicianData : []);
    } catch (err) {
      console.error("DROPDOWN LOAD ERROR:", err);
      setAddError(
        "Failed to load machines or technicians. Please try again."
      );
    } finally {
      setDropdownLoading(false);
    }
  };

// Open Edit Maintenance modal
const handleOpenEditModal = async (maintenance) => {
  setEditError("");
  setEditSuccess("");
  setEditingMaintenance(maintenance);
  setShowEditModal(true);
  setDropdownLoading(true);

  try {
    const [machineData, technicianData, maintenanceData] =
      await Promise.all([
        machineService.getAllMachines(),
        maintenanceService.getAllTechnicians(),
        maintenanceService.getMaintenanceById(maintenance.id),
      ]);

    setMachines(Array.isArray(machineData) ? machineData : []);
    setTechnicians(Array.isArray(technicianData) ? technicianData : []);

    setEditFormData({
      machineId: String(maintenanceData.machineId ?? ""),
      technicianId: String(maintenanceData.technicianId ?? ""),
      maintenanceDate: maintenanceData.maintenanceDate ?? "",
      description: maintenanceData.description ?? "",
      status: maintenanceData.status ?? "PENDING",
    });
  } catch (err) {
    console.error("EDIT MAINTENANCE LOAD ERROR:", err);
    setEditError("Failed to load maintenance details. Please try again.");
  } finally {
    setDropdownLoading(false);
  }
};

  // Handle form field changes
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


const handleEditFormChange = (event) => {
  const { name, value } = event.target;

  setEditFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
};

  // Create a new maintenance record
  const handleCreateMaintenance = async (event) => {
    event.preventDefault();

    setAddError("");
    setAddSuccess("");

    if (
      !formData.machineId ||
      !formData.maintenanceDate ||
      !formData.description.trim() ||
      !formData.status
    ) {
      setAddError("Please complete all required fields.");
      return;
    }

    const maintenanceData = {
      machineId: Number(formData.machineId),
      technicianId: formData.technicianId
        ? Number(formData.technicianId)
        : null,
      maintenanceDate: formData.maintenanceDate,
      description: formData.description.trim(),
      status: formData.status,
    };

    try {
      setSaving(true);

      await maintenanceService.createMaintenance(maintenanceData);
await loadMaintenance();

setFormData(initialFormData);
setShowAddModal(false);

window.alert("Maintenance record created successfully!");
    } catch (err) {
      console.error("CREATE MAINTENANCE ERROR:", err);

      setAddError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to create maintenance record. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  
  // Save edited maintenance record
  const handleUpdateMaintenance = async (event) => {
    event.preventDefault();

    setEditError("");
    setEditSuccess("");

    if (
      !editingMaintenance ||
      !editFormData.machineId ||
      !editFormData.maintenanceDate ||
      !editFormData.description.trim() ||
      !editFormData.status
    ) {
      setEditError("Please complete all required fields.");
      return;
    }

    const maintenanceData = {
      machineId: Number(editFormData.machineId),
      technicianId: editFormData.technicianId
        ? Number(editFormData.technicianId)
        : null,
      maintenanceDate: editFormData.maintenanceDate,
      description: editFormData.description.trim(),
      status: editFormData.status,
    };

    try {
      setEditSaving(true);

      await maintenanceService.updateMaintenance(
        editingMaintenance.id,
        maintenanceData
      );

      await loadMaintenance();

      setShowEditModal(false);
      setEditingMaintenance(null);
      setEditFormData(initialFormData);

      window.alert("Maintenance record updated successfully!");
    } catch (err) {
      console.error("UPDATE MAINTENANCE ERROR:", err);

      setEditError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update maintenance record. Please try again."
      );
    } finally {
      setEditSaving(false);
    }
  };

  
  // Update maintenance status only
  const handleUpdateStatus = async (maintenance, newStatus) => {
    setStatusError("");

    if (!maintenance?.id || !newStatus) {
      setStatusError("Invalid maintenance record or status.");
      return;
    }

    try {
      setUpdatingStatusId(maintenance.id);

      await maintenanceService.updateMaintenanceStatus(
        maintenance.id,
        newStatus
      );

      await loadMaintenance();

      if (
        selectedMaintenance &&
        selectedMaintenance.id === maintenance.id
      ) {
        const updatedDetails =
          await maintenanceService.getMaintenanceById(
            maintenance.id
          );

        setSelectedMaintenance(updatedDetails);
      }

      window.alert("Maintenance status updated successfully!");
    } catch (err) {
      console.error("UPDATE MAINTENANCE STATUS ERROR:", err);

      setStatusError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update maintenance status. Please try again."
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };


 // Delete a maintenance record (ADMIN only)
const handleDeleteMaintenance = async (maintenance) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete the maintenance record for ${
      maintenance.machineName || "this machine"
    }?`
  );

  if (!confirmed) {
    return;
  }

  try {
    await maintenanceService.deleteMaintenance(maintenance.id);

    await loadMaintenance();

    window.alert("Maintenance record deleted successfully!");
  } catch (err) {
    console.error("DELETE MAINTENANCE ERROR:", err);

    window.alert(
      err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete maintenance record. Please try again."
    );
  }
};


  // Close Add Maintenance modal
  const closeAddModal = () => {
    if (saving) return;

    setShowAddModal(false);
    setFormData(initialFormData);
    setAddError("");
    setAddSuccess("");
  };

  // View maintenance details
  const handleView = async (id) => {
    try {
      setViewLoading(true);
      setSelectedMaintenance(null);
      setShowViewModal(true);

      const data = await maintenanceService.getMaintenanceById(id);

      console.log("MAINTENANCE DETAILS:", data);

      setSelectedMaintenance(data);
    } catch (err) {
      console.error("VIEW MAINTENANCE ERROR:", err);
      setSelectedMaintenance(null);
    } finally {
      setViewLoading(false);
    }
  };

  // Close View Details modal
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedMaintenance(null);
  };

  return (
    <div className="maintenance-page">
      {/* PAGE HEADER */}
      <div className="maintenance-heading">
        <div>
          <h1>Maintenance</h1>
          <p>Manage and monitor machine maintenance</p>
        </div>

        {isAdmin && (
          <button
            type="button"
            className="maintenance-add-btn"
            onClick={handleOpenAddModal}
          >
            + Add Maintenance
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="maintenance-content">
        <div className="maintenance-table-header">
          <div>
            <h2>Maintenance Records</h2>
            <p>View machine maintenance activities</p>
          </div>
        </div>

        <div className="maintenance-table-wrapper">
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Machine</th>
                <th>Model</th>
                <th>Technician</th>
                <th>Email</th>
                <th>Maintenance Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="8" className="maintenance-table-message">
                    Loading maintenance records...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td
                    colSpan="8"
                    className="maintenance-table-message error"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                maintenanceRecords.length === 0 && (
                  <tr>
                    <td colSpan="8" className="maintenance-table-message">
                      No maintenance records found.
                    </td>
                  </tr>
                )}

              {!loading &&
                !error &&
                maintenanceRecords.map((maintenance) => (
                  <tr key={maintenance.id}>
                    <td>
                      <div className="maintenance-machine-name">
                        {maintenance.machineName}
                      </div>
                    </td>

                    <td>{maintenance.machineModel}</td>

                    <td>
                      <div className="maintenance-technician-name">
                        {maintenance.technicianName || "Not assigned"}
                      </div>
                    </td>

                    <td>
                      <div className="maintenance-technician-email">
                        {maintenance.technicianEmail || "—"}
                      </div>
                    </td>

                    <td>{maintenance.maintenanceDate}</td>

                    <td>{maintenance.description}</td>

                    <td>
                      <span
                        className={`maintenance-status ${
                          maintenance.status
                            ?.toLowerCase()
                            .replace("_", "-")
                        }`}
                      >
                        {maintenance.status}
                      </span>
                    </td>

                    <td>

                        {statusError && (
    <div className="maintenance-error" role="alert">
      {statusError}
    </div>
  )}
                      
<div className="maintenance-actions">
  <button
    type="button"
    className="maintenance-action-btn"
    onClick={() => handleView(maintenance.id)}
  >
    View
  </button>

  {isAdmin && (
    <button
      type="button"
      className="maintenance-action-btn"
      onClick={() => handleOpenEditModal(maintenance)}
    >
      Edit
    </button>
  )}


{isAdmin && (
  <button
    type="button"
    className="maintenance-action-btn maintenance-delete-btn"
    onClick={() => handleDeleteMaintenance(maintenance)}
  >
    Delete
  </button>
)}

  <select
    className="maintenance-status-select"
    value={maintenance.status || "PENDING"}
    onChange={(event) =>
      handleUpdateStatus(maintenance, event.target.value)
    }
    disabled={updatingStatusId === maintenance.id}
    aria-label="Update maintenance status"
  >
    <option value="PENDING">Pending</option>
    <option value="IN_PROGRESS">In Progress</option>
    <option value="COMPLETED">Completed</option>
  </select>
</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MAINTENANCE MODAL */}
      {showAddModal && (
        <div className="maintenance-modal-overlay">
          <div
            className="maintenance-modal maintenance-add-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-maintenance-title"
          >
            <div className="maintenance-modal-header">
              <div>
                <h2 id="add-maintenance-title">Add Maintenance</h2>
                <p>Create a maintenance record for a machine</p>
              </div>

              <button
                type="button"
                className="maintenance-modal-close"
                onClick={closeAddModal}
                disabled={saving}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {dropdownLoading ? (
              <div className="maintenance-modal-loading">
                Loading machines and technicians...
              </div>
            ) : (
              <form
                className="maintenance-add-form"
                onSubmit={handleCreateMaintenance}
              >
                {addError && (
                  <div className="maintenance-form-error" role="alert">
                    {addError}
                  </div>
                )}

                <div className="maintenance-form-group">
                  <label htmlFor="machineId">
                    Machine <span>*</span>
                  </label>

                  <select
                    id="machineId"
                    name="machineId"
                    value={formData.machineId}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select a machine</option>

                    {machines.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.name} — {machine.model} (
                        {machine.serialNumber})
                      </option>
                    ))}
                  </select>

                  {machines.length === 0 && (
                    <small>No machines available.</small>
                  )}
                </div>

                <div className="maintenance-form-group">
                  <label htmlFor="technicianId">Technician</label>

                  <select
                    id="technicianId"
                    name="technicianId"
                    value={formData.technicianId}
                    onChange={handleFormChange}
                  >
                    <option value="">No technician assigned</option>

                    {technicians.map((technician) => (
                      <option key={technician.id} value={technician.id}>
                        {technician.name} ({technician.email})
                      </option>
                    ))}
                  </select>

                  <small>Technician assignment is optional.</small>
                </div>

                <div className="maintenance-form-group">
                  <label htmlFor="maintenanceDate">
                    Maintenance Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    id="maintenanceDate"
                    name="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="maintenance-form-group">
                  <label htmlFor="status">
                    Status <span>*</span>
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <div className="maintenance-form-group">
                  <label htmlFor="description">
                    Description <span>*</span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Describe the maintenance work..."
                    rows="4"
                    required
                  />
                </div>

                <div className="maintenance-add-form-footer">
                  <button
                    type="button"
                    className="maintenance-cancel-btn"
                    onClick={closeAddModal}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="maintenance-submit-btn"
                    disabled={saving || dropdownLoading}
                  >
                    {saving ? "Saving..." : "Save Maintenance"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}



{/* Edit Maintenance Modal */}
{showEditModal && (
  <div className="maintenance-modal-overlay">
    <div className="maintenance-modal">
      <div className="maintenance-modal-header">
        <h2>Edit Maintenance</h2>

        <button
          type="button"
          className="maintenance-modal-close"
          onClick={() => setShowEditModal(false)}
          disabled={editSaving}
        >
          &times;
        </button>
      </div>

      {editError && (
        <div className="maintenance-error" role="alert">
          {editError}
        </div>
      )}

      <form onSubmit={handleUpdateMaintenance}>
        {dropdownLoading ? (
          <p>Loading maintenance details...</p>
        ) : (
          <>
            <div className="maintenance-form-group">
              <label htmlFor="edit-machineId">Machine *</label>
              <select
                id="edit-machineId"
                name="machineId"
                value={editFormData.machineId}
                onChange={handleEditFormChange}
                required
              >
                <option value="">Select a machine</option>
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name} — {machine.model} ({machine.serialNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="maintenance-form-group">
              <label htmlFor="edit-technicianId">Technician</label>
              <select
                id="edit-technicianId"
                name="technicianId"
                value={editFormData.technicianId}
                onChange={handleEditFormChange}
              >
                <option value="">Unassigned</option>
                {technicians.map((technician) => (
                  <option key={technician.id} value={technician.id}>
                    {technician.name || technician.fullName || technician.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="maintenance-form-group">
              <label htmlFor="edit-maintenanceDate">
                Maintenance Date *
              </label>
              <input
                id="edit-maintenanceDate"
                type="date"
                name="maintenanceDate"
                value={editFormData.maintenanceDate}
                onChange={handleEditFormChange}
                required
              />
            </div>

            <div className="maintenance-form-group">
              <label htmlFor="edit-status">Status *</label>
              <select
                id="edit-status"
                name="status"
                value={editFormData.status}
                onChange={handleEditFormChange}
                required
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="maintenance-form-group">
              <label htmlFor="edit-description">Description *</label>
              <textarea
                id="edit-description"
                name="description"
                value={editFormData.description}
                onChange={handleEditFormChange}
                rows={4}
                required
              />
            </div>

            <div className="maintenance-modal-actions">
              <button
                type="button"
                className="maintenance-cancel-btn"
                onClick={() => setShowEditModal(false)}
                disabled={editSaving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="maintenance-submit-btn"
                disabled={editSaving || dropdownLoading}
              >
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  </div>
)}


      {/* VIEW MAINTENANCE MODAL */}
      {showViewModal && (
        <div className="maintenance-modal-overlay">
          <div className="maintenance-modal">
            <div className="maintenance-modal-header">
              <div>
                <h2>Maintenance Details</h2>
                <p>View maintenance record information</p>
              </div>

              <button
                type="button"
                className="maintenance-modal-close"
                onClick={closeViewModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {viewLoading ? (
              <div className="maintenance-modal-loading">
                Loading maintenance details...
              </div>
            ) : selectedMaintenance ? (
              <div className="maintenance-details">
                <div className="maintenance-detail-section">
                  <h3>Machine Information</h3>

                  <div className="maintenance-detail-grid">
                    <div className="maintenance-detail-item">
                      <span>Machine Name</span>
                      <strong>{selectedMaintenance.machineName}</strong>
                    </div>

                    <div className="maintenance-detail-item">
                      <span>Model</span>
                      <strong>{selectedMaintenance.machineModel}</strong>
                    </div>

                    <div className="maintenance-detail-item">
                      <span>Serial Number</span>
                      <strong>
                        {selectedMaintenance.machineSerialNumber}
                      </strong>
                    </div>

                    <div className="maintenance-detail-item">
                      <span>Location</span>
                      <strong>{selectedMaintenance.machineLocation}</strong>
                    </div>

                    <div className="maintenance-detail-item">
                      <span>Machine Status</span>
                      <strong>{selectedMaintenance.machineStatus}</strong>
                    </div>
                  </div>
                </div>

                <div className="maintenance-detail-section">
                  <h3>Maintenance Information</h3>

                  <div className="maintenance-detail-grid">
                    <div className="maintenance-detail-item">
                      <span>Technician</span>
                      <strong>
                        {selectedMaintenance.technicianName || "Not assigned"}
                      </strong>
                    </div>

                    <div className="maintenance-detail-item">
                      <span>Technician Email</span>
                      <strong>
                        {selectedMaintenance.technicianEmail || "—"}
                      </strong>
                    </div>

                    <div className="maintenance-detail-item">
                      <span>Maintenance Date</span>
                      <strong>{selectedMaintenance.maintenanceDate}</strong>
                    </div>

                    <div className="maintenance-detail-item">
                      <span>Status</span>
                      <strong>{selectedMaintenance.status}</strong>
                    </div>

                    <div className="maintenance-detail-item maintenance-detail-full">
                      <span>Description</span>
                      <strong>{selectedMaintenance.description}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="maintenance-modal-loading">
                Unable to load maintenance details.
              </div>
            )}

            <div className="maintenance-modal-footer">
              <button
                type="button"
                className="maintenance-modal-close-btn"
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;