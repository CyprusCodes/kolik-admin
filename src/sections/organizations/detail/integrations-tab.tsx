import { CardContent, Grid } from "@mui/material";
import StatusChip from "src/components/list/status-chip";
import { DetailField, DetailSection } from "src/components/detail-page/detail-section";
import { AppCard } from "src/components/kolik/app-card";
import type { OrganizationIntegration } from "src/types/organization";
import { integrationLabels } from "src/sections/organizations/integration-labels";

const IntegrationsTab = ({ integrations }: { integrations: OrganizationIntegration[] }) => (
  <AppCard>
    <CardContent>
      <Grid container spacing={4}>
        <DetailSection title="Integrations">
          {integrations.map((integration) => (
            <DetailField key={integration.key} label={integrationLabels[integration.key].label}>
              {integration.status === "connected" ? (
                <StatusChip tone="good" label="Set up" />
              ) : integration.status === "error" ? (
                <StatusChip tone="bad" label="Failing" />
              ) : (
                <StatusChip tone="neutral" label="Not set up" />
              )}
            </DetailField>
          ))}
        </DetailSection>
      </Grid>
    </CardContent>
  </AppCard>
);

export default IntegrationsTab;
