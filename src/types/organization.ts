export type PlanType = "trial" | "paid";
export type IntegrationKey = "email" | "sms" | "activeDirectory";
export type IntegrationStatus = "connected" | "error" | "not_configured";

export interface OrganizationSummary {
  organizationId: number;
  organizationName: string;
  logoUrl: string | null;
  country: string | null;
  parentOrganizationId: number | null;
  parentOrganizationName: string | null;
  planType: PlanType;
  tier: string | null;
  maxEmployees: number | null;
  employeeCount: number;
  trialExpiresAt: string | null;
  createdAt: string;
  lastActiveAt: string | null;
  enabledAppCount: number;
  sessionRecording: boolean;
}

export interface App {
  appId: number;
  slug: string;
  name: string;
  description: string;
  category: string | null;
  isBeta: boolean;
}

export interface OrganizationApp extends App {
  enabled: boolean;
  enabledAt: string | null;
}

export interface OrganizationIntegration {
  key: IntegrationKey;
  status: IntegrationStatus;
  lastSyncAt: string | null;
  message: string | null;
}

export interface OrganizationAdmin {
  userId: number;
  name: string;
  email: string;
  userStatus: "enabled" | "disabled";
  lastLoginAt: string | null;
}

export interface OrganizationSubsidiary {
  organizationId: number;
  organizationName: string;
  employeeCount: number;
}

export interface OrganizationDetail extends OrganizationSummary {
  businessType: string | null;
  websiteUrl: string | null;
  language: string;
  apps: OrganizationApp[];
  integrations: OrganizationIntegration[];
  admins: OrganizationAdmin[];
  subsidiaries: OrganizationSubsidiary[];
}

export interface OrganizationsQuery {
  search?: string;
  pageSize?: number;
}

export interface OrganizationsResponse {
  organizations: OrganizationSummary[];
  total: number;
}

export interface PlanUpdate {
  planType: PlanType;
  tier: string | null;
  maxEmployees: number | null;
  trialExpiresAt: string | null;
}

export interface OrganizationRow {
  organization_id: number;
  organization_name: string;
  organization_country: string | null;
  organization_logo_url: string | null;
  parent_organization_id: number | null;
  parent_organization_name: string | null;
  plan_type: PlanType;
  organization_tier_type: string | null;
  max_employees: number | null;
  employee_count: number;
  enabled_app_count: number;
  trial_expires_at: string | null;
  created_at: string;
  last_active_at: string | null;
  session_recording: number;
}

export interface NewOrganizationPayload {
  organization: {
    organizationName: string;
    country: string;
    businessType: string;
    websiteUrl: string | null;
    language: "en" | "tr";
    parentOrganizationId: number | null;
    planType: PlanType;
    tier: string | null;
    maxEmployees: number | null;
    trialExpiresAt: string | null;
  };
  admin: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    requirePasswordChange: boolean;
  };
}

export interface OrganizationEmployeeRow {
  id: number;
  user_id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  image: string | null;
  position_name: string | null;
  department_name: string | null;
  user_organization_role: string;
  hire_date: string | null;
  created_at: string;
  employee_status: "enabled" | "disabled";
  last_active_at: string | null;
}
