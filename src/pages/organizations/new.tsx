import { Box, Button, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "src/components/kolik/page-header";
import CompanyAdminCard from "src/sections/organizations/create/company-admin-card";
import OrganizationDetailsCard from "src/sections/organizations/create/organization-details-card";
import PlanBillingCard from "src/sections/organizations/create/plan-billing-card";
import { useCreateOrganizationForm } from "src/sections/organizations/create/use-create-organization-form";
import { paths } from "src/paths";

const NewOrganizationPage = () => {
  const navigate = useNavigate();
  const formik = useCreateOrganizationForm();

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Stack spacing={3}>
        <PageHeader
          title="New organization"
          info="Creates the organization and its first company admin together."
          onBack={() => navigate(paths.organizations.index)}
        />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <Stack spacing={3}>
                <OrganizationDetailsCard formik={formik} />
                <PlanBillingCard formik={formik} />
              </Stack>
            </Grid>
            <Grid item xs={12} lg={5}>
              <CompanyAdminCard formik={formik} />
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button color="inherit" onClick={() => navigate(paths.organizations.index)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
            Create organization
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default NewOrganizationPage;
