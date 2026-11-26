import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppCard, AppCardContent, AppCardHeader } from "src/components/kolik/app-card";
import type { OverviewAttention } from "src/types/overview";
import { paths } from "src/paths";

interface RowProps {
  label: string;
  count: number;
  to: string;
  urgent?: boolean;
}

const Row = ({ label, count, to, urgent }: RowProps) => {
  const navigate = useNavigate();

  return (
    <ListItemButton onClick={() => navigate(to)} sx={{ borderRadius: 1, px: 1.5 }}>
      <ListItemText primary={label} primaryTypographyProps={{ variant: "body2" }} />
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography
          variant="subtitle2"
          color={count === 0 ? "text.secondary" : urgent ? "error.main" : "warning.main"}
        >
          {count}
        </Typography>
        <ChevronRightIcon fontSize="small" sx={{ color: "text.disabled" }} />
      </Stack>
    </ListItemButton>
  );
};

const AttentionCard = ({ attention }: { attention?: OverviewAttention }) => (
  <AppCard sx={{ height: "100%" }}>
    <AppCardHeader title="Needs attention" />
    <AppCardContent sx={{ px: 1 }}>
      {!attention ? (
        <Skeleton variant="rounded" height={240} sx={{ mx: 1.5 }} />
      ) : (
        <List disablePadding>
          <Row
            label="Trials ended"
            count={attention.trialEnded}
            to={`${paths.organizations.index}?plan=trial`}
            urgent
          />
          <Row
            label="Suspended organizations"
            count={attention.suspended}
            to={`${paths.organizations.index}?status=suspended`}
            urgent
          />
          <Row
            label="Trials ending this week"
            count={attention.trialEnding}
            to={`${paths.organizations.index}?plan=trial`}
          />
          <Row label="At their employee limit" count={attention.seatLimit} to={paths.organizations.index} />
          <Row label="Billing turned off" count={attention.billingOff} to={paths.billing} />
        </List>
      )}
    </AppCardContent>
  </AppCard>
);

export default AttentionCard;
