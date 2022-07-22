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
        name: response.data.name,
        email: response.data.email,
        profilePicture: response.data.profilePicture,
      };

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      Promise.reject(error);
    }
  };

  const refreshToken = async () => {
    const response = await axios.get(`/api/auth/refreshToken`);
    token = response.token;
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
      return Promise.reject(error);
    }
  );

  tokenRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      if (error.response.status === 401) {
        await refreshToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return tokenRequest(config);
      }

      if (error.response.status === 403) {
        store.dispatch(logoutUser());
      }

      return Promise.reject(error);
    }
  );
};

export default tokenRequest;
