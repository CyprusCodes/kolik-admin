import type { AxiosPromise, AxiosRequestConfig } from "axios";
import qs from "qs";
import Authentication from "src/services/authentication";
import getAxiosInstance from "../axiosInstance";

type RequestMethod = "get" | "post" | "put" | "patch" | "delete";

const auth = new Authentication();

const buildHeaders = (): Record<string, string> => {
  const baseHeaders: Record<string, string> = {
    "Accept-Language": localStorage.getItem("i18nextLng") || "en",
  };

  if (!auth.isAuthenticated()) {
    return baseHeaders;
  }

  return {
    ...baseHeaders,
    Authorization: `Bearer ${auth.getAccessToken()}`,
    "Content-Type": "application/json;charset=UTF-8",
  };
};

const baseRequest = <T = unknown>(url: string, options: AxiosRequestConfig = {}) => {
  const { headers = {}, method = "get", ...opts } = options;

  return getAxiosInstance()(url, {
    method,
    headers: { ...buildHeaders(), ...(headers as Record<string, string>) },
    ...opts,
    paramsSerializer: (params) => qs.stringify(params, { encode: false, arrayFormat: "indices" }),
  }) as AxiosPromise<T>;
};

export const baseRequestWithFormData = (
  url: string,
  formData: FormData,
  options: AxiosRequestConfig & { method?: RequestMethod } = {},
) => {
  const { headers = {}, method = "post", ...opts } = options;

  return getAxiosInstance()(url, {
    method,
    data: formData,
    headers: { ...buildHeaders(), ...(headers as Record<string, string>) },
    ...opts,
  });
};

export default baseRequest;
