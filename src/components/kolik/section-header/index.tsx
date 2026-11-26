import { InfoOutlined as InfoOutlinedIcon } from "@mui/icons-material";
import type { FC, ReactNode } from "react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";

interface SectionHeaderProps {
  title: ReactNode;
  info?: ReactNode;
  actions?: ReactNode;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, info, actions }) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    alignItems={{ xs: "flex-start", sm: "center" }}
    justifyContent="space-between"
    spacing={2}
  >
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      {info && (
        <Tooltip title={info} placement="top-start">
          <Box component="span" sx={{ display: "inline-flex", color: "text.disabled", cursor: "help" }}>
            <InfoOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
        </Tooltip>
      )}
    </Stack>
    {actions && (
      <Stack direction="row" spacing={1.5} alignItems="center">
        {actions}
      </Stack>
    )}
  </Stack>
);

export default SectionHeader;
