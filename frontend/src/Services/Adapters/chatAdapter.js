import tokenRequest from "./tokenInterceptor";

const API_URL = "/api/chats";

const getChats = async () => {
  const response = await tokenRequest.get(`${API_URL}`);
  return response.data;
};

const addEditChat = async (chatData) => {
  const response = await tokenRequest.post(`${API_URL}`, chatData);
  return response.data;
};

const deleteLeaveChat = async ({ id, chatData }) => {
  const response = await tokenRequest.post(`${API_URL}/${id}`, chatData);
  return response.data;
};

const chatAdapter = {
  getChats,
  addEditChat,
  deleteLeaveChat,
};

export default chatAdapter;
