import { CardContent, Grid, Stack } from "@mui/material";
import { DetailField, DetailSection } from "src/components/detail-page/detail-section";
import ProfileHeader from "src/components/detail-page/profile-header";
import { AppCard } from "src/components/kolik/app-card";
import StatusChip from "src/components/list/status-chip";
import type { PlatformUser } from "src/types/user";
import { formatDate, fromNow } from "src/utils/format";

const languageNames: Record<string, string> = { en: "English", tr: "Turkish" };

const UserDetailsTab = ({ user }: { user: PlatformUser }) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials = [user.firstName, user.lastName].map((part) => part.charAt(0).toUpperCase()).join("");
  const admin = user.memberships.find((membership) => membership.isCompanyAdmin);

  return (
    <AppCard>
      <CardContent>
        <ProfileHeader
          name={fullName}
          image={user.image}
          initials={initials}
          lines={[user.email, admin ? `Company Admin · ${admin.organizationName}` : null]}
        />
        <Grid container spacing={4}>
          <DetailSection title="Personal Information">
            <DetailField label="First Name">{user.firstName}</DetailField>
            <DetailField label="Last Name">{user.lastName}</DetailField>
            <DetailField label="Email">{user.email}</DetailField>
            <DetailField label="Language">
              {user.language ? (languageNames[user.language] ?? user.language) : "-"}
            </DetailField>
          </DetailSection>

          <DetailSection title="Account">
            <DetailField label="Status">
              <Stack direction="row" spacing={1}>
                {user.userStatus === "enabled" ? (
                  <StatusChip tone="good" label="Enabled" />
                ) : (
                  <StatusChip tone="bad" label="Disabled" />
                )}
                {user.isSuperAdmin && <StatusChip tone="primary" label="Super admin" />}
              </Stack>
            </DetailField>
            <DetailField label="Password">
              {user.passwordChangeRequired ? (
                <StatusChip tone="warning" label="Must change password" />
              ) : (
                "Set"
              )}
            </DetailField>
            <DetailField label="Joined">{formatDate(user.createdAt)}</DetailField>
            <DetailField label="Account Activated">
              {user.accountActivatedAt ? formatDate(user.accountActivatedAt) : "Not yet"}
            </DetailField>
            <DetailField label="Last Active">
              {user.lastActiveAt ? fromNow(user.lastActiveAt) : "Never signed in"}
            </DetailField>
            <DetailField label="Organizations">{user.memberships.length}</DetailField>
            <DetailField label="User ID">{user.userId}</DetailField>
          </DetailSection>
        </Grid>
      </CardContent>
    </AppCard>
  );
};

export default UserDetailsTab;
