import api from "./api";

const login = async (email, password) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

const register = async (name, email, password, role) => {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
    role,
  });

  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;