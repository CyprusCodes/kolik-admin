import { organizations } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";

const getOrganizationsPaginated = (queryParams?: string) => {
  const qs = queryParams ? `?${queryParams}` : "";
  return http.get(`${API_BASE_URL}${organizations.getOrganizationsPaginated()}${qs}`);
};

export default getOrganizationsPaginated;
