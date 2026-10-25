
import { useEffect, useState } from "react";
import breakdownService from "../../services/breakdownService";
import "../../styles/breakdowns.css";

import machineService from "../../services/machineService";
import maintenanceService from "../../services/maintenanceService";
import { useAuthContext } from "../../context/AuthContext";

const initialFormData = {
  machineId: "",
  technicianId: "",
  description: "",
  priority: "MEDIUM",
  status: "OPEN",
};

const Breakdowns = () => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Breakdown state
  const [showAddModal, setShowAddModal] = useState(false);
  const [machines, setMachines] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  // Edit Breakdown state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBreakdown, setEditingBreakdown] = useState(null);
  const [editFormData, setEditFormData] = useState(initialFormData);
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);


const [showViewModal, setShowViewModal] = useState(false);
const [viewingBreakdown, setViewingBreakdown] = useState(null);
const [viewLoading, setViewLoading] = useState(false);
const [viewError, setViewError] = useState("");


  
  // Breakdown filter state
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { role } = useAuthContext();

  const isAdmin =
    String(role || "")
      .replace("ROLE_", "")
      .toUpperCase() === "ADMIN";

  // Load breakdown records from the backend
  const loadBreakdowns = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await breakdownService.getAllBreakdowns();

      setBreakdowns(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOAD BREAKDOWNS ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load breakdown records. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBreakdowns();
  }, []);

  // Filter breakdowns by priority and status
  const filteredBreakdowns = breakdowns.filter((breakdown) => {
    const priority = String(
      breakdown.priority || "MEDIUM"
    ).toUpperCase();

    const status = String(
      breakdown.status || "OPEN"
    ).toUpperCase();

    const matchesPriority =
      priorityFilter === "ALL" ||
      priority === priorityFilter;

    const matchesStatus =
      statusFilter === "ALL" ||
      status === statusFilter;

    return matchesPriority && matchesStatus;
  });

  // Reset all filters
  const handleResetFilters = () => {
    setPriorityFilter("ALL");
    setStatusFilter("ALL");
  };

  // Open Add Breakdown modal and load dropdown data
  const handleOpenAddModal = async () => {
    setFormError("");
    setFormData(initialFormData);
    setShowAddModal(true);
    setDropdownLoading(true);

    try {
      const [machineData, technicianData] = await Promise.all([
        machineService.getAllMachines(),
        maintenanceService.getAllTechnicians(),
      ]);

      setMachines(Array.isArray(machineData) ? machineData : []);
      setTechnicians(
        Array.isArray(technicianData) ? technicianData : []
      );
    } catch (err) {
      console.error("LOAD BREAKDOWN FORM DATA ERROR:", err);

      setFormError(
        "Failed to load machines or technicians. Please close and try again."
      );
    } finally {
      setDropdownLoading(false);
    }
  };

  // Open Edit Breakdown modal and load existing details
  const handleOpenEditModal = async (breakdown) => {
    setEditError("");
    setEditingBreakdown(breakdown);
    setEditFormData(initialFormData);
    setShowEditModal(true);
    setDropdownLoading(true);

    try {
      const [machineData, technicianData, breakdownData] =
        await Promise.all([
          machineService.getAllMachines(),
          maintenanceService.getAllTechnicians(),
          breakdownService.getBreakdownById(breakdown.id),
        ]);

      setMachines(Array.isArray(machineData) ? machineData : []);
      setTechnicians(
        Array.isArray(technicianData) ? technicianData : []
      );

      setEditFormData({
        machineId: String(breakdownData.machine?.id ?? ""),
        technicianId: String(
          breakdownData.technician?.id ?? ""
        ),
        description: breakdownData.description ?? "",
        priority: breakdownData.priority ?? "MEDIUM",
        status: breakdownData.status ?? "OPEN",
      });
    } catch (err) {
      console.error("LOAD EDIT BREAKDOWN ERROR:", err);

      setEditError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load breakdown details. Please try again."
      );
    } finally {
      setDropdownLoading(false);
    }
  };

  // Handle changes in the Add Breakdown form
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle changes in the Edit Breakdown form
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;

    setEditFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };



