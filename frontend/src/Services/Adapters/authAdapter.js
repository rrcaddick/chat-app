import axios from "axios";

const registerUser = async (userData) => {
  const response = await axios.post(`/api/auth/register`, userData);
  return response.data;
};

const authAdapter = {
  registerUser,
};

export default authAdapter;
