import api from "./api";

const getAllMaintenance = async () => {
  const response = await api.get("/api/maintenance");
  return response.data;
};

const getMaintenanceById = async (id) => {
  const response = await api.get(`/api/maintenance/${id}`);
  return response.data;
};

const getMaintenanceByTechnician = async (technicianId) => {
  const response = await api.get(
    `/api/maintenance/technician/${technicianId}`
  );

  return response.data;
};


const getAllTechnicians = async () => {
  const response = await api.get("/api/maintenance/technicians");
  return response.data;
};


const createMaintenance = async (maintenanceData) => {
  const response = await api.post(
    "/api/maintenance",
    maintenanceData
  );

  return response.data;
};

const updateMaintenance = async (id, maintenanceData) => {
  const response = await api.put(
    `/api/maintenance/${id}`,
    maintenanceData
  );

  return response.data;
};

const updateMaintenanceStatus = async (id, status) => {
  const response = await api.patch(
    `/api/maintenance/${id}/status`,
    { status }
  );

  return response.data;
};



const deleteMaintenance = async (id) => {
  const response = await api.delete(`/api/maintenance/${id}`);
  return response.data;
};


const maintenanceService = {
  getAllMaintenance,
  getMaintenanceById,
  getMaintenanceByTechnician,
  getAllTechnicians,
  createMaintenance,
  updateMaintenance,
  updateMaintenanceStatus,
  deleteMaintenance,
};


export default maintenanceService;