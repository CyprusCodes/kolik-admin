import { useState } from "react";
import { Alert, Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ConfirmDialog from "src/components/confirm-dialog";
import VerticalNav, {
  HorizontalDetailNav,
  useDetailNavLayout,
} from "src/components/detail-page/vertical-nav";
import { PageHeader } from "src/components/kolik/page-header";
import OrganizationActionsMenu from "src/sections/organizations/detail/organization-actions-menu";
import OrganizationDetailsTab from "src/sections/organizations/detail/organization-details-tab";
import AppsTab from "src/sections/organizations/detail/apps-tab";
import IntegrationsTab from "src/sections/organizations/detail/integrations-tab";
import PeopleTab from "src/sections/organizations/detail/people-tab";
import PlanModal from "src/sections/organizations/detail/plan-modal";
import SuspendModal from "src/sections/organizations/detail/suspend-modal";
import { useOrganization } from "src/sections/organizations/detail/use-organization";
import { useBillingToggle } from "src/sections/billing/use-billing-toggle";
import { useBreadcrumbLabel } from "src/layouts/dashboard/breadcrumb-store";
import { paths } from "src/paths";

const SECTIONS = [
  { value: "details", label: "Details" },
  { value: "apps", label: "Apps" },
  { value: "integrations", label: "Integrations" },
  { value: "people", label: "People" },
];

const OrganizationDetailPage = () => {
  const { organizationId } = useParams();
  const navigate = useNavigate();
  const mdUp = useDetailNavLayout();
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("tab");
  const tab = SECTIONS.some((section) => section.value === requested) ? (requested as string) : "details";
  const controller = useOrganization(Number(organizationId));
  const organization = controller.data;
  useBreadcrumbLabel(organization?.organizationName);
  const [planOpen, setPlanOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [reactivateOpen, setReactivateOpen] = useState(false);
  const billing = useBillingToggle();

  if (controller.isError) {
    return (
      <Stack alignItems="center" spacing={2} sx={{ py: 12 }}>
        <Typography variant="h6">We couldn't find this organization.</Typography>
        <Button component={Link} to={paths.organizations.index} variant="outlined">
          Back to organizations
        </Button>
      </Stack>
    );
  }

  if (!organization) {
    return (
      <Stack spacing={3}>
        <Skeleton variant="text" width={320} height={56} />
        <Stack direction="row" spacing={3}>
          {mdUp && <Skeleton variant="rounded" width={220} height={180} />}
          <Skeleton variant="rounded" height={480} sx={{ flexGrow: 1 }} />
        </Stack>
      </Stack>
    );
  }

  const changeTab = (value: string) =>
    setSearchParams(value === "details" ? {} : { tab: value }, { replace: true });

  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <PageHeader
          title={organization.organizationName}
          onBack={() => navigate(paths.organizations.index)}
          actions={
            <OrganizationActionsMenu
              organization={organization}
              onChangePlan={() => setPlanOpen(true)}
              onSuspend={() => setSuspendOpen(true)}
              onReactivate={() => setReactivateOpen(true)}
            />
          }
        />
        {!mdUp && <HorizontalDetailNav items={SECTIONS} value={tab} onChange={changeTab} />}
        {organization.status === "suspended" && (
          <Alert severity="error">
            This organization is suspended: {organization.suspendedReason ?? "no reason given"}.
          </Alert>
        )}
      </Stack>
      <Stack direction="row" spacing={3} alignItems="flex-start">
        {mdUp && <VerticalNav items={SECTIONS} value={tab} onChange={changeTab} />}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {tab === "details" && (
            <OrganizationDetailsTab
              organization={organization}
              controller={controller}
              onEditPlan={() => setPlanOpen(true)}
              onToggleBilling={(enabled) =>
                billing.toggle(
                  { id: organization.organizationId, name: organization.organizationName },
                  enabled,
                )
              }
            />
          )}
          {tab === "apps" && <AppsTab organization={organization} controller={controller} />}
          {tab === "integrations" && <IntegrationsTab integrations={organization.integrations} />}
          {tab === "people" && <PeopleTab organizationId={organization.organizationId} />}
        </Box>
      </Stack>
      <PlanModal
        key={`${planOpen}-${organization.planType}-${organization.maxEmployees}`}
        organization={organization}
        opened={planOpen}
        saving={controller.updatePlan.isPending}
        onClose={() => setPlanOpen(false)}
        onSave={(values) => controller.updatePlan.mutate(values, { onSuccess: () => setPlanOpen(false) })}
      />
      <SuspendModal
        key={String(suspendOpen)}
        organizationName={organization.organizationName}
        opened={suspendOpen}
        saving={controller.updateStatus.isPending}
        onClose={() => setSuspendOpen(false)}
        onConfirm={(reason) =>
          controller.updateStatus.mutate(
            { status: "suspended", reason },
            { onSuccess: () => setSuspendOpen(false) },
          )
        }
      />
      <ConfirmDialog
        open={reactivateOpen}
        title={`Reactivate ${organization.organizationName}?`}
        message="Everyone in this organization can log in again straight away."
        confirmLabel="Reactivate"
        loading={controller.updateStatus.isPending}
        onCancel={() => setReactivateOpen(false)}
        onConfirm={() =>
          controller.updateStatus.mutate({ status: "active" }, { onSuccess: () => setReactivateOpen(false) })
        }
      />
      {billing.modal}
    </>
  );
};

export default OrganizationDetailPage;
