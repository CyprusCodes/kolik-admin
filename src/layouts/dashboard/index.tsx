import { useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SearchDialog } from "./search-dialog";
import { BreadcrumbProvider } from "./breadcrumbs";
import { MobileNav } from "./mobile-nav";
import { SideNav, SIDE_NAV_WIDTH, SIDE_NAV_WIDTH_COLLAPSED } from "./side-nav";
import { TopNav } from "./top-nav";

const COLLAPSED_KEY = "kolik-admin-sidebar-collapsed";

const readCollapsed = () => {
  try {
    return window.localStorage.getItem(COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
};

const DashboardLayout = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);

  const toggleSidebar = () =>
    setCollapsed((value) => {
      try {
        window.localStorage.setItem(COLLAPSED_KEY, String(!value));
      } catch {
        return !value;
      }
      return !value;
    });

  return (
    <BreadcrumbProvider>
      <TopNav
        onMobileNavOpen={() => setMobileOpen(true)}
        sidebarCollapsed={collapsed}
        onSidebarToggle={toggleSidebar}
      />
      {lgUp ? (
        <SideNav collapsed={collapsed} />
      ) : (
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          maxWidth: "100%",
          paddingLeft: lgUp ? `${collapsed ? SIDE_NAV_WIDTH_COLLAPSED : SIDE_NAV_WIDTH}px` : undefined,
          transition: "padding-left 0.2s",
        }}
      >
        <Box
          component="main"
          sx={{ display: "flex", flexDirection: "column", flex: "1 1 auto", width: "100%", py: 4 }}
        >
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Box>
      </Box>
      <SearchDialog />
    </BreadcrumbProvider>
  );
};

export default DashboardLayout;
