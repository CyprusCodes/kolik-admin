import type { ReactNode } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

interface DetailSectionProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export const DetailSection = ({ title, action, children }: DetailSectionProps) => (
  <Grid item xs={12}>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle1" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {action}
    </Stack>
    <Divider sx={{ mb: 2 }} />
    <Grid container spacing={3}>
      {children}
    </Grid>
  </Grid>
);

export const DetailField = ({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) => (
  <Grid item xs={12} sm={full ? 12 : 6}>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      {label}
    </Typography>
    <Box sx={{ typography: "body1" }}>{children ?? "-"}</Box>
  </Grid>
);
