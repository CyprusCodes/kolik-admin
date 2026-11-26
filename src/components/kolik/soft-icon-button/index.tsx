import type { FC, ReactNode } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { RouterLink } from "src/components/kolik/router-link";

interface SoftIconButtonProps {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  plain?: boolean;
  danger?: boolean;
}

export const SoftIconButton: FC<SoftIconButtonProps> = ({
  label,
  icon,
  href,
  onClick,
  plain = false,
  danger = false,
}) => (
  <Tooltip title={label}>
    <IconButton
      aria-label={label}
      onClick={onClick}
      {...(href && { component: RouterLink, href })}
      sx={{
        width: 30,
        height: 30,
        borderRadius: "8px",
        color: danger ? "error.main" : "text.secondary",
        backgroundColor: plain ? "transparent" : "action.hover",
        "&:hover": {
          backgroundColor: plain ? "action.hover" : "action.selected",
          color: danger ? "error.dark" : "text.primary",
        },
        "& svg": { fontSize: 18 },
      }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);
