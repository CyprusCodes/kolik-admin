import { organizations } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { OrganizationsQuery, OrganizationsResponse } from "src/types/organization";

const getOrganizations = (params: OrganizationsQuery) =>
  http.get<OrganizationsResponse>(`${API_BASE_URL}${organizations.getOrganizations()}`, { params });

export default getOrganizations;