const handleOpenViewModal = async (breakdown) => {
  setShowViewModal(true);
  setViewingBreakdown(null);
  setViewError("");
  setViewLoading(true);

  try {
    const response = await breakdownService.getBreakdownById(
      breakdown.id
    );

    const data = response?.data ?? response;
    setViewingBreakdown(data);
  } catch (error) {
    console.error("Error loading breakdown details:", error);

    setViewError(
      error?.response?.data?.message ||
        "Failed to load breakdown details. Please try again."
    );
  } finally {
    setViewLoading(false);
  }
};

  
  // Create a new breakdown record
  const handleCreateBreakdown = async (event) => {
    event.preventDefault();
    setFormError("");

    if (
      !formData.machineId ||
      !formData.description.trim() ||
      !formData.priority ||
      !formData.status
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    const breakdownData = {
      machineId: Number(formData.machineId),
      technicianId: formData.technicianId
        ? Number(formData.technicianId)
        : null,
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
    };

    try {
      setSaving(true);

      await breakdownService.createBreakdown(breakdownData);
      await loadBreakdowns();

      setShowAddModal(false);
      setFormData(initialFormData);

      window.alert("Breakdown reported successfully!");
    } catch (err) {
      console.error("CREATE BREAKDOWN ERROR:", err);

      setFormError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to report breakdown. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Save changes to an existing breakdown
  const handleUpdateBreakdown = async (event) => {
    event.preventDefault();
    setEditError("");

    if (
      !editingBreakdown ||
      !editFormData.machineId ||
      !editFormData.description.trim() ||
      !editFormData.priority ||
      !editFormData.status
    ) {
      setEditError("Please complete all required fields.");
      return;
    }

    const breakdownData = {
      machineId: Number(editFormData.machineId),
      technicianId: editFormData.technicianId
        ? Number(editFormData.technicianId)
        : null,
      description: editFormData.description.trim(),
      priority: editFormData.priority,
      status: editFormData.status,
    };

    try {
      setEditSaving(true);

      await breakdownService.updateBreakdown(
        editingBreakdown.id,
        breakdownData
      );

      await loadBreakdowns();

      setShowEditModal(false);
      setEditingBreakdown(null);
      setEditFormData(initialFormData);

      window.alert("Breakdown updated successfully!");
    } catch (err) {
      console.error("UPDATE BREAKDOWN ERROR:", err);

      setEditError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update breakdown. Please try again."
      );
    } finally {
      setEditSaving(false);
    }
  };

  // Close the Add Breakdown modal
  const handleCloseAddModal = () => {
    if (saving) {
      return;
    }

    setShowAddModal(false);
    setFormData(initialFormData);
    setFormError("");
  };

  // Delete a breakdown record (ADMIN only)
  const handleDeleteBreakdown = async (breakdown) => {
    if (!isAdmin) {
      window.alert("Only ADMIN can delete breakdown records.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete breakdown #${breakdown.id}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await breakdownService.deleteBreakdown(breakdown.id);

      await loadBreakdowns();

      window.alert("Breakdown deleted successfully!");
    } catch (err) {
      console.error("DELETE BREAKDOWN ERROR:", err);

      window.alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to delete breakdown. Please try again."
      );
    }
  };

  // Safely display reported date and time
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return date.toLocaleString();
  };

  return (
    <div className="breakdowns-page">
      {/* Page header */}
      <div className="breakdowns-header">
        <div>
          <h1>Breakdown Management</h1>
          <p>
            Monitor machine breakdowns, assign technicians,
            and track repair progress.
          </p>
        </div>

        <div className="breakdowns-count">
          Total Breakdowns: {breakdowns.length}
        </div>

        <button
          type="button"
          className="breakdowns-add-btn"
          onClick={handleOpenAddModal}
        >
          + Report Breakdown
        </button>
      </div>

      {/* Loading error */}
      {error && (
        <div className="breakdowns-error" role="alert">
          {error}
          <button type="button" onClick={loadBreakdowns}>
            Retry
          </button>
        </div>
      )}

      {/* Loading message */}
      {loading && (
        <div className="breakdowns-message">
          Loading breakdown records...
        </div>
      )}

      {/* Empty state when there are no records */}
      {!loading && !error && breakdowns.length === 0 && (
        <div className="breakdowns-message">
          No breakdown records found.
        </div>
      )}

      {/* Filters and breakdown table */}
      {!loading && !error && breakdowns.length > 0 && (
        <>
          {/* Breakdown filters */}
          <div className="breakdowns-filters">
            <div className="breakdowns-filter-group">
              <label htmlFor="priority-filter">
                Filter by Priority
              </label>

              <select
                id="priority-filter"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >
                <option value="ALL">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div className="breakdowns-filter-group">
              <label htmlFor="status-filter">
                Filter by Status
              </label>

              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="ALL">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <button
              type="button"
              className="breakdowns-reset-filters"
              onClick={handleResetFilters}
              disabled={
                priorityFilter === "ALL" &&
                statusFilter === "ALL"
              }
            >
              Reset Filters
            </button>

            <div className="breakdowns-filter-count">
              Showing {filteredBreakdowns.length} of{" "}
              {breakdowns.length} breakdowns
            </div>
          </div>

          {/* Breakdown table */}
          {filteredBreakdowns.length > 0 ? (
            <div className="breakdowns-table-container">
              <table className="breakdowns-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Machine</th>
                    <th>Technician</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Reported Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBreakdowns.map((breakdown) => {
                    const machine = breakdown.machine;
                    const technician = breakdown.technician;

                    const machineName =
                      machine?.name ||
                      machine?.machineName ||
                      (machine?.id
                        ? `Machine #${machine.id}`
                        : "—");

                    const machineLabel = [
                      machineName,
                      machine?.model,
                    ]
                      .filter(Boolean)
                      .join(" — ");

                    const technicianName = technician
                      ? technician.name ||
                        technician.fullName ||
                        technician.username ||
                        technician.email ||
                        `Technician #${technician.id}`
                      : "Unassigned";

                    const priority =
                      breakdown.priority || "MEDIUM";
                    const status = breakdown.status || "OPEN";

                    return (
                      <tr key={breakdown.id}>
                        <td>{breakdown.id}</td>

                        <td className="breakdowns-machine-name">
                          {machineLabel}
                        </td>

                        <td>{technicianName}</td>

                        <td className="breakdowns-description">
                          {breakdown.description || "—"}
                        </td>

                        <td>
                          <span
                            className={`breakdowns-badge priority-${String(
                              priority
                            ).toLowerCase()}`}
                          >
                            {priority.replace(/_/g, " ")}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`breakdowns-badge status-${String(
                              status
                            ).toLowerCase()}`}
                          >
                            {status.replace(/_/g, " ")}
                          </span>
                        </td>

                        <td>
                          {formatDate(breakdown.reportedDate)}
                        </td>

                        <td>
                          
<div className="breakdowns-row-actions">
  <button
    type="button"
    className="breakdowns-view-btn"
    onClick={() => handleOpenViewModal(breakdown)}
  >
    View
  </button>

  <button
    type="button"
    className="breakdowns-edit-btn"
    onClick={() => handleOpenEditModal(breakdown)}
  >
    Edit
  </button>


                            {isAdmin && (
                              <button
                                type="button"
                                className="breakdowns-delete-btn"
                                onClick={() =>
                                  handleDeleteBreakdown(breakdown)
                                }
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="breakdowns-message">
              No breakdowns match the selected filters.
              <button
                type="button"
                className="breakdowns-reset-filters"
                onClick={handleResetFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Add Breakdown Modal */}
      {showAddModal && (
        <div className="breakdowns-modal-overlay">
          <div
            className="breakdowns-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="breakdowns-modal-title"
          >
            <div className="breakdowns-modal-header">
              <div>
                <h2 id="breakdowns-modal-title">
                  Report Breakdown
                </h2>
                <p>Enter the machine failure details below.</p>
              </div>

              <button
                type="button"
                className="breakdowns-modal-close"
                onClick={handleCloseAddModal}
                disabled={saving}
                aria-label="Close form"
              >
                &times;
              </button>
            </div>

            {formError && (
              <div className="breakdowns-form-error" role="alert">
                {formError}
              </div>
            )}

            {dropdownLoading ? (
              <div className="breakdowns-modal-loading">
                Loading machines and technicians...
              </div>
            ) : (
              <form onSubmit={handleCreateBreakdown}>
                <div className="breakdowns-form-group">
                  <label htmlFor="breakdown-machine">
                    Machine *
                  </label>

                  <select
                    id="breakdown-machine"
                    name="machineId"
                    value={formData.machineId}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select a machine</option>

                    {machines.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.name ||
                          machine.machineName ||
                          `Machine #${machine.id}`}
                        {machine.model
                          ? ` — ${machine.model}`
                          : ""}
                        {machine.serialNumber
                          ? ` (${machine.serialNumber})`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="breakdowns-form-group">
                  <label htmlFor="breakdown-technician">
                    Assign Technician
                  </label>

                  <select
                    id="breakdown-technician"
                    name="technicianId"
                    value={formData.technicianId}
                    onChange={handleFormChange}
                  >
                    <option value="">Unassigned</option>

                    {technicians.map((technician) => (
                      <option
                        key={technician.id}
                        value={technician.id}
                      >
                        {technician.name ||
                          technician.fullName ||
                          technician.username ||
                          technician.email ||
                          `Technician #${technician.id}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="breakdowns-form-row">
                  <div className="breakdowns-form-group">
                    <label htmlFor="breakdown-priority">
                      Priority *
                    </label>

                    <select
                      id="breakdown-priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
                  </div>

                  <div className="breakdowns-form-group">
                    <label htmlFor="breakdown-status">
                      Status *
                    </label>

                    <select
                      id="breakdown-status"
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">
                        In Progress
                      </option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="breakdowns-form-group">
                  <label htmlFor="breakdown-description">
                    Breakdown Description *
                  </label>

                  <textarea
                    id="breakdown-description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Describe the machine failure or problem..."
                    rows={4}
                    maxLength={500}
                    required
                  />

                  <span className="breakdowns-character-count">
                    {formData.description.length}/500 characters
                  </span>
                </div>

                <div className="breakdowns-modal-actions">
                  <button
                    type="button"
                    className="breakdowns-cancel-btn"
                    onClick={handleCloseAddModal}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="breakdowns-submit-btn"
                    disabled={saving || dropdownLoading}
                  >
                    {saving ? "Reporting..." : "Report Breakdown"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Edit Breakdown Modal */}
      {showEditModal && (
        <div className="breakdowns-modal-overlay">
          <div
            className="breakdowns-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-breakdown-title"
          >
            <div className="breakdowns-modal-header">
              <div>
                <h2 id="edit-breakdown-title">
                  Edit Breakdown
                </h2>
                <p>Update the breakdown details below.</p>
              </div>

              <button
                type="button"
                className="breakdowns-modal-close"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingBreakdown(null);
                  setEditError("");
                }}
                disabled={editSaving}
                aria-label="Close edit form"
              >
                &times;
              </button>
            </div>

            {editError && (
              <div className="breakdowns-form-error" role="alert">
                {editError}
              </div>
            )}

            {dropdownLoading ? (
              <div className="breakdowns-modal-loading">
                Loading breakdown details...
              </div>
            ) : (
              <form onSubmit={handleUpdateBreakdown}>
                <div className="breakdowns-form-group">
                  <label htmlFor="edit-breakdown-machine">
                    Machine *
                  </label>

                  <select
                    id="edit-breakdown-machine"
                    name="machineId"
                    value={editFormData.machineId}
                    onChange={handleEditFormChange}
                    required
                  >
                    <option value="">Select a machine</option>

                    {machines.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.name ||
                          machine.machineName ||
                          `Machine #${machine.id}`}
                        {machine.model
                          ? ` — ${machine.model}`
                          : ""}
                        {machine.serialNumber
                          ? ` (${machine.serialNumber})`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="breakdowns-form-group">
                  <label htmlFor="edit-breakdown-technician">
                    Assign Technician
                  </label>

                  <select
                    id="edit-breakdown-technician"
                    name="technicianId"
                    value={editFormData.technicianId}
                    onChange={handleEditFormChange}
                  >
                    <option value="">Unassigned</option>

                    {technicians.map((technician) => (
                      <option
                        key={technician.id}
                        value={technician.id}
                      >
                        {technician.name ||
                          technician.fullName ||
                          technician.username ||
                          technician.email ||
                          `Technician #${technician.id}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="breakdowns-form-row">
                  <div className="breakdowns-form-group">
                    <label htmlFor="edit-breakdown-priority">
                      Priority *
                    </label>

                    <select
                      id="edit-breakdown-priority"
                      name="priority"
                      value={editFormData.priority}
                      onChange={handleEditFormChange}
                      required
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
                  </div>

                  <div className="breakdowns-form-group">
                    <label htmlFor="edit-breakdown-status">
                      Status *
                    </label>

                    <select
                      id="edit-breakdown-status"
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditFormChange}
                      required
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">
                        In Progress
                      </option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="breakdowns-form-group">
                  <label htmlFor="edit-breakdown-description">
                    Breakdown Description *
                  </label>

                  <textarea
                    id="edit-breakdown-description"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    rows={4}
                    maxLength={500}
                    required
                  />

                  <span className="breakdowns-character-count">
                    {editFormData.description.length}/500 characters
                  </span>
                </div>

                <div className="breakdowns-modal-actions">
                  <button
                    type="button"
                    className="breakdowns-cancel-btn"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingBreakdown(null);
                      setEditError("");
                    }}
                    disabled={editSaving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="breakdowns-submit-btn"
                    disabled={editSaving || dropdownLoading}
                  >
                    {editSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      
{showViewModal && (
  <div
    className="breakdowns-modal-overlay"
    onClick={() => setShowViewModal(false)}
  >
    <div
      className="breakdowns-modal"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-breakdown-title"
    >
      <div className="breakdowns-modal-header">
        <h2 id="view-breakdown-title">Breakdown Details</h2>

        <button
          type="button"
          className="breakdowns-modal-close"
          onClick={() => setShowViewModal(false)}
          aria-label="Close breakdown details"
        >
          ×
        </button>
      </div>

      <div className="breakdowns-modal-body">
        {viewLoading ? (
          <p>Loading breakdown details...</p>
        ) : viewError ? (
          <p className="breakdowns-error">{viewError}</p>
        ) : viewingBreakdown ? (
          <div className="breakdowns-view-details">
            <p>
              <strong>Breakdown ID:</strong>{" "}
              {viewingBreakdown.id ?? "N/A"}
            </p>

            <p>
              <strong>Machine:</strong>{" "}
              {viewingBreakdown.machine?.name ?? "N/A"}
            </p>

            <p>
              <strong>Machine Model:</strong>{" "}
              {viewingBreakdown.machine?.model ?? "N/A"}
            </p>

            <p>
              <strong>Serial Number:</strong>{" "}
              {viewingBreakdown.machine?.serialNumber ?? "N/A"}
            </p>

            <p>
              <strong>Technician:</strong>{" "}
              {viewingBreakdown.technician?.name ?? "Unassigned"}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {viewingBreakdown.description ?? "N/A"}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {viewingBreakdown.priority ?? "N/A"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {viewingBreakdown.status ?? "N/A"}
            </p>

            <p>
              <strong>Reported Date:</strong>{" "}
              {viewingBreakdown.reportedDate
                ? formatDate(viewingBreakdown.reportedDate)
                : "N/A"}
            </p>
          </div>
        ) : (
          <p>Breakdown details are unavailable.</p>
        )}
      </div>

      <div className="breakdowns-modal-actions">
        <button
          type="button"
          className="breakdowns-cancel-btn"
          onClick={() => setShowViewModal(false)}
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

export default Breakdowns;