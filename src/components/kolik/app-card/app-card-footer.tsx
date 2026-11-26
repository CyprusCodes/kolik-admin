import type { FC, ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Divider, Stack } from "@mui/material";

interface AppCardFooterProps {
  children?: ReactNode;
  align?: "left" | "right" | "space-between";
  divider?: boolean;
  sx?: SxProps<Theme>;
}

const JUSTIFY = {
  left: "flex-start",
  right: "flex-end",
  "space-between": "space-between",
} as const;

export const AppCardFooter: FC<AppCardFooterProps> = ({ children, align = "right", divider = true, sx }) => (
  <>
    {divider && <Divider />}
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={JUSTIFY[align]}
      spacing={1.5}
      sx={[{ px: 2.5, py: 1.5, flexWrap: "wrap" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Stack>
  </>
);
