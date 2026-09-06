import { useEffect, useState } from "react";
import machineService from "../../services/machineService";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/machines.css";

const Machines = () => {
  const { role } = useAuthContext();

  console.log("CURRENT USER ROLE:", role);

  // =========================
  // MACHINE DATA
  // =========================

  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // SEARCH & FILTER
  // =========================

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
 // =========================
  // VIEW MACHINE
  // =========================

const [selectedMachine, setSelectedMachine] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);
const [viewLoading, setViewLoading] = useState(false);
const [viewError, setViewError] = useState("");

// =========================
// EDIT MACHINE
// =========================

const [showEditModal, setShowEditModal] = useState(false);
const [editMachine, setEditMachine] = useState(null);
const [editLoading, setEditLoading] = useState(false);
const [editSaving, setEditSaving] = useState(false);
const [editError, setEditError] = useState("");

  // =========================
  // ADD MACHINE MODAL
  // =========================

  const [showAddModal, setShowAddModal] = useState(false);

  const [machineForm, setMachineForm] = useState({
    name: "",
    model: "",
    serialNumber: "",
    location: "",
    status: "RUNNING",
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // =========================
  // FORM INPUT CHANGE
  // =========================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setMachineForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // =========================
  // ADD MACHINE
  // =========================

  const handleAddMachine = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setFormError("");

      const newMachine =
        await machineService.createMachine(machineForm);

      setMachines((previousMachines) => [
        ...previousMachines,
        newMachine,
      ]);

      setMachineForm({
        name: "",
        model: "",
        serialNumber: "",
        location: "",
        status: "RUNNING",
      });

      setShowAddModal(false);

    } catch (err) {
      console.error(
        "Failed to create machine:",
        err
      );

      setFormError(
        err.response?.data ||
        "Unable to create machine."
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================
  // SEARCH & STATUS FILTER
  // =========================

  const handleMachineFilter = async (
    searchValue,
    statusValue
  ) => {
    try {
      setLoading(true);
      setError("");

      let data;

      // Search by machine name
      if (searchValue.trim() !== "") {

        data = await machineService.searchMachines(
          searchValue.trim()
        );

      }

      // Filter by status
      else if (statusValue !== "ALL") {

        data =
          await machineService.getMachinesByStatus(
            statusValue
          );

      }

      // Load all machines
      else {

        data =
          await machineService.getAllMachines();

      }

      setMachines(data);

    } catch (err) {
      console.error(
        "Failed to filter machines:",
        err
      );

      setError(
        "Unable to load machines."
      );

    } finally {
      setLoading(false);
    }
  };
// =========================
  // HANDLE VIEW MACHINE
  // =========================

const handleViewMachine = async (id) => {

  console.log("VIEW BUTTON CLICKED. MACHINE ID:", id);

  try {
    setViewLoading(true);
    setViewError("");

    const data =
      await machineService.getMachineById(id);

    console.log("MACHINE DETAILS RECEIVED:", data);

    setSelectedMachine(data);
    setShowViewModal(true);

  } catch (err) {

    console.error(
      "FAILED TO LOAD MACHINE DETAILS:",
      err
    );

    setViewError(
      "Unable to load machine details."
    );

  } finally {
    setViewLoading(false);
  }
};

// =========================
// HANDLE EDIT MACHINE
// =========================

const handleEditMachine = async (id) => {
  try {
    setEditLoading(true);
    setEditError("");

    const data =
      await machineService.getMachineById(id);

    setEditMachine(data);
    setShowEditModal(true);

  } catch (err) {
    console.error(
      "Failed to load machine for editing:",
      err
    );

    setEditError(
      "Unable to load machine details."
    );

  } finally {
    setEditLoading(false);
  }
};

// =========================
// HANDLE DELETE MACHINE
// =========================

const handleDeleteMachine = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this machine?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await machineService.deleteMachine(id);

    setMachines((previousMachines) =>
      previousMachines.filter(
        (machine) => machine.id !== id
      )
    );

  } catch (err) {
    console.error(
      "Failed to delete machine:",
      err
    );

    setError(
  err.response?.data?.message ||
  "Unable to delete machine."
);
  }
};

  // =========================
  // LOAD ALL MACHINES
  // =========================

  useEffect(() => {
    const loadMachines = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await machineService.getAllMachines();

        setMachines(data);

      } catch (err) {
        console.error(
          "Failed to load machines:",
          err
        );

        setError(
          "Unable to load machines."
        );

      } finally {
        setLoading(false);
      }
    };

    loadMachines();

  }, []);

  // =========================
  // UI
  // =========================

  return (
    <div className="machines-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="machines-heading">

        <div>
          <h1>Machines</h1>

          <p>
            Manage and monitor factory machines
          </p>
        </div>

        {/* ADMIN ONLY */}

        {role === "ADMIN" && (
          <button
            type="button"
            className="add-machine-btn"
            onClick={() => {
              setFormError("");
              setShowAddModal(true);
            }}
          >
            + Add Machine
          </button>
        )}

      </div>

      {/* =========================
          MACHINE CONTENT
      ========================= */}

      <div className="machines-content">

        {/* =========================
            MACHINE TABLE HEADER
        ========================= */}

        <div className="machine-table-header">

          <div>
            <h2>Machine List</h2>

            <p>
              View and manage all factory machines
            </p>
          </div>

        </div>

        {/* =========================
            SEARCH & FILTER
        ========================= */}

        <div className="machine-filters">

          {/* SEARCH */}

          <input
            type="text"
            className="machine-search"
            placeholder="Search machines..."
            value={searchTerm}
            onChange={(event) => {

              const value =
                event.target.value;

              setSearchTerm(value);

              handleMachineFilter(
                value,
                selectedStatus
              );

            }}
          />

          {/* STATUS FILTER */}

          <select
            className="machine-status-filter"
            value={selectedStatus}
            onChange={(event) => {

              const value =
                event.target.value;

              setSelectedStatus(value);

              handleMachineFilter(
                searchTerm,
                value
              );

            }}
          >

            <option value="ALL">
              All Status
            </option>

            <option value="RUNNING">
              Running
            </option>

            <option value="STOPPED">
              Stopped
            </option>

            <option value="MAINTENANCE">
              Maintenance
            </option>

          </select>

        </div>

        {/* =========================
            MACHINE TABLE
        ========================= */}

        <div className="machine-table-wrapper">

          <table className="machine-table">

            <thead>

              <tr>

                <th>
                  Machine
                </th>

                <th>
                  Model
                </th>

                <th>
                  Serial Number
                </th>

                <th>
                  Location
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {/* =========================
                  LOADING
              ========================= */}

              {loading && (
                <tr>

                  <td
                    colSpan="6"
                    className="machine-table-message"
                  >
                    Loading machines...
                  </td>

                </tr>
              )}

              {/* =========================
                  ERROR
              ========================= */}

              {!loading && error && (
                <tr>

                  <td
                    colSpan="6"
                    className="machine-table-message error"
                  >
                    {error}
                  </td>

                </tr>
              )}

              {/* =========================
                  EMPTY
              ========================= */}

              {!loading &&
                !error &&
                machines.length === 0 && (
                  <tr>

                    <td
                      colSpan="6"
                      className="machine-table-message"
                    >
                      No machines found.
                    </td>

                  </tr>
                )}

              {/* =========================
                  MACHINE DATA
              ========================= */}

              {!loading &&
                !error &&
                machines.map((machine) => (

                  <tr key={machine.id}>

                    {/* MACHINE */}

                    <td>

                      <div className="machine-name">
                        {machine.name}
                      </div>

                    </td>

                    {/* MODEL */}

                    <td>
                      {machine.model}
                    </td>

                    {/* SERIAL NUMBER */}

                    <td>
                      {machine.serialNumber}
                    </td>

                    {/* LOCATION */}

                    <td>
                      {machine.location}
                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`machine-status ${
                          machine.status
                            ?.toLowerCase()
                            .replace("_", "-")
                        }`}
                      >
                        {machine.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="machine-actions">

                       <button
      type="button"
      className="machine-action-btn"
      onClick={() => handleViewMachine(machine.id)}
    >
      View
    </button>

       {role === "ADMIN" && (
      <>
        <button
          type="button"
          className="machine-action-btn"
          onClick={() => handleEditMachine(machine.id)}
        >
          Edit
        </button>

        <button
  type="button"
  className="machine-action-btn"
  onClick={() => handleDeleteMachine(machine.id)}
>
  Delete
</button>
      </>
    )}

                      </div>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* =========================
          ADD MACHINE MODAL
      ========================= */}

      {showAddModal && role === "ADMIN" && (

        <div className="machine-modal-overlay">

          <form
            className="machine-form"
            onSubmit={handleAddMachine}
          >

            {/* =========================
                MODAL HEADER
            ========================= */}

            <div className="machine-modal-header">

              <div>

                <h2>
                  Add Machine
                </h2>

                <p>
                  Register a new factory machine
                </p>

              </div>

              <button
                type="button"
                className="machine-modal-close"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                ×
              </button>

            </div>

            {/* =========================
                FORM FIELDS
            ========================= */}

            <div className="machine-form-fields">

              {/* MACHINE NAME */}

              <div className="machine-form-group">

                <label>
                  Machine Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={machineForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter machine name"
                  required
                />

              </div>

              {/* MODEL */}

              <div className="machine-form-group">

                <label>
                  Model
                </label>

                <input
                  type="text"
                  name="model"
                  value={machineForm.model}
                  onChange={handleInputChange}
                  placeholder="Enter machine model"
                  required
                />

              </div>

              {/* SERIAL NUMBER */}

              <div className="machine-form-group">

                <label>
                  Serial Number
                </label>

                <input
                  type="text"
                  name="serialNumber"
                  value={machineForm.serialNumber}
                  onChange={handleInputChange}
                  placeholder="Enter serial number"
                  required
                />

              </div>

              {/* LOCATION */}

              <div className="machine-form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={machineForm.location}
                  onChange={handleInputChange}
                  placeholder="Enter machine location"
                  required
                />

              </div>

              {/* STATUS */}

              <div className="machine-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={machineForm.status}
                  onChange={handleInputChange}
                  required
                >

                  <option value="RUNNING">
                    Running
                  </option>

                  <option value="STOPPED">
                    Stopped
                  </option>

                  <option value="MAINTENANCE">
                    Maintenance
                  </option>

                </select>

              </div>

            </div>



            {/* =========================
                FORM ERROR
            ========================= */}

            {formError && (
              <div className="machine-form-error">
                {formError}
              </div>
            )}

            {/* =========================
                MODAL ACTIONS
            ========================= */}

            <div className="machine-modal-actions">

              <button
                type="button"
                className="machine-cancel-btn"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="machine-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Adding..."
                  : "Add Machine"}
              </button>

            </div>

          </form>

        </div>

      )}
      {/* =========================
          VIEW MACHINE MODAL
      ========================= */}

      {showViewModal && (

        <div className="machine-modal-overlay">

          <div className="machine-form">

            {/* MODAL HEADER */}

            <div className="machine-modal-header">

              <div>

                <h2>
                  Machine Details
                </h2>

                <p>
                  View factory machine information
                </p>

              </div>

              <button
                type="button"
                className="machine-modal-close"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedMachine(null);
                  setViewError("");
                }}
              >
                ×
              </button>

            </div>

            {/* LOADING */}

            {viewLoading && (

              <div className="machine-table-message">
                Loading machine details...
              </div>

            )}

            {/* ERROR */}

            {!viewLoading && viewError && (

              <div className="machine-form-error">
                {viewError}
              </div>

            )}

            {/* MACHINE DETAILS */}

            {!viewLoading &&
              !viewError &&
              selectedMachine && (

                <div className="machine-form-fields">

                  <div className="machine-form-group">

                    <label>
                      Machine Name
                    </label>

                    <input
                      type="text"
                      value={selectedMachine.name || ""}
                      readOnly
                    />

                  </div>

                  <div className="machine-form-group">

                    <label>
                      Model
                    </label>

                    <input
                      type="text"
                      value={selectedMachine.model || ""}
                      readOnly
                    />

                  </div>

                  <div className="machine-form-group">

                    <label>
                      Serial Number
                    </label>

                    <input
                      type="text"
                      value={selectedMachine.serialNumber || ""}
                      readOnly
                    />

                  </div>

                  <div className="machine-form-group">

                    <label>
                      Location
                    </label>

                    <input
                      type="text"
                      value={selectedMachine.location || ""}
                      readOnly
                    />

                  </div>

                  <div className="machine-form-group">

                    <label>
                      Status
                    </label>

                    <input
                      type="text"
                      value={selectedMachine.status || ""}
                      readOnly
                    />

                  </div>

                </div>

              )}

            {/* CLOSE BUTTON */}

            <div className="machine-modal-actions">

              <button
                type="button"
                className="machine-cancel-btn"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedMachine(null);
                  setViewError("");
                }}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

{/* =========================
    EDIT MACHINE MODAL
========================= */}

{showEditModal && role === "ADMIN" && (

  <div className="machine-modal-overlay">

    <form
      className="machine-form"
      onSubmit={async (event) => {
        event.preventDefault();

        try {
          setEditSaving(true);
          setEditError("");

          const updatedMachine =
            await machineService.updateMachine(
              editMachine.id,
              editMachine
            );

          setMachines((previousMachines) =>
            previousMachines.map((machine) =>
              machine.id === updatedMachine.id
                ? updatedMachine
                : machine
            )
          );

          setShowEditModal(false);
          setEditMachine(null);

        } catch (err) {

          console.error(
            "Failed to update machine:",
            err
          );

          setEditError(
            err.response?.data ||
            "Unable to update machine."
          );

        } finally {
          setEditSaving(false);
        }
      }}
    >

      {/* =========================
          MODAL HEADER
      ========================= */}

      <div className="machine-modal-header">

        <div>

          <h2>
            Edit Machine
          </h2>

          <p>
            Update factory machine information
          </p>

        </div>

        <button
          type="button"
          className="machine-modal-close"
          onClick={() => {
            setShowEditModal(false);
            setEditMachine(null);
            setEditError("");
          }}
        >
          ×
        </button>

      </div>

      {/* =========================
          LOADING
      ========================= */}

      {editLoading && (

        <div className="machine-table-message">
          Loading machine details...
        </div>

      )}

      {/* =========================
          ERROR
      ========================= */}

      {editError && (

        <div className="machine-form-error">
          {editError}
        </div>

      )}

      {/* =========================
          EDIT FORM
      ========================= */}

      {!editLoading && editMachine && (

        <div className="machine-form-fields">

          {/* MACHINE NAME */}

          <div className="machine-form-group">

            <label>
              Machine Name
            </label>

            <input
              type="text"
              value={editMachine.name || ""}
              onChange={(event) =>
                setEditMachine({
                  ...editMachine,
                  name: event.target.value,
                })
              }
              required
            />

          </div>

          {/* MODEL */}

          <div className="machine-form-group">

            <label>
              Model
            </label>

            <input
              type="text"
              value={editMachine.model || ""}
              onChange={(event) =>
                setEditMachine({
                  ...editMachine,
                  model: event.target.value,
                })
              }
              required
            />

          </div>

          {/* SERIAL NUMBER */}

          <div className="machine-form-group">

            <label>
              Serial Number
            </label>

            <input
              type="text"
              value={editMachine.serialNumber || ""}
              onChange={(event) =>
                setEditMachine({
                  ...editMachine,
                  serialNumber: event.target.value,
                })
              }
              required
            />

          </div>

          {/* LOCATION */}

          <div className="machine-form-group">

            <label>
              Location
            </label>

            <input
              type="text"
              value={editMachine.location || ""}
              onChange={(event) =>
                setEditMachine({
                  ...editMachine,
                  location: event.target.value,
                })
              }
              required
            />

          </div>

          {/* STATUS */}

          <div className="machine-form-group">

            <label>
              Status
            </label>

            <select
              value={editMachine.status || ""}
              onChange={(event) =>
                setEditMachine({
                  ...editMachine,
                  status: event.target.value,
                })
              }
              required
            >

              <option value="RUNNING">
                Running
              </option>

              <option value="STOPPED">
                Stopped
              </option>

              <option value="MAINTENANCE">
                Maintenance
              </option>

            </select>

          </div>

        </div>

      )}

      {/* =========================
          MODAL ACTIONS
      ========================= */}

      <div className="machine-modal-actions">

        <button
          type="button"
          className="machine-cancel-btn"
          onClick={() => {
            setShowEditModal(false);
            setEditMachine(null);
            setEditError("");
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="machine-save-btn"
          disabled={editLoading || editSaving}
        >
          {editSaving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </form>

  </div>

)}

    </div>
  );
};

export default Machines;
