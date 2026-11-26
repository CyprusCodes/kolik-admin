import { Autocomplete, Grid, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AppCard, AppCardContent, AppCardHeader } from "src/components/kolik/app-card";
import getOrganizations from "src/services/organizations/getOrganizations";
import { countries } from "./countries";
import { fieldProps } from "./field-props";
import type { CreateOrganizationFormik } from "./use-create-organization-form";

const OrganizationDetailsCard = ({ formik }: { formik: CreateOrganizationFormik }) => {
  const { data } = useQuery({
    queryKey: ["organizations", "spotlight"],
    queryFn: () => getOrganizations({ pageSize: 500 }).then((response) => response.data.organizations),
  });
  const countryError = formik.touched.country ? formik.errors.country : undefined;

  return (
    <AppCard>
      <AppCardHeader title="Organization" />
      <AppCardContent>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              required
              label="Organization name"
              {...fieldProps(formik, "organizationName")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={countries}
              value={formik.values.country}
              onChange={(_, value) => formik.setFieldValue("country", value)}
              onBlur={() => formik.setFieldTouched("country", true)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  required
                  label="Country"
                  error={Boolean(countryError)}
                  helperText={countryError}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Business type"
              placeholder="e.g. Banking"
              {...fieldProps(formik, "businessType")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Website"
              placeholder="https://"
              {...fieldProps(formik, "websiteUrl")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              select
              label="Default language"
              {...fieldProps(formik, "language")}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="tr">Turkish</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              select
              label="Parent organization"
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              {...fieldProps(formik, "parentOrganizationId")}
            >
              <MenuItem value="">None</MenuItem>
              {(data ?? []).map((organization) => (
                <MenuItem key={organization.organizationId} value={String(organization.organizationId)}>
                  {organization.organizationName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </AppCardContent>
    </AppCard>
  );
};

export default OrganizationDetailsCard;
