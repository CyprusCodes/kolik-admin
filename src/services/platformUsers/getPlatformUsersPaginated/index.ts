import { platformUsers } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";

const getPlatformUsersPaginated = (queryParams?: string) => {
  const qs = queryParams ? `?${queryParams}` : "";
  return http.get(`${API_BASE_URL}${platformUsers.getUsersPaginated()}${qs}`);
};

export default getPlatformUsersPaginated;
