import api from "./api";

const getMachineReport = async () => {
  const response = await api.get("/api/reports/machines");
  return response.data;
};

const getMaintenanceReport = async () => {
  const response = await api.get("/api/reports/maintenance");
  return response.data;
};

const getBreakdownReport = async () => {
  const response = await api.get("/api/reports/breakdowns");
  return response.data;
};

const getSparePartReport = async () => {
  const response = await api.get("/api/reports/spare-parts");
  return response.data;
};

const dashboardService = {
  getMachineReport,
  getMaintenanceReport,
  getBreakdownReport,
  getSparePartReport,
};

export default dashboardService;