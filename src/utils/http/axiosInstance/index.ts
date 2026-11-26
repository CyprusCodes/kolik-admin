import axios from "axios";
import type { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import Authentication from "src/services/authentication";
import { paths } from "src/paths";

let axiosInstance: AxiosInstance | null = null;

const redirectToLogin = () => {
  if (window.location.pathname.startsWith(paths.login)) {
    return;
  }

  new Authentication().logout();
  const searchParams = new URLSearchParams({ returnTo: window.location.href });
  window.location.href = `${paths.login}?${searchParams.toString()}`;
};

export const getAxiosInstance = (): AxiosInstance => {
  if (axiosInstance) {
    return axiosInstance;
  }

  axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response && !axios.isCancel(error)) {
        toast.error("Can't reach the server. Check your connection and try again.", {
          id: "api-network-error",
        });
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 ||
        (error.response?.status === 403 && error.response?.data?.code === "TWO_FACTOR_REQUIRED")
      ) {
        redirectToLogin();
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default getAxiosInstance;
