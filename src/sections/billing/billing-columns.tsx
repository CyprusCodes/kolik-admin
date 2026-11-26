import { Tooltip, Typography } from "@mui/material";
import type { Col } from "@xest-ui/data-table";
import AsyncSwitch from "src/components/async-switch";
import {
  actionsColumn,
  employeesColumn,
  nameColumn,
  planColumn,
  statusColumn,
  tierColumn,
} from "src/components/organization-table/organization-columns";
import type { OrganizationRow } from "src/types/organization";

const billingOptions = [
  { label: "On", value: 1 },
  { label: "Off", value: 0 },
];

export const buildBillingColumns = (
  toggle: (target: { id: number; name: string }, enabled: boolean) => Promise<boolean>,
): Col<OrganizationRow>[] => [
  nameColumn,
  planColumn,
  tierColumn,
  employeesColumn,
  statusColumn,
  {
    title: "Billing",
    dataIndex: "billing_enabled",
    filterType: { dbCol: "organizations.billing_enabled", type: "options", options: billingOptions },
    render: (row) => (
      <AsyncSwitch
        key={`${row.organization_id}-${row.billing_enabled}`}
        checked={Boolean(row.billing_enabled)}
        aria-label={`Billing for ${row.organization_name}`}
        onToggle={(enabled) => toggle({ id: row.organization_id, name: row.organization_name }, enabled)}
      />
    ),
  },
  {
    title: "Reason",
    dataIndex: "billing_disabled_reason",
    render: (row) =>
      row.billing_disabled_reason ? (
        <Tooltip title={row.billing_disabled_reason}>
          <Typography variant="body2" noWrap sx={{ maxWidth: 240 }}>
            {row.billing_disabled_reason}
          </Typography>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  actionsColumn,
];
