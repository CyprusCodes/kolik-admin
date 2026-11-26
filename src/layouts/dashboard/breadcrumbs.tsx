import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { paths } from "src/paths";
import { BreadcrumbContext, useBreadcrumbContext } from "./breadcrumb-store";
import type { PageLabel } from "./breadcrumb-store";
import { allNavItems } from "./nav-config";

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [pageLabel, setPageLabel] = useState<PageLabel | null>(null);
  const value = useMemo(() => ({ pageLabel, setPageLabel }), [pageLabel]);
  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>;
};

interface Crumb {
  label: string;
  href?: string;
}

const SPECIAL_SEGMENTS: Record<string, string> = { new: "New" };

export const TopNavBreadcrumbs = ({ compact = false }: { compact?: boolean }) => {
  const { pathname } = useLocation();
  const { pageLabel } = useBreadcrumbContext();

  const crumbs = useMemo<Crumb[]>(() => {
    const result: Crumb[] = [{ label: "Overview", href: paths.overview }];
    const segments = pathname.split("/").filter(Boolean);
    segments.forEach((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;
      const navItem = allNavItems.find((item) => item.href === href);
      const label =
        isLast && pageLabel?.path === pathname
          ? pageLabel.label
          : (navItem?.label ?? SPECIAL_SEGMENTS[segment] ?? "Details");
      result.push({ label, href: navItem && !isLast ? href : undefined });
    });
    if (segments.length === 0) {
      return [{ label: "Overview" }];
    }
    return result;
  }, [pathname, pageLabel]);

  if (compact) {
    return (
      <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600, minWidth: 0 }}>
        {crumbs[crumbs.length - 1].label}
      </Typography>
    );
  }

  return (
    <Breadcrumbs
      aria-label="Breadcrumb"
      separator={<ChevronRightIcon sx={{ fontSize: 16, color: "text.disabled" }} />}
      sx={{
        minWidth: 0,
        "& .MuiBreadcrumbs-ol": { flexWrap: "nowrap" },
        "& .MuiBreadcrumbs-li": { minWidth: 0 },
        "& .MuiBreadcrumbs-separator": { mx: 0.5 },
      }}
    >
      {crumbs.map((crumb, index) =>
        crumb.href && index < crumbs.length - 1 ? (
          <Link
            key={crumb.href}
            component={RouterLink}
            to={crumb.href}
            underline="none"
            variant="body2"
            noWrap
            sx={{ display: "block", color: "text.secondary", "&:hover": { color: "text.primary" } }}
          >
            {crumb.label}
          </Link>
        ) : (
          <Typography
            key={`${index}-${crumb.label}`}
            variant="body2"
            noWrap
            aria-current={index === crumbs.length - 1 ? "page" : undefined}
            sx={{
              display: "block",
              color: index === crumbs.length - 1 ? "text.primary" : "text.secondary",
              fontWeight: index === crumbs.length - 1 ? 500 : 400,
            }}
          >
            {crumb.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
};
