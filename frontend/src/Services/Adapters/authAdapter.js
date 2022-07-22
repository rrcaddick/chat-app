import axios from "axios";

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

const authAdapter = {
  registerUser,
};

export default authAdapter;
