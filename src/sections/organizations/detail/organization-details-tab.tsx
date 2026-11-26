import { CardContent, Grid, IconButton, Link, Stack, Tooltip, Typography } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import AsyncSwitch from "src/components/async-switch";
import { DetailField, DetailSection } from "src/components/detail-page/detail-section";
import ProfileHeader from "src/components/detail-page/profile-header";
import { AppCard } from "src/components/kolik/app-card";
import { RouterLink } from "src/components/kolik/router-link";
import { formatTier } from "src/constants/labels";
import type { OrganizationDetail } from "src/types/organization";
import { formatDate, trialLabel } from "src/utils/format";
import { paths } from "src/paths";
import type { OrganizationController } from "./use-organization";

interface OrganizationDetailsTabProps {
  organization: OrganizationDetail;
  controller: OrganizationController;
  onEditPlan: () => void;
}

const languageNames: Record<string, string> = { en: "English", tr: "Turkish" };

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

const OrganizationDetailsTab = ({ organization, controller, onEditPlan }: OrganizationDetailsTabProps) => {
  const plan = organization.planType === "paid" ? "Paid plan" : "Trial";
  const tier = organization.tier ? formatTier(organization.tier) : null;

  return (
    <AppCard>
      <CardContent>
        <ProfileHeader
          name={organization.organizationName}
          image={organization.logoUrl}
          initials={initialsOf(organization.organizationName)}
          lines={[
            [plan, tier].filter(Boolean).join(" · "),
            [organization.businessType, organization.country].filter(Boolean).join(" · "),
          ]}
          action={
            <Tooltip title="Change plan">
              <IconButton onClick={onEditPlan} aria-label="Change plan">
                <EditIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <Grid container spacing={4}>
          <DetailSection title="Organization Information">
            <DetailField label="Business Type">{organization.businessType || "-"}</DetailField>
            <DetailField label="Country">{organization.country || "-"}</DetailField>
            <DetailField label="Website">
              {organization.websiteUrl ? (
                <Link href={organization.websiteUrl} target="_blank" underline="hover">
                  {organization.websiteUrl.replace(/^https?:\/\//, "")}
                </Link>
              ) : (
                "-"
              )}
            </DetailField>
            <DetailField label="Default Language">
              {languageNames[organization.language] ?? organization.language}
            </DetailField>
            <DetailField label="Joined">{formatDate(organization.createdAt)}</DetailField>
            <DetailField label="Organization ID">{organization.organizationId}</DetailField>
          </DetailSection>

          <DetailSection title="Plan and Limits">
            <DetailField label="Plan">{plan}</DetailField>
            <DetailField label="Tier">{tier ?? "-"}</DetailField>
            <DetailField label="Employees">{organization.employeeCount}</DetailField>
            <DetailField label="Employee Limit">{organization.maxEmployees ?? "No limit"}</DetailField>
            {organization.planType === "trial" && (
              <DetailField label="Trial Ends">
                {formatDate(organization.trialExpiresAt)} (
                {trialLabel(organization.trialExpiresAt)?.toLowerCase()})
              </DetailField>
            )}
            <DetailField label="Apps Turned On">
              {organization.apps.filter((app) => app.enabled).length} of {organization.apps.length}
            </DetailField>
          </DetailSection>

          <DetailSection title="Settings">
            <DetailField label="Session Recording">
              <Stack direction="row" alignItems="center" spacing={1}>
                <AsyncSwitch
                  key={String(organization.sessionRecording)}
                  checked={organization.sessionRecording}
                  onToggle={(enabled) =>
                    controller.toggleSessionRecording
                      .mutateAsync(enabled)
                      .then(() => true)
                      .catch(() => false)
                  }
                  aria-label="Session recording"
                />
                <Typography>{organization.sessionRecording ? "On" : "Off"}</Typography>
              </Stack>
            </DetailField>
          </DetailSection>

          <DetailSection title="Group">
            <DetailField label="Parent Organization">
              {organization.parentOrganizationId ? (
                <Link
                  component={RouterLink}
                  href={paths.organizations.detail(organization.parentOrganizationId)}
                  underline="hover"
                >
                  {organization.parentOrganizationName}
                </Link>
              ) : (
                "None"
              )}
            </DetailField>
            <DetailField label="Subsidiaries">
              {organization.subsidiaries.length === 0 ? (
                "None"
              ) : (
                <Stack spacing={0.5}>
                  {organization.subsidiaries.map((subsidiary) => (
                    <Link
                      key={subsidiary.organizationId}
                      component={RouterLink}
                      href={paths.organizations.detail(subsidiary.organizationId)}
                      underline="hover"
                    >
                      {subsidiary.organizationName}
                    </Link>
                  ))}
                </Stack>
              )}
            </DetailField>
          </DetailSection>
        </Grid>
      </CardContent>
    </AppCard>
  );
};

export default OrganizationDetailsTab;
