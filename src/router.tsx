import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "./components/auth-guard";
import DashboardLayout from "./layouts/dashboard";
import ComingSoonPage from "./pages/coming-soon";
import NotFoundPage from "./pages/not-found";
import { navSections } from "./layouts/dashboard/nav-config";
import { paths } from "./paths";

const page = (load: () => Promise<{ default: ComponentType }>) => () =>
  load().then((module) => ({ Component: module.default }));

const comingSoon = navSections
  .flatMap((section) => section.items)
  .filter((item) => item.comingSoon)
  .map((item) => ({ path: item.href, element: <ComingSoonPage item={item} /> }));

export const router = createBrowserRouter([
  { path: paths.login, lazy: page(() => import("./pages/login")) },
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: paths.overview, lazy: page(() => import("./pages/overview")) },
      { path: paths.organizations.index, lazy: page(() => import("./pages/organizations")) },
      { path: paths.organizations.create, lazy: page(() => import("./pages/organizations/new")) },
      { path: paths.users.index, lazy: page(() => import("./pages/users")) },
      { path: "/users/:userId", lazy: page(() => import("./pages/users/detail")) },
      { path: paths.billing, lazy: page(() => import("./pages/billing")) },
      { path: paths.sessionRecording, lazy: page(() => import("./pages/session-recording")) },
      { path: "/organizations/:organizationId", lazy: page(() => import("./pages/organizations/detail")) },
      ...comingSoon,
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
