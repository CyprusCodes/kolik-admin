import { organizations } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { NewOrganizationPayload, OrganizationDetail } from "src/types/organization";

const postOrganization = (body: NewOrganizationPayload) =>
  http.post<{ organization: OrganizationDetail }>(`${API_BASE_URL}${organizations.postOrganization()}`, body);

export default postOrganization;
