import axios from "axios";

const tokenRequest = axios.create();

export const initAxiosInterceptors = (store) => {
  tokenRequest.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  tokenRequest.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default tokenRequest;
