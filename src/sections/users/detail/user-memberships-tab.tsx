import {
  CardContent,
  Divider,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AppCard } from "src/components/kolik/app-card";
import { RouterLink } from "src/components/kolik/router-link";
import StatusChip from "src/components/list/status-chip";
import { paths } from "src/paths";
import type { PlatformUserMembership } from "src/types/user";
import { formatDate } from "src/utils/format";

const membershipTone: Record<PlatformUserMembership["status"], "good" | "warning" | "neutral" | "bad"> = {
  active: "good",
  disabled: "warning",
  archived: "neutral",
  removed: "bad",
};

const membershipLabel: Record<PlatformUserMembership["status"], string> = {
  active: "Active",
  disabled: "Disabled",
  archived: "Archived",
  removed: "Removed",
};

const UserMembershipsTab = ({ memberships }: { memberships: PlatformUserMembership[] }) => (
  <AppCard>
    <CardContent sx={{ pb: "0 !important" }}>
      <Typography variant="subtitle1" color="text.primary" gutterBottom>
        Organizations
      </Typography>
      <Divider />
    </CardContent>
    {memberships.length === 0 ? (
      <Typography color="text.secondary" sx={{ p: 3 }}>
        Not a member of any organization.
      </Typography>
    ) : (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Organization</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Membership</TableCell>
              <TableCell>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memberships.map((membership) => (
              <TableRow key={membership.userOrganizationId} hover>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Link
                      component={RouterLink}
                      href={paths.organizations.detail(membership.organizationId)}
                      color="text.primary"
                      underline="hover"
                    >
                      {membership.organizationName}
                    </Link>
                  </Stack>
                </TableCell>
                <TableCell>
                  {membership.isCompanyAdmin ? (
                    <StatusChip tone="primary" label={membership.roleName ?? "Company Admin"} />
                  ) : (
                    (membership.roleName ?? "-")
                  )}
                </TableCell>
                <TableCell>
                  <StatusChip
                    tone={membershipTone[membership.status]}
                    label={membershipLabel[membership.status]}
                  />
                </TableCell>
                <TableCell>{formatDate(membership.joinedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </AppCard>
);

export default UserMembershipsTab;
