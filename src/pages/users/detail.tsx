import { useState } from "react";
import { Alert, Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ConfirmDialog from "src/components/confirm-dialog";
import VerticalNav, {
  HorizontalDetailNav,
  useDetailNavLayout,
} from "src/components/detail-page/vertical-nav";
import { PageHeader } from "src/components/kolik/page-header";
import Authentication from "src/services/authentication";
import UserActionsMenu from "src/sections/users/detail/user-actions-menu";
import UserDetailsTab from "src/sections/users/detail/user-details-tab";
import UserMembershipsTab from "src/sections/users/detail/user-memberships-tab";
import UserDevicesTab from "src/sections/users/detail/user-devices-tab";
import { useUserDevices } from "src/sections/users/detail/use-user-devices";
import { usePlatformUser } from "src/sections/users/detail/use-platform-user";
import { useBreadcrumbLabel } from "src/layouts/dashboard/breadcrumb-store";
import { paths } from "src/paths";

const SECTIONS = [
  { value: "details", label: "Details" },
  { value: "organizations", label: "Organizations" },
  { value: "devices", label: "Devices" },
];

const UserDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const mdUp = useDetailNavLayout();
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("tab");
  const tab = SECTIONS.some((section) => section.value === requested) ? (requested as string) : "details";
  const controller = usePlatformUser(Number(userId));
  const user = controller.data;
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : undefined;
  useBreadcrumbLabel(fullName);
  const currentUserId = new Authentication().getAccessTokenPayload()?.userId;
  const [resetOpen, setResetOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [signOutAllOpen, setSignOutAllOpen] = useState(false);
  const [sessionToEnd, setSessionToEnd] = useState<{ sessionId: string; device: string } | null>(null);
  const devices = useUserDevices(Number(userId));

  if (controller.isError) {
    return (
      <Stack alignItems="center" spacing={2} sx={{ py: 12 }}>
        <Typography variant="h6">We couldn't find this user.</Typography>
        <Button component={Link} to={paths.users.index} variant="outlined">
          Back to users
        </Button>
      </Stack>
    );
  }

  if (!user) {
    return (
      <Stack spacing={3}>
        <Skeleton variant="text" width={320} height={56} />
        <Stack direction="row" spacing={3}>
          {mdUp && <Skeleton variant="rounded" width={220} height={120} />}
          <Skeleton variant="rounded" height={400} sx={{ flexGrow: 1 }} />
        </Stack>
      </Stack>
    );
  }

  const enabled = user.userStatus === "enabled";
  const changeTab = (value: string) =>
    setSearchParams(value === "details" ? {} : { tab: value }, { replace: true });

  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <PageHeader
          title={fullName}
          onBack={() => navigate(paths.users.index)}
          actions={
            <UserActionsMenu
              user={user}
              isSelf={user.userId === currentUserId}
              onPasswordReset={() => setResetOpen(true)}
              onToggleStatus={() => setStatusOpen(true)}
              onSignOutEverywhere={() => setSignOutAllOpen(true)}
            />
          }
        />
        {!mdUp && <HorizontalDetailNav items={SECTIONS} value={tab} onChange={changeTab} />}
        {!enabled && <Alert severity="error">This user is disabled and can't sign in to Kolik.</Alert>}
      </Stack>
      <Stack direction="row" spacing={3} alignItems="flex-start">
        {mdUp && <VerticalNav items={SECTIONS} value={tab} onChange={changeTab} />}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {tab === "details" && <UserDetailsTab user={user} />}
          {tab === "organizations" && <UserMembershipsTab memberships={user.memberships} />}
          {tab === "devices" && (
            <UserDevicesTab
              controller={devices}
              isSelf={user.userId === currentUserId}
              onSignOutSession={(sessionId, device) => setSessionToEnd({ sessionId, device })}
              onSignOutEverywhere={() => setSignOutAllOpen(true)}
            />
          )}
        </Box>
      </Stack>
      <ConfirmDialog
        open={resetOpen}
        title="Send a password reset email?"
        message={`${user.email} will get a link to set a new password.`}
        confirmLabel="Send email"
        loading={controller.sendPasswordReset.isPending}
        onCancel={() => setResetOpen(false)}
        onConfirm={() =>
          controller.sendPasswordReset.mutate(undefined, { onSuccess: () => setResetOpen(false) })
        }
      />
      <ConfirmDialog
        open={statusOpen}
        title={enabled ? `Disable ${fullName}?` : `Enable ${fullName}?`}
        message={
          enabled
            ? "They are signed out and can't use Kolik in any organization until you enable them again."
            : "They can sign in to Kolik again straight away."
        }
        confirmLabel={enabled ? "Disable" : "Enable"}
        danger={enabled}
        loading={controller.updateStatus.isPending}
        onCancel={() => setStatusOpen(false)}
        onConfirm={() =>
          controller.updateStatus.mutate(enabled ? "disabled" : "enabled", {
            onSuccess: () => setStatusOpen(false),
          })
        }
      />
      <ConfirmDialog
        open={signOutAllOpen}
        title={`Sign ${fullName} out everywhere?`}
        message="They're signed out of the web app and every phone straight away and need to sign in again."
        confirmLabel="Sign out everywhere"
        danger
        loading={devices.signOutEverywhere.isPending}
        onCancel={() => setSignOutAllOpen(false)}
        onConfirm={() =>
          devices.signOutEverywhere.mutate(undefined, { onSuccess: () => setSignOutAllOpen(false) })
        }
      />
      <ConfirmDialog
        open={Boolean(sessionToEnd)}
        title={`Sign out ${sessionToEnd?.device ?? "this device"}?`}
        message="This device has to sign in again. Their other devices stay signed in."
        confirmLabel="Sign out"
        danger
        loading={devices.signOutSession.isPending}
        onCancel={() => setSessionToEnd(null)}
        onConfirm={() =>
          sessionToEnd &&
          devices.signOutSession.mutate(sessionToEnd.sessionId, { onSuccess: () => setSessionToEnd(null) })
        }
      />
    </>
  );
};

export default UserDetailPage;
