import { Box, CardContent, Divider, Stack, Switch, Typography } from "@mui/material";
import { AppCard } from "src/components/kolik/app-card";
import type { OrganizationDetail } from "src/types/organization";
import { formatDate } from "src/utils/format";
import type { OrganizationController } from "./use-organization";

const AppsTab = ({
  organization,
  controller,
}: {
  organization: OrganizationDetail;
  controller: OrganizationController;
}) => {
  const pendingAppId = controller.toggleApp.isPending ? controller.toggleApp.variables?.appId : null;

  return (
    <AppCard>
      <CardContent>
        <Typography variant="subtitle1" color="text.primary" gutterBottom>
          Apps
        </Typography>
        <Divider />
        {organization.apps.map((app, index) => (
          <Box key={app.appId}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              sx={{ py: 2 }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body1">
                  {app.name}
                  {app.isBeta ? " (beta)" : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {app.enabled ? `On since ${formatDate(app.enabledAt)}` : app.description}
                </Typography>
              </Box>
              <Switch
                checked={app.enabled}
                disabled={pendingAppId === app.appId}
                onChange={(event) =>
                  controller.toggleApp.mutate({ appId: app.appId, enabled: event.target.checked })
                }
                inputProps={{ "aria-label": `Turn ${app.name} ${app.enabled ? "off" : "on"}` }}
              />
            </Stack>
            {index < organization.apps.length - 1 && <Divider />}
          </Box>
        ))}
      </CardContent>
    </AppCard>
  );
};

export default AppsTab;
