import type { ReactNode } from "react";
import { Box, ButtonBase, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

interface SideNavItemProps {
  active?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  path: string;
  title: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}

export const SideNavItem = ({
  active,
  icon,
  label,
  path,
  title,
  collapsed = false,
  onNavigate,
}: SideNavItemProps) => (
  <li>
    <Tooltip title={collapsed ? title : ""} placement="right">
      <ButtonBase
        component={Link}
        to={path}
        onClick={onNavigate}
        sx={{
          alignItems: "center",
          borderRadius: "6px",
          display: "flex",
          gap: 1,
          height: 32,
          justifyContent: collapsed ? "center" : "flex-start",
          pl: collapsed ? 0 : "8px",
          pr: collapsed ? 0 : 1,
          textAlign: "left",
          width: "100%",
          ...(active && { backgroundColor: "var(--nav-item-active-bg)" }),
          "&:hover": { backgroundColor: "var(--nav-item-hover-bg)" },
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "var(--nav-item-icon-color)",
              display: "inline-flex",
              flexShrink: 0,
              justifyContent: "center",
              "& svg": { fontSize: 20 },
              ...(active && { color: "var(--nav-item-icon-active-color)" }),
            }}
          >
            {icon}
          </Box>
        )}
        {!collapsed && (
          <Box
            component="span"
            sx={{
              color: "var(--nav-item-color)",
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 15,
              fontWeight: 600,
              lineHeight: "20px",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              ...(active && { color: "var(--nav-item-active-color)" }),
            }}
          >
            {title}
          </Box>
        )}
        {!collapsed && label && (
          <Box component="span" sx={{ display: "inline-flex", flexShrink: 0 }}>
            {label}
          </Box>
        )}
      </ButtonBase>
    </Tooltip>
  </li>
);
