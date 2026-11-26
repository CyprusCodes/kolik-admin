import { Tooltip, Typography } from "@mui/material";
import type { Col } from "@xest-ui/data-table";
import { formatSeats, formatTier } from "src/constants/labels";
import type { OrganizationRow } from "src/types/organization";
import { formatDate, trialShortLabel } from "src/utils/format";
import OrganizationRowActions from "./organization-row-actions";

const planOptions = [
  { label: "Paid", value: "paid" },
  { label: "Trial", value: "trial" },
];

export const nameColumn: Col<OrganizationRow> = {
  title: "Organization",
  dataIndex: "organization_name",
  width: 180,
  filterType: { dbCol: "organizations.organization_name", type: "string" },
  render: (row) =>
    row.parent_organization_name ? (
      <Tooltip title={`Part of ${row.parent_organization_name}`}>
        <Typography variant="body2" component="span">
          {row.organization_name}
        </Typography>
      </Tooltip>
    ) : (
      row.organization_name
    ),
};

export const parentColumn: Col<OrganizationRow> = {
  title: "Parent",
  dataIndex: "parent_organization_name",
  hidden: true,
  filterType: { dbCol: "parent_organizations.organization_name", type: "string" },
  render: (row) => row.parent_organization_name ?? "-",
};

export const planColumn: Col<OrganizationRow> = {
  title: "Plan",
  dataIndex: "plan_type",
  filterType: { dbCol: "organizations.plan_type", type: "options", options: planOptions },
  render: (row) =>
    row.plan_type === "paid" ? (
      "Paid"
    ) : row.trial_expires_at ? (
      <Tooltip title={trialShortLabel(row.trial_expires_at) ?? ""}>
        <Typography variant="body2" component="span">
          Trial
        </Typography>
      </Tooltip>
    ) : (
      "Trial"
    ),
};

export const tierColumn: Col<OrganizationRow> = {
  title: "Tier",
  dataIndex: "organization_tier_type",
  filterType: { dbCol: "organizations.organization_tier_type", type: "string" },
  render: (row) => formatTier(row.organization_tier_type),
};

export const employeesColumn: Col<OrganizationRow> = {
  title: "Employees",
  dataIndex: "employee_count",
  filterType: { dbCol: "organization_headcounts.employee_count", type: "number" },
  render: (row) => formatSeats(row.employee_count, row.max_employees),
};

export const appsColumn: Col<OrganizationRow> = {
  title: "Apps",
  dataIndex: "enabled_app_count",
  filterType: { dbCol: "organization_app_counts.enabled_app_count", type: "number" },
  render: (row) => String(row.enabled_app_count),
};

export const joinedColumn: Col<OrganizationRow> = {
  title: "Joined",
  dataIndex: "created_at",
  filterType: { dbCol: "organizations.created_at", type: "date" },
  render: (row) => formatDate(row.created_at),
};

export const actionsColumn: Col<OrganizationRow> = {
  title: "Actions",
  key: "actions",
  fixed: "right",
  render: (row) => <OrganizationRowActions organizationId={row.organization_id} />,
};

export const organizationColumns: Col<OrganizationRow>[] = [
  nameColumn,
  parentColumn,
  planColumn,
  employeesColumn,
  appsColumn,
  joinedColumn,
  actionsColumn,
];
