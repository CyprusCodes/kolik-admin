export type UserStatus = "enabled" | "disabled";

export interface PlatformUserRow {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  image: string | null;
  is_super_admin: number;
  user_status: UserStatus;
  created_at: string;
  organization_count: number;
  organization_names: string | null;
  last_active_at: string | null;
}

export interface PlatformUserMembership {
  userOrganizationId: number;
  organizationId: number;
  organizationName: string;
  roleName: string | null;
  isCompanyAdmin: boolean;
  status: "active" | "disabled" | "archived" | "removed";
  joinedAt: string;
}

export interface PlatformUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  isSuperAdmin: boolean;
  userStatus: UserStatus;
  language: string | null;
  accountActivatedAt: string | null;
  passwordChangeRequired: boolean;
  createdAt: string;
  lastActiveAt: string | null;
  memberships: PlatformUserMembership[];
}

export type DeviceType = "phone" | "tablet" | "desktop" | "unknown";

interface DeviceInfo {
  device: string;
  deviceType: DeviceType;
  app: boolean;
  userAgent: string | null;
}

export interface UserSession extends DeviceInfo {
  sessionId: string;
  signedInAt: string;
  lastActiveAt: string;
  expiresAt: string;
  revokedAt: string | null;
  active: boolean;
}

export interface UserSignIn extends DeviceInfo {
  ip: string | null;
  signedInAt: string;
}

export interface UserDevices {
  sessions: UserSession[];
  signIns: UserSignIn[];
}
