import { useState } from "react";
import { MonitorHeart as MonitorHeartIcon, OpenInNew as OpenInNewIcon } from "@mui/icons-material";
import { Box, Button, Skeleton, Stack } from "@mui/material";
import { AppCard, AppCardEmptyState } from "src/components/kolik/app-card";
import { PageHeader } from "src/components/kolik/page-header";
import { CLOUDWATCH_DASHBOARD_URL } from "src/constants/api";

const PlatformHealthPage = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Platform health"
        info="The kolik-api CloudWatch dashboard: errors, latency, traffic and resources."
        actions={
          CLOUDWATCH_DASHBOARD_URL ? (
            <Button
              component="a"
              href={CLOUDWATCH_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<OpenInNewIcon />}
            >
              Open in CloudWatch
            </Button>
          ) : undefined
        }
      />
      {CLOUDWATCH_DASHBOARD_URL ? (
        <AppCard
          sx={{ overflow: "hidden", position: "relative", height: "calc(100vh - 220px)", minHeight: 600 }}
        >
          {!loaded && (
            <Skeleton variant="rectangular" sx={{ position: "absolute", inset: 0, height: "100%" }} />
          )}
          <Box
            component="iframe"
            title="kolik-api CloudWatch dashboard"
            src={CLOUDWATCH_DASHBOARD_URL}
            onLoad={() => setLoaded(true)}
            sx={{ border: 0, width: "100%", height: "100%", display: "block" }}
          />
        </AppCard>
      ) : (
        <AppCard>
          <AppCardEmptyState
            icon={<MonitorHeartIcon />}
            title="The CloudWatch dashboard isn't set up"
            description="Set VITE_CLOUDWATCH_DASHBOARD_URL to the dashboard's share link to show it here."
          />
        </AppCard>
      )}
    </Stack>
  );
};

export default PlatformHealthPage;
