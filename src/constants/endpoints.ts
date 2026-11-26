const platformAuth = {
  login: () => "/platform/auth/login",
  setupTwoFactor: () => "/platform/auth/two-factor/setup",
  verifyTwoFactor: () => "/platform/auth/two-factor/verify",
};

const platform = {
  getOverview: (days: number) => `/platform/overview?days=${days}`,
  getApps: () => "/platform/apps",
};

const organizations = {
  getOrganizations: () => "/platform/organizations",
  getOrganizationsPaginated: () => "/platform/organizations-paginated",
  getOrganization: (organizationId: number | string) => `/platform/organizations/${organizationId}`,
  patchOrganizationPlan: (organizationId: number | string) =>
    `/platform/organizations/${organizationId}/plan`,
  putOrganizationApp: (organizationId: number | string, appId: number | string) =>
    `/platform/organizations/${organizationId}/apps/${appId}`,
  postOrganization: () => "/platform/organizations",
  putOrganizationSessionRecording: (organizationId: number | string) =>
    `/platform/organizations/${organizationId}/session-recording`,
  getOrganizationEmployeesPaginated: (organizationId: number | string) =>
    `/platform/organizations/${organizationId}/employees-paginated`,
};

const platformUsers = {
  getUsersPaginated: () => "/platform/users-paginated",
  getUser: (userId: number | string) => `/platform/users/${userId}`,
  patchUserStatus: (userId: number | string) => `/platform/users/${userId}/status`,
  postUserPasswordReset: (userId: number | string) => `/platform/users/${userId}/password-reset`,
  getUserDevices: (userId: number | string) => `/platform/users/${userId}/devices`,
  deleteUserSession: (userId: number | string, sessionId: string) =>
    `/platform/users/${userId}/sessions/${encodeURIComponent(sessionId)}`,
  postUserSignOutEverywhere: (userId: number | string) => `/platform/users/${userId}/sign-out-everywhere`,
};

export { platformAuth, platform, organizations, platformUsers };
