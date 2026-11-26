import type { ReactNode } from "react";
import {
  Apartment as ApartmentIcon,
  Block as BlockIcon,
  DomainAdd as DomainAddIcon,
  Groups as GroupsIcon,
  HourglassTop as HourglassTopIcon,
  MoneyOff as MoneyOffIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { AppCard } from "src/components/kolik/app-card";
import { RouterLink } from "src/components/kolik/router-link";
import type { OverviewTotals } from "src/types/overview";
import { formatNumber } from "src/utils/format";
import { paths } from "src/paths";

interface StatProps {
  icon: ReactNode;
  label: string;
  value?: number;
  to: string;
}

const Stat = ({ icon, label, value, to }: StatProps) => (
  <Box component={RouterLink} href={to} sx={{ display: "block", textDecoration: "none", color: "inherit" }}>
    <AppCard
      sx={{
        height: 210,
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "border-color 120ms",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
          mb: 3,
        }}
      >
        {icon}
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      {value === undefined ? (
        <Skeleton variant="text" width={80} height={44} />
      ) : (
        <Typography variant="h4" fontWeight={700}>
          {formatNumber(value)}
        </Typography>
      )}
    </AppCard>
  </Box>
);

const StatCards = ({ totals, days }: { totals?: OverviewTotals; days: number }) => (
  <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
    <Stat
      icon={<ApartmentIcon />}
      label="Organizations"
      value={totals?.organizations}
      to={paths.organizations.index}
    />
    <Stat
      icon={<DomainAddIcon />}
      label={`New organizations (${days}d)`}
      value={totals?.newOrganizations}
      to={paths.organizations.index}
    />
    <Stat icon={<GroupsIcon />} label="Employees" value={totals?.employees} to={paths.organizations.index} />
    <Stat icon={<PeopleIcon />} label="Users" value={totals?.users} to={paths.users.index} />
    <Stat
      icon={<TrendingUpIcon />}
      label={`Active users (${days}d)`}
      value={totals?.activeUsers}
      to={paths.users.index}
    />
    <Stat
      icon={<HourglassTopIcon />}
      label="Trials running"
      value={totals?.trialOrganizations}
      to={`${paths.organizations.index}?plan=trial`}
    />
    <Stat
      icon={<BlockIcon />}
      label="Suspended"
      value={totals?.suspendedOrganizations}
      to={`${paths.organizations.index}?status=suspended`}
    />
    <Stat
      icon={<MoneyOffIcon />}
      label="Billing off"
      value={totals?.billingOffOrganizations}
      to={paths.billing}
    />
  </Box>
);

export default StatCards;
