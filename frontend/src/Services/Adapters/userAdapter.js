import tokenRequest from "./tokenInterceptor";

const API_URL = "/api/users";

const getUserList = async (search) => {
  const response = await tokenRequest.get(`${API_URL}?search=${search}`);
  return response.data;
};

const userAdapter = {
  getUserList,
};

export default userAdapter;
