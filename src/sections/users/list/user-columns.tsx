import { Tooltip, Typography } from "@mui/material";
import type { Col } from "@xest-ui/data-table";
import StatusChip from "src/components/list/status-chip";
import type { PlatformUserRow } from "src/types/user";
import { formatDate, fromNow } from "src/utils/format";
import UserRowActions from "./user-row-actions";

const statusOptions = [
  { label: "Enabled", value: "enabled" },
  { label: "Disabled", value: "disabled" },
];

const superAdminOptions = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

export const userColumns: Col<PlatformUserRow>[] = [
  {
    title: "Name",
    dataIndex: "first_name",
    width: 140,
    filterType: { dbCol: "users.first_name", type: "string" },
    render: (row) => (
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        {`${row.first_name} ${row.last_name}`.trim()}
      </Typography>
    ),
  },
  {
    title: "Last name",
    dataIndex: "last_name",
    hidden: true,
    filterType: { dbCol: "users.last_name", type: "string" },
  },
  {
    title: "Email",
    dataIndex: "email",
    filterType: { dbCol: "users.email", type: "string" },
  },
  {
    title: "Organizations",
    dataIndex: "organization_count",
    filterType: { dbCol: "user_membership_counts.organization_count", type: "number" },
    render: (row) =>
      row.organization_names ? (
        <Tooltip title={row.organization_names}>
          <span>{row.organization_count}</span>
        </Tooltip>
      ) : (
        "0"
      ),
  },
  {
    title: "Super admin",
    dataIndex: "is_super_admin",
    hidden: true,
    filterType: { dbCol: "users.is_super_admin", type: "options", options: superAdminOptions },
    render: (row) => (row.is_super_admin ? <StatusChip tone="primary" label="Super admin" /> : "-"),
  },
  {
    title: "Status",
    dataIndex: "user_status",
    filterType: { dbCol: "users.user_status", type: "options", options: statusOptions },
    render: (row) =>
      row.user_status === "enabled" ? (
        <StatusChip tone="good" label="Enabled" />
      ) : (
        <StatusChip tone="bad" label="Disabled" />
      ),
  },
  {
    title: "Joined",
    dataIndex: "created_at",
    hidden: true,
    filterType: { dbCol: "users.created_at", type: "date" },
    render: (row) => formatDate(row.created_at),
  },
  {
    title: "Last active",
    dataIndex: "last_active_at",
    filterType: { dbCol: "user_activity.last_active_at", type: "date" },
    render: (row) => (
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        {row.last_active_at ? fromNow(row.last_active_at) : "-"}
      </Typography>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    fixed: "right",
    render: (row) => <UserRowActions userId={row.user_id} email={row.email} />,
  },
];
