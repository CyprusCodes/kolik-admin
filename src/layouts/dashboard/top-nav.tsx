import { Box, Divider, IconButton, Stack, SvgIcon, Tooltip, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { openSearch } from "./search-store";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import LayoutLeftIcon from "@untitled-ui/icons-react/build/esm/LayoutLeft";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import { useSettings } from "src/hooks/use-settings";
import { AccountButton } from "./account-button";
import { TopNavBreadcrumbs } from "./breadcrumbs";
import { DarkModeSwitch } from "./dark-mode-switch";
import { SIDE_NAV_WIDTH, SIDE_NAV_WIDTH_COLLAPSED } from "./side-nav";

const TOP_NAV_HEIGHT = 64;

interface TopNavProps {
  onMobileNavOpen: () => void;
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

export const TopNav = ({ onMobileNavOpen, sidebarCollapsed, onSidebarToggle }: TopNavProps) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { paletteMode, setPaletteMode } = useSettings();
  const width = sidebarCollapsed ? SIDE_NAV_WIDTH_COLLAPSED : SIDE_NAV_WIDTH;

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        left: { lg: `${width}px` },
        top: 0,
        width: { lg: `calc(100% - ${width}px)` },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ minHeight: TOP_NAV_HEIGHT, px: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1} sx={{ minWidth: 0, flex: 1 }}>
          {lgUp ? (
            <IconButton
              onClick={onSidebarToggle}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <SvgIcon sx={{ fontSize: 20 }}>
                <LayoutLeftIcon />
              </SvgIcon>
            </IconButton>
          ) : (
            <IconButton onClick={onMobileNavOpen} aria-label="Open menu">
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )}
          <Divider orientation="vertical" flexItem sx={{ my: 2.5 }} />
          <Box sx={{ minWidth: 0, pl: 0.5 }}>
            <TopNavBreadcrumbs compact={!lgUp} />
          </Box>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Tooltip title="Search">
            <IconButton onClick={openSearch} aria-label="Search">
              <SvgIcon>
                <SearchMdIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <DarkModeSwitch
            checked={paletteMode === "dark"}
            onChange={() => setPaletteMode(paletteMode === "dark" ? "light" : "dark")}
          />
          <AccountButton />
        </Stack>
      </Stack>
    </Box>
  );
};
