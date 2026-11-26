import { organizations } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { OrganizationDetail } from "src/types/organization";

const putOrganizationApp = (organizationId: number, appId: number, body: { enabled: boolean }) =>
  http.put<{ organization: OrganizationDetail }>(
    `${API_BASE_URL}${organizations.putOrganizationApp(organizationId, appId)}`,
    body,
  );

export default putOrganizationApp;
