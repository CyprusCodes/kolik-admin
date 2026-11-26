import type { ReactNode } from "react";
import { Button, Stack } from "@mui/material";

interface FilterRowProps {
  children: ReactNode;
  hasFilters?: boolean;
  onClear?: () => void;
}

const FilterRow = ({ children, hasFilters, onClear }: FilterRowProps) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
    {children}
    {hasFilters && onClear && <Button onClick={onClear}>Clear filters</Button>}
  </Stack>
);

export default FilterRow;
