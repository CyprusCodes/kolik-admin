import { Button } from "@mui/material";
import type { Col } from "@xest-ui/data-table";
import StatusChip from "src/components/list/status-chip";
import {
  actionsColumn,
  employeesColumn,
  nameColumn,
  planColumn,
  tierColumn,
} from "src/components/organization-table/organization-columns";
import type { OrganizationRow } from "src/types/organization";
import { formatDate, trialShortLabel } from "src/utils/format";

export const buildBillingColumns = (onMakePaid: (row: OrganizationRow) => void): Col<OrganizationRow>[] => [
  nameColumn,
  planColumn,
  tierColumn,
  employeesColumn,
  {
    title: "Trial ends",
    dataIndex: "trial_expires_at",
    filterType: { dbCol: "organizations.trial_expires_at", type: "date" },
    render: (row) =>
      row.plan_type === "trial" && row.trial_expires_at ? (
        <StatusChip
          tone={new Date(row.trial_expires_at) < new Date() ? "bad" : "neutral"}
          label={formatDate(row.trial_expires_at)}
          tooltip={trialShortLabel(row.trial_expires_at)}
        />
      ) : (
        "-"
      ),
  },
  {
    title: "Billing",
    key: "billing",
    render: (row) =>
      row.plan_type === "paid" ? (
        <StatusChip tone="good" label="Paid" />
      ) : (
        <Button size="small" variant="outlined" onClick={() => onMakePaid(row)}>
          Make paid
        </Button>
      ),
  },
  actionsColumn,
];
