import { organizations } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { OrganizationDetail } from "src/types/organization";

const putOrganizationBilling = (organizationId: number, body: { enabled: boolean; reason?: string }) =>
  http.put<{ organization: OrganizationDetail }>(
    `${API_BASE_URL}${organizations.putOrganizationBilling(organizationId)}`,
    body,
  );

export default putOrganizationBilling;
