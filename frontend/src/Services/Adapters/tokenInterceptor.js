import axios from "axios";
import { logoutUser } from "../../features/authSlice";

const tokenRequest = axios.create();

export const initAxiosInterceptors = async (store) => {
  let token;

  tokenRequest.loginUser = async (userData) => {
    try {
      const response = await axios.post(`/api/auth/login`, userData);
      token = response.data.token;
      const user = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        profilePicture: response.data.profilePicture,
      };

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get(`/api/auth/refreshToken`);
      token = response.data.token;
    } catch (error) {
      store.dispatch(logoutUser());
      return Promise.reject(error);
    }
  };

  tokenRequest.logoutUser = async () => {
    token = null;
    localStorage.removeItem("user");
    const response = await axios.get(`/api/auth/logout`);
    return response.data;
  };

  tokenRequest.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );

  tokenRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      if (error.response.status === 401) {
        await refreshToken();
        return tokenRequest(config);
      }

      return Promise.reject(error);
    }
  );
};

export default tokenRequest;
