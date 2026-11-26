import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Authentication from "src/services/authentication";
import { paths } from "src/paths";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  if (!new Authentication().isAuthenticated()) {
    const returnTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${paths.login}?returnTo=${returnTo}`} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
