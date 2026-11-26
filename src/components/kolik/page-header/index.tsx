import { InfoOutlined as InfoOutlinedIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import type { FC, ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { SoftIconButton } from "src/components/kolik/soft-icon-button";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  info?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  actions?: ReactNode;
  sx?: SxProps<Theme>;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  info,
  onBack,
  backLabel,
  actions,
  sx,
}) => {
  const resolvedBackLabel = backLabel ?? "Back";
  const heading = typeof title === "string" ? <Typography variant="h3">{title}</Typography> : title;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      spacing={2}
      sx={sx}
    >
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {onBack && (
            <Box sx={{ display: "inline-flex", mt: "2px" }}>
              <SoftIconButton label={resolvedBackLabel} icon={<ArrowBackIcon />} onClick={onBack} plain />
            </Box>
          )}
          {info ? (
            <Tooltip title={info} placement="bottom-start">
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ display: "inline-flex", cursor: "help" }}
              >
                {heading}
                <InfoOutlinedIcon sx={{ fontSize: 20, color: "text.disabled" }} />
              </Stack>
            </Tooltip>
          ) : (
            heading
          )}
        </Stack>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && (
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0 }}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
};
