import axios from "axios";

const registerUser = async (userData) => {
  const formData = new FormData();

  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("confirmPassword", userData.confirmPassword);
  formData.append("profilePicture", userData.profilePicture);

  const response = await axios.post(`/api/auth/register`, formData);
  return response.data;
};

const authAdapter = {
  registerUser,
};

export default authAdapter;
