import axios from "axios";
import tokenRequest from "./tokenInterceptor";

const API_URL = "/api/auth";

const registerUser = async (userData) => {
  const formData = new FormData();

  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("confirmPassword", userData.confirmPassword);
  formData.append("profilePicture", userData.profilePicture);

  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const logoutUser = async () => {
  const response = await axios.get(`${API_URL}/logout`);
  return response.data;
};

const refreshToken = async () => {
  const response = await tokenRequest.get(`${API_URL}/refreshToken`);
  return response.data;
};

const authAdapter = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
};

export default authAdapter;
