import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { AppCard } from "src/components/kolik/app-card";

interface ListCardProps {
  search: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
}

const ListCard = ({ search, filters, children }: ListCardProps) => (
  <AppCard sx={{ p: 3 }}>
    {search}
    <Box sx={{ mt: 2.5, mb: 3 }}>{filters}</Box>
    <Box sx={{ mx: -3, mb: -3 }}>{children}</Box>
  </AppCard>
);

export default ListCard;
