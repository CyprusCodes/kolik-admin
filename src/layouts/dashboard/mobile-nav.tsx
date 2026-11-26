import { Drawer } from "@mui/material";
import { SideNavContent } from "./side-nav-content";
import { SIDE_NAV_WIDTH } from "./side-nav";
import { useNavCssVars } from "./use-nav-css-vars";

export const MobileNav = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const cssVars = useNavCssVars();

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          ...cssVars,
          backgroundColor: "var(--nav-bg)",
          color: "var(--nav-color)",
          width: SIDE_NAV_WIDTH,
        },
      }}
      variant="temporary"
    >
      <SideNavContent onNavigate={onClose} />
    </Drawer>
  );
};
