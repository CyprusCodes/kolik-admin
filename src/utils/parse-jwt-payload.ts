export interface JwtPayload {
  exp?: number;
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  isSuperAdmin?: boolean;
  platformTwoFactor?: boolean;
}

const parseJWTPayload = (token: string): JwtPayload => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
};

export default parseJWTPayload;
