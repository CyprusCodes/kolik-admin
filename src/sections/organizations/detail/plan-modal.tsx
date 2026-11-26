import { Button, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppModal } from "src/components/kolik/app-modal";
import { tierOptions } from "src/constants/labels";
import type { OrganizationDetail, PlanType, PlanUpdate } from "src/types/organization";

interface PlanModalProps {
  organization: OrganizationDetail;
  opened: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (values: PlanUpdate) => void;
}

const endOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy.toISOString();
};

const PlanModal = ({ organization, opened, saving, onClose, onSave }: PlanModalProps) => {
  const tiers =
    organization.tier && !tierOptions.some((option) => option.value === organization.tier)
      ? [...tierOptions, { value: organization.tier, label: organization.tier }]
      : tierOptions;

  const formik = useFormik({
    initialValues: {
      planType: organization.planType as PlanType,
      tier: organization.tier ?? "",
      maxEmployees: organization.maxEmployees === null ? "" : String(organization.maxEmployees),
      trialExpiresAt: organization.trialExpiresAt ? new Date(organization.trialExpiresAt) : null,
    },
    validationSchema: Yup.object({
      maxEmployees: Yup.number()
        .transform((value, original) => (original === "" ? undefined : value))
        .min(
          organization.employeeCount,
          `Must be at least ${organization.employeeCount}, their current headcount`,
        ),
      trialExpiresAt: Yup.date()
        .nullable()
        .when("planType", { is: "trial", then: (schema) => schema.required("Pick a trial end date") }),
    }),
    onSubmit: (values) =>
      onSave({
        planType: values.planType,
        tier: values.tier || null,
        maxEmployees: values.maxEmployees === "" ? null : Number(values.maxEmployees),
        trialExpiresAt:
          values.planType === "trial" && values.trialExpiresAt ? endOfDay(values.trialExpiresAt) : null,
      }),
  });

  return (
    <AppModal
      open={opened}
      onClose={onClose}
      title="Change plan"
      actions={
        <>
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => formik.handleSubmit()}
            disabled={saving || !formik.dirty}
          >
            Save plan
          </Button>
        </>
      }
    >
      <Stack spacing={3} sx={{ pt: 1 }}>
        <ToggleButtonGroup
          exclusive
          fullWidth
          color="primary"
          value={formik.values.planType}
          onChange={(_, value) => value && formik.setFieldValue("planType", value)}
        >
          <ToggleButton value="trial">Trial</ToggleButton>
          <ToggleButton value="paid">Paid</ToggleButton>
        </ToggleButtonGroup>
        <TextField variant="outlined" select label="Tier" fullWidth {...formik.getFieldProps("tier")}>
          <MenuItem value="">No tier</MenuItem>
          {tiers.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Employee limit"
          placeholder="No limit"
          type="number"
          fullWidth
          {...formik.getFieldProps("maxEmployees")}
          error={Boolean(formik.touched.maxEmployees && formik.errors.maxEmployees)}
          helperText={formik.touched.maxEmployees && formik.errors.maxEmployees}
        />
        {formik.values.planType === "trial" && (
          <DatePicker
            label="Trial ends on"
            inputFormat="dd/MM/yyyy"
            disablePast
            value={formik.values.trialExpiresAt}
            onChange={(value) => formik.setFieldValue("trialExpiresAt", value)}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
                fullWidth
                error={Boolean(formik.errors.trialExpiresAt)}
                helperText={formik.errors.trialExpiresAt as string | undefined}
              />
            )}
          />
        )}
      </Stack>
    </AppModal>
  );
};

export default PlanModal;
