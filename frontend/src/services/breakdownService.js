
import api from "./api";

// Get all breakdown records
const getAllBreakdowns = async () => {
  const response = await api.get("/api/breakdowns");
  return response.data;
};

// Get one breakdown by ID
const getBreakdownById = async (id) => {
  const response = await api.get(`/api/breakdowns/${id}`);
  return response.data;
};

// Filter breakdowns by status
const getBreakdownsByStatus = async (status) => {
  const response = await api.get(
    `/api/breakdowns/status/${encodeURIComponent(status)}`
  );
  return response.data;
};

// Filter breakdowns by priority
const getBreakdownsByPriority = async (priority) => {
  const response = await api.get(
    `/api/breakdowns/priority/${encodeURIComponent(priority)}`
  );
  return response.data;
};

// Filter breakdowns by machine
const getBreakdownsByMachine = async (machineId) => {
  const response = await api.get(
    `/api/breakdowns/machine/${machineId}`
  );
  return response.data;
};

// Filter breakdowns by technician
const getBreakdownsByTechnician = async (technicianId) => {
  const response = await api.get(
    `/api/breakdowns/technician/${technicianId}`
  );
  return response.data;
};

// Create a breakdown record
const createBreakdown = async (breakdownData) => {
  const response = await api.post(
    "/api/breakdowns",
    breakdownData
  );
  return response.data;
};

// Update a breakdown record
const updateBreakdown = async (id, breakdownData) => {
  const response = await api.put(
    `/api/breakdowns/${id}`,
    breakdownData
  );
  return response.data;
};

// Delete a breakdown record
const deleteBreakdown = async (id) => {
  const response = await api.delete(
    `/api/breakdowns/${id}`
  );
  return response.data;
};

const breakdownService = {
  getAllBreakdowns,
  getBreakdownById,
  getBreakdownsByStatus,
  getBreakdownsByPriority,
  getBreakdownsByMachine,
  getBreakdownsByTechnician,
  createBreakdown,
  updateBreakdown,
  deleteBreakdown,
};

export default breakdownService;