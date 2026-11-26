import { Drawer } from "@mui/material";
import { SideNavContent } from "./side-nav-content";
import { useNavCssVars } from "./use-nav-css-vars";

export const SIDE_NAV_WIDTH = 256;
export const SIDE_NAV_WIDTH_COLLAPSED = 48;

export const SideNav = ({ collapsed = false }: { collapsed?: boolean }) => {
  const cssVars = useNavCssVars();

  return (
    <Drawer
      anchor="left"
      open
      variant="permanent"
      PaperProps={{
        sx: {
          ...cssVars,
          backgroundColor: "var(--nav-bg)",
          borderRightColor: "var(--nav-border-color)",
          borderRightStyle: "solid",
          borderRightWidth: 1,
          color: "var(--nav-color)",
          width: collapsed ? SIDE_NAV_WIDTH_COLLAPSED : SIDE_NAV_WIDTH,
          transition: "width 0.2s",
          overflowX: "hidden",
        },
      }}
    >
      <SideNavContent collapsed={collapsed} />
    </Drawer>
  );
};
