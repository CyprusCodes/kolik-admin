import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import type { FC, ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import { SoftIconButton } from "src/components/kolik/soft-icon-button";

interface DashboardCardProps {
  title: ReactNode;
  icon?: ReactNode;
  viewHref?: string;
  viewLabel?: ReactNode;
  action?: ReactNode;
  divider?: boolean;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export const DashboardCard: FC<DashboardCardProps> = (props) => {
  const { title, icon, viewHref, viewLabel, action, divider = false, children, sx } = props;

  const headerAction =
    action ??
    (viewHref && (
      <DashboardCardIconButton
        label={String(viewLabel ?? "View")}
        href={viewHref}
        icon={<ChevronRightIcon />}
      />
    ));

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
        ...sx,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.25}
        sx={{ px: 2.5, minHeight: 56, flexShrink: 0 }}
      >
        {icon && (
          <Box
            sx={{
              display: "inline-flex",
              color: "primary.main",
              "& svg": { fontSize: 20 },
            }}
          >
            {icon}
          </Box>
        )}
        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, flexGrow: 1 }}>
          {title}
        </Typography>
        {headerAction}
      </Stack>
      {divider && <Divider />}
      {children}
    </Card>
  );
};

export const DashboardCardIconButton = SoftIconButton;

export const DashboardCardContent: FC<{ children: ReactNode; sx?: SxProps<Theme> }> = ({ children, sx }) => (
  <Box sx={{ px: 2.5, pb: 2.5, flexGrow: 1, ...sx }}>{children}</Box>
);

interface DashboardCardEmptyProps {
  icon?: ReactNode;
  children: ReactNode;
  color?: string;
  action?: ReactNode;
}

export const DashboardCardEmpty: FC<DashboardCardEmptyProps> = ({
  icon,
  children,
  color = "text.secondary",
  action,
}) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{ flexGrow: 1, px: 2.5, py: 4, textAlign: "center", color }}
  >
    {icon && (
      <Box sx={{ display: "inline-flex", color: "text.disabled", "& svg": { fontSize: 28 } }}>{icon}</Box>
    )}
    <Typography variant="body2" sx={{ color: "inherit" }}>
      {children}
    </Typography>
    {action}
  </Stack>
);
