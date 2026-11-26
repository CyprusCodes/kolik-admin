import type { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import baseRequest from "./baseRequest";

type RequestOptions = AxiosRequestConfig & {
  onUploadProgress?: (event: AxiosProgressEvent) => void;
};

function encodeUrl(url: string) {
  const [baseUrl, queryString] = url.split("?");

  if (!queryString) {
    return url;
  }

  const encodedQueryString = queryString
    .split("&")
    .map((param) => {
      const separator = param.indexOf("=");
      const key = separator === -1 ? param : param.slice(0, separator);
      const value = separator === -1 ? "" : param.slice(separator + 1);
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return `${baseUrl}?${encodedQueryString}`;
}

function get<T = unknown>(url: string, options: RequestOptions = {}) {
  return baseRequest<T>(encodeUrl(url), { ...options, method: "get" });
}

function post<T = unknown>(url: string, data: unknown = {}, options: RequestOptions = {}) {
  return baseRequest<T>(url, { ...options, method: "post", data });
}

function put<T = unknown>(url: string, data: unknown = {}, options: RequestOptions = {}) {
  return baseRequest<T>(url, { ...options, method: "put", data });
}

function patch<T = unknown>(url: string, data: unknown = {}, options: RequestOptions = {}) {
  return baseRequest<T>(url, { ...options, method: "patch", data });
}

function del<T = unknown>(url: string, options: RequestOptions = {}) {
  return baseRequest<T>(url, { ...options, method: "delete" });
}

const http = {
  get,
  put,
  post,
  delete: del,
  patch,
};

export default http;
