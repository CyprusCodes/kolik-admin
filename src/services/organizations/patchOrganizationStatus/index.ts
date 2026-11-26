import { organizations } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { OrganizationDetail, OrganizationStatus } from "src/types/organization";

const patchOrganizationStatus = (
  organizationId: number,
  body: { status: OrganizationStatus; reason?: string },
) =>
  http.patch<{ organization: OrganizationDetail }>(
    `${API_BASE_URL}${organizations.patchOrganizationStatus(organizationId)}`,
    body,
  );

export default patchOrganizationStatus;
