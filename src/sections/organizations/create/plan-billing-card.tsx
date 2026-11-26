import { Box, Grid, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AppCard, AppCardContent, AppCardHeader } from "src/components/kolik/app-card";
import { isPickerDateStillBeingTyped } from "src/components/paginated-table/is-picker-date-still-being-typed";
import { tierOptions } from "src/constants/labels";
import { fieldProps } from "./field-props";
import type { CreateOrganizationFormik } from "./use-create-organization-form";

const PlanBillingCard = ({ formik }: { formik: CreateOrganizationFormik }) => {
  const [today] = useState(() => new Date());
  const trialError = formik.touched.trialExpiresAt
    ? (formik.errors.trialExpiresAt as string | undefined)
    : undefined;

  return (
    <AppCard>
      <AppCardHeader title="Plan and billing" />
      <AppCardContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <ToggleButtonGroup
            exclusive
            color="primary"
            value={formik.values.planType}
            onChange={(_, value) => value && formik.setFieldValue("planType", value)}
            size="small"
          >
            <ToggleButton value="trial">Trial</ToggleButton>
            <ToggleButton value="paid">Paid</ToggleButton>
          </ToggleButtonGroup>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  select
                  label="Tier"
                  SelectProps={{ displayEmpty: true }}
                  InputLabelProps={{ shrink: true }}
                  {...fieldProps(formik, "tier")}
                >
                  <MenuItem value="">No tier</MenuItem>
                  {tierOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {formik.values.planType === "trial" && (
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    label="Employee limit"
                    placeholder="No limit"
                    inputProps={{ min: 1 }}
                    {...fieldProps(formik, "maxEmployees")}
                  />
                </Grid>
              )}
              {formik.values.planType === "trial" && (
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Trial ends on"
                    minDate={today}
                    value={formik.values.trialExpiresAt}
                    onChange={(value: Date | null) => {
                      if (isPickerDateStillBeingTyped(value)) return;
                      formik.setFieldValue("trialExpiresAt", value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        fullWidth
                        name="trialExpiresAt"
                        onBlur={formik.handleBlur}
                        error={Boolean(trialError)}
                        helperText={trialError}
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Stack>
      </AppCardContent>
    </AppCard>
  );
};

export default PlanBillingCard;
