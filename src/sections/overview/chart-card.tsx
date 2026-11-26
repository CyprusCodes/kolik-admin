import type { ReactNode } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { AppCard, AppCardContent, AppCardHeader } from "src/components/kolik/app-card";

interface ChartCardProps {
  title: string;
  info?: string;
  height: number;
  loading: boolean;
  empty?: boolean;
  children: ReactNode;
}

const ChartCard = ({ title, info, height, loading, empty, children }: ChartCardProps) => (
  <AppCard sx={{ height: "100%" }}>
    <AppCardHeader title={title} info={info} />
    <AppCardContent>
      {loading ? (
        <Skeleton variant="rounded" height={height} />
      ) : empty ? (
        <Box sx={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No data in this range
          </Typography>
        </Box>
      ) : (
        children
      )}
    </AppCardContent>
  </AppCard>
);

export default ChartCard;
