import type { FC, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface AppCardEmptyStateProps {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const AppCardEmptyState: FC<AppCardEmptyStateProps> = ({ icon, title, description, action }) => (
  <Box sx={{ textAlign: "center", py: 6 }}>
    <Box
      sx={{
        display: "inline-flex",
        color: "text.secondary",
        mb: 2,
        "& svg": { fontSize: 64 },
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    )}
    {action && <Box sx={{ mt: 2 }}>{action}</Box>}
  </Box>
);
