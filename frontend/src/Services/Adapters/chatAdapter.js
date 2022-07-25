import tokenRequest from "./tokenInterceptor";

const API_URL = "/api/chats";

const getChats = async () => {
  const response = await tokenRequest.get(`${API_URL}`);
  return response.data;
};

const addEditChat = async (userId) => {
  const response = await tokenRequest.post(`${API_URL}`, { userId });
  return response.data;
};

const updateChat = async (chatData) => {
  const response = await tokenRequest.put(`${API_URL}/${chatData.chatId}`, chatData);
  return response.data;
};

const deleteChat = async (chatId) => {
  const response = await tokenRequest.delete(`${API_URL}/${chatId}`);
  return response.data;
};

const chatAdapter = {
  getChats,
  addEditChat,
  updateChat,
  deleteChat,
};

export default chatAdapter;
