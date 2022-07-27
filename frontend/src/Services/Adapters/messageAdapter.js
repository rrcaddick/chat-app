import tokenRequest from "./tokenInterceptor";

const API_URL = "/api/messages";

const getMessages = async (chatId) => {
  const response = await tokenRequest.get(`${API_URL}/${chatId}`);
  return response.data;
};

const addMessage = async (messageData) => {
  const response = await tokenRequest.post(`${API_URL}`, messageData);
  return response.data;
};

const messageAdapter = {
  getMessages,
  addMessage,
};

export default messageAdapter;
