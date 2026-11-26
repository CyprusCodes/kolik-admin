import { InfoOutlined as InfoOutlinedIcon } from "@mui/icons-material";
import type { FC, ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Box, Stack, Tooltip, Typography } from "@mui/material";

interface AppCardHeaderProps {
  title: ReactNode;
  icon?: ReactNode;
  info?: ReactNode;
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

export const AppCardHeader: FC<AppCardHeaderProps> = ({ title, icon, info, action, sx }) => {
  const heading = (
    <Stack direction="row" alignItems="center" spacing={0.75} sx={{ minWidth: 0 }}>
      <Typography variant="subtitle1" fontWeight={600} noWrap>
        {title}
      </Typography>
      {info && <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.disabled", flexShrink: 0 }} />}
    </Stack>
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.25}
      sx={[{ px: 2.5, pt: 2, pb: 1.5 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {icon && (
        <Box sx={{ display: "inline-flex", color: "primary.main", "& svg": { fontSize: 20 } }}>{icon}</Box>
      )}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {info ? (
          <Tooltip title={info} placement="top-start">
            <Box sx={{ display: "inline-flex", maxWidth: "100%", cursor: "help" }}>{heading}</Box>
          </Tooltip>
        ) : (
          heading
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Stack>
  );
};
