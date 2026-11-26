import {
  Box,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AppCard, AppCardHeader } from "src/components/kolik/app-card";
import StatusChip from "src/components/list/status-chip";
import { formatDate, fromNow } from "src/utils/format";
import DeviceName from "./device-name";
import type { UserDevicesController } from "./use-user-devices";

interface UserDevicesTabProps {
  controller: UserDevicesController;
  isSelf: boolean;
  onSignOutSession: (sessionId: string, device: string) => void;
  onSignOutEverywhere: () => void;
}

const Empty = ({ children }: { children: string }) => (
  <Typography variant="body2" color="text.secondary" sx={{ px: 2.5, pb: 2.5 }}>
    {children}
  </Typography>
);

const UserDevicesTab = ({
  controller,
  isSelf,
  onSignOutSession,
  onSignOutEverywhere,
}: UserDevicesTabProps) => {
  const { data } = controller;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <AppCard>
        <AppCardHeader
          title="App sessions"
          info="Devices signed in to the Kolik mobile app. Signing a device out ends its session within 15 minutes."
          action={
            <Button
              color="error"
              variant="outlined"
              size="small"
              disabled={isSelf}
              onClick={onSignOutEverywhere}
            >
              Sign out everywhere
            </Button>
          }
        />
        {!data ? (
          <Skeleton variant="rounded" height={160} sx={{ m: 2.5 }} />
        ) : data.sessions.length === 0 ? (
          <Empty>This user hasn't signed in to the mobile app.</Empty>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Device</TableCell>
                  <TableCell>Signed in</TableCell>
                  <TableCell>Last active</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.sessions.map((session) => (
                  <TableRow key={session.sessionId} hover>
                    <TableCell>
                      <DeviceName {...session} />
                    </TableCell>
                    <TableCell>{formatDate(session.signedInAt)}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{fromNow(session.lastActiveAt)}</TableCell>
                    <TableCell>
                      {session.active ? (
                        <StatusChip tone="good" label="Signed in" />
                      ) : (
                        <StatusChip tone="neutral" label={session.revokedAt ? "Signed out" : "Expired"} />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {session.active && (
                        <Button
                          size="small"
                          color="error"
                          disabled={controller.signOutSession.isPending}
                          onClick={() => onSignOutSession(session.sessionId, session.device)}
                        >
                          Sign out
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </AppCard>

      <AppCard>
        <AppCardHeader
          title="Recent sign-ins"
          info="The last 20 sign-ins on web and mobile, with the device and IP address."
        />
        {!data ? (
          <Skeleton variant="rounded" height={160} sx={{ m: 2.5 }} />
        ) : data.signIns.length === 0 ? (
          <Empty>No sign-ins recorded yet.</Empty>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Device</TableCell>
                  <TableCell>IP address</TableCell>
                  <TableCell>When</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.signIns.map((signIn, index) => (
                  <TableRow key={`${signIn.signedInAt}-${index}`} hover>
                    <TableCell>
                      <DeviceName {...signIn} />
                    </TableCell>
                    <TableCell sx={{ fontFamily: "monospace" }}>{signIn.ip ?? "-"}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{fromNow(signIn.signedInAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </AppCard>
    </Box>
  );
};

export default UserDevicesTab;
