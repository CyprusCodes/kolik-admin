import { OpenInNew as OpenInNewIcon } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { KOLIK_APP_URL } from "src/constants/api";
import { paths } from "src/paths";
import { KolikLogo } from "./logo";
import { navSections } from "./nav-config";
import { SideNavItem } from "./side-nav-item";

interface SideNavContentProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const isActive = (href: string, pathname: string) =>
  href === paths.overview ? pathname === href : Boolean(matchPath({ path: href, end: false }, pathname));

export const SideNavContent = ({ collapsed = false, onNavigate }: SideNavContentProps) => {
  const { pathname } = useLocation();

  return (
    <SimpleBar style={{ height: "100%" }}>
      <Stack sx={{ height: "100%", minHeight: "100vh" }}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent={collapsed ? "center" : "flex-start"}
          spacing={1.25}
          sx={{ height: 64, px: collapsed ? 1 : 2, flexShrink: 0 }}
        >
          <Box
            component={Link}
            to={paths.overview}
            onClick={onNavigate}
            sx={{ width: collapsed ? 32 : 88, display: "flex" }}
          >
            <KolikLogo color="#ffffff" collapsed={collapsed} />
          </Box>
          {!collapsed && (
            <Box
              sx={{
                px: 1,
                height: 22,
                lineHeight: "22px",
                borderRadius: "6px",
                fontSize: 12,
                fontWeight: 700,
                color: "#D6BBFB",
                backgroundColor: "rgba(158, 119, 237, 0.18)",
              }}
            >
              Admin
            </Box>
          )}
        </Stack>
        <Stack component="nav" sx={{ flexGrow: 1 }}>
          {navSections.map((section) => (
            <Stack component="ul" spacing={0.25} key={section.title} sx={{ listStyle: "none", m: 0, p: 1 }}>
              {!collapsed && (
                <Box
                  component="li"
                  sx={{
                    alignItems: "center",
                    color: "var(--nav-section-title-color)",
                    display: "flex",
                    fontSize: 12,
                    fontWeight: 700,
                    height: 32,
                    px: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {section.title}
                </Box>
              )}
              {section.items.map((item) => (
                <SideNavItem
                  key={item.href}
                  path={item.href}
                  title={item.label}
                  icon={<item.icon />}
                  active={isActive(item.href, pathname)}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                  label={
                    item.comingSoon ? (
                      <Box
                        component="span"
                        sx={{
                          px: 0.75,
                          height: 18,
                          lineHeight: "18px",
                          borderRadius: "4px",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--nav-item-color)",
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        Soon
                      </Box>
                    ) : undefined
                  }
                />
              ))}
            </Stack>
          ))}
        </Stack>
        <Box sx={{ p: 1 }}>
          <Button
            component="a"
            href={KOLIK_APP_URL}
            target="_blank"
            fullWidth
            variant="contained"
            startIcon={collapsed ? undefined : <OpenInNewIcon />}
            sx={collapsed ? { minWidth: 0, px: 0 } : undefined}
          >
            {collapsed ? <OpenInNewIcon fontSize="small" /> : "Open Kolik"}
          </Button>
        </Box>
      </Stack>
    </SimpleBar>
  );
};
