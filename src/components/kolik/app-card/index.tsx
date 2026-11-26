import { forwardRef } from "react";
import type { CardProps } from "@mui/material";
import { Card } from "@mui/material";

export const AppCard = forwardRef<HTMLDivElement, CardProps>(function AppCard({ sx, ...other }, ref) {
  return (
    <Card
      ref={ref}
      sx={[
        {
          borderRadius: "12px",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: "none",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
});

export { AppCardHeader } from "./app-card-header";
export { AppCardContent } from "./app-card-content";
export { AppCardFooter } from "./app-card-footer";
export { AppCardEmptyState } from "./app-card-empty-state";
