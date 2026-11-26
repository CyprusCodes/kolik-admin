import { organizations } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { OrganizationDetail, PlanUpdate } from "src/types/organization";

const patchOrganizationPlan = (organizationId: number, body: PlanUpdate) =>
  http.patch<{ organization: OrganizationDetail }>(
    `${API_BASE_URL}${organizations.patchOrganizationPlan(organizationId)}`,
    body,
  );

export default patchOrganizationPlan;
