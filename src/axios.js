import axios from "axios";
import { notify } from "./util/helper";
export const BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    //* Additional Interceptor Logic for request goes here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    //* Additional Interceptor Logic for response goes here
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle 401 error, e.g. logout user
        // store.dispatch(logout());
        if (
          error.response?.data?.detail !==
          "Given token not valid for any token type"
        ) {
          notify(
            error.response?.data?.detail || "Something went wrong!",
            "error"
          );
        }
      } else if (error.response.status === 406) {
        notify(
          error.response?.data?.detail || "Something went wrong!",
          "error"
        );
      } else if (error.response.status === 403) {
        notify(
          error.response?.data?.detail || "Something went wrong!",
          "error"
        );
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
