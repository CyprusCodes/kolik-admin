import type { FC, ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";

interface AppCardContentProps {
  children?: ReactNode;
  disablePadding?: boolean;
  sx?: SxProps<Theme>;
}

export const AppCardContent: FC<AppCardContentProps> = ({ children, disablePadding = false, sx }) => (
  <Box
    sx={[
      { flexGrow: 1, minWidth: 0 },
      !disablePadding && { px: 2.5, pt: 0.5, pb: 2.5 },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Box>
);
