export const paths = {
  login: "/login",
  overview: "/",
  organizations: {
    index: "/organizations",
    create: "/organizations/new",
    detail: (organizationId: number | string) => `/organizations/${organizationId}`,
  },
  users: {
    index: "/users",
    detail: (userId: number | string) => `/users/${userId}`,
  },
  billing: "/billing",
  sessionRecording: "/session-recording",
  usage: "/usage",
  health: "/health",
  featureFlags: "/feature-flags",
  announcements: "/announcements",
  auditLog: "/audit-log",
  team: "/team",
};
