import { Link, Typography } from "@mui/material";
import type { Col } from "@xest-ui/data-table";
import { RouterLink } from "src/components/kolik/router-link";
import StatusChip from "src/components/list/status-chip";
import { paths } from "src/paths";
import type { OrganizationEmployeeRow } from "src/types/organization";
import { formatDate, fromNow } from "src/utils/format";

const fullName = (row: OrganizationEmployeeRow) =>
  `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim() || "-";

export const employeeColumns: Col<OrganizationEmployeeRow>[] = [
  {
    title: "Name",
    dataIndex: "first_name",
    width: 160,
    filterType: { dbCol: "users.first_name", type: "string" },
    render: (row) =>
      row.user_id ? (
        <Link
          component={RouterLink}
          href={paths.users.detail(row.user_id)}
          color="text.primary"
          underline="hover"
          variant="body2"
          sx={{ whiteSpace: "nowrap" }}
        >
          {fullName(row)}
        </Link>
      ) : (
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          {fullName(row)}
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
    render: (row) => row.email ?? "-",
  },
  {
    title: "Position",
    dataIndex: "position_name",
    filterType: { dbCol: "positions.position_name", type: "string" },
    render: (row) => row.position_name ?? "-",
  },
  {
    title: "Department",
    dataIndex: "department_name",
    filterType: { dbCol: "departments.department_name", type: "string" },
    render: (row) => row.department_name ?? "-",
  },
  {
    title: "Role",
    dataIndex: "user_organization_role",
    filterType: { dbCol: "user_organization_roles.user_organization_role", type: "string" },
  },
  {
    title: "Status",
    key: "employee_status",
    render: (row) =>
      row.employee_status === "enabled" ? (
        <StatusChip tone="good" label="Enabled" />
      ) : (
        <StatusChip tone="bad" label="Disabled" />
      ),
  },
  {
    title: "Hire date",
    dataIndex: "hire_date",
    filterType: { dbCol: "employees.hire_date", type: "date" },
    render: (row) => (row.hire_date ? formatDate(row.hire_date) : "-"),
  },
  {
    title: "Last active",
    dataIndex: "last_active_at",
    filterType: { dbCol: "employee_activity.last_active_at", type: "date" },
    render: (row) => (
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        {row.last_active_at ? fromNow(row.last_active_at) : "Never"}
      </Typography>
    ),
  },
];
