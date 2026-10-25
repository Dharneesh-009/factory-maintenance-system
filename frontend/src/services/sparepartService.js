
import api from "./api";

const getAllSpareParts = async () => {
  const response = await api.get("/api/spare-parts");
  return response.data;
};

const getSparePartById = async (id) => {
  const response = await api.get(`/api/spare-parts/${id}`);
  return response.data;
};

const searchSpareParts = async (name) => {
  const response = await api.get(
    `/api/spare-parts/search?name=${encodeURIComponent(name)}`
  );
  return response.data;
};

const getLowStockParts = async () => {
  const response = await api.get("/api/spare-parts/low-stock");
  return response.data;
};

const createSparePart = async (sparePartData) => {
  const response = await api.post(
    "/api/spare-parts",
    sparePartData
  );
  return response.data;
};

const updateSparePart = async (id, sparePartData) => {
  const response = await api.put(
    `/api/spare-parts/${id}`,
    sparePartData
  );
  return response.data;
};

const deleteSparePart = async (id) => {
  const response = await api.delete(
    `/api/spare-parts/${id}`
  );
  return response.data;
};

const sparePartService = {
  getAllSpareParts,
  getSparePartById,
  searchSpareParts,
  getLowStockParts,
  createSparePart,
  updateSparePart,
  deleteSparePart,
};

export default sparePartService;
