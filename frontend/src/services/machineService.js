import api from "./api";

const getAllMachines = async () => {
  const response = await api.get("/api/machines");
  return response.data;
};

const createMachine = async (machineData) => {
  const response = await api.post(
    "/api/machines",
    machineData
  );

  return response.data;
};

const getMachineById = async (id) => {
  const response = await api.get(`/api/machines/${id}`);
  return response.data;
};

const updateMachine = async (id, machineData) => {
  const response = await api.put(
    `/api/machines/${id}`,
    machineData
  );

  return response.data;
};

const deleteMachine = async (id) => {
  const response = await api.delete(
    `/api/machines/${id}`
  );

  return response.data;
};

const searchMachines = async (name) => {
  const response = await api.get(
    `/api/machines/search?name=${encodeURIComponent(name)}`
  );

  return response.data;
};

const getMachinesByStatus = async (status) => {
  const response = await api.get(
    `/api/machines/status/${status}`
  );

  return response.data;
};

const machineService = {
  getAllMachines,
  createMachine,
  getMachineById,
  updateMachine,
  deleteMachine,
  searchMachines,
  getMachinesByStatus,
};

export default machineService;