import { ContentCopy as ContentCopyIcon, Key as KeyIcon } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { AppCard, AppCardContent, AppCardHeader } from "src/components/kolik/app-card";
import { PasswordField } from "src/components/mui/password-field";
import { fieldProps } from "./field-props";
import type { CreateOrganizationFormik } from "./use-create-organization-form";

const generatePassword = () => {
  const letters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const all = `${letters}${digits}!@#$%`;
  const random = (pool: string) => pool[crypto.getRandomValues(new Uint32Array(1))[0] % pool.length];
  const chars = [random(letters), random(digits), ...Array.from({ length: 12 }, () => random(all))];
  return chars.sort(() => crypto.getRandomValues(new Uint8Array(1))[0] - 128).join("");
};

const CompanyAdminCard = ({ formik }: { formik: CreateOrganizationFormik }) => {
  const { adminEmail, adminPassword } = formik.values;

  const generate = () => {
    const password = generatePassword();
    formik.setFieldValue("adminPassword", password);
    formik.setFieldValue("adminPasswordConfirm", password);
  };

  const copy = () => {
    navigator.clipboard?.writeText(`Email: ${adminEmail}\nPassword: ${adminPassword}`);
    toast.success("Email and password copied");
  };

  return (
    <AppCard sx={{ height: "100%" }}>
      <AppCardHeader
        title="Company admin"
        info="This person can sign in and manage the new organization straight away."
        action={
          <Tooltip title="Copy email and password">
            <span>
              <IconButton
                onClick={copy}
                disabled={!adminEmail || !adminPassword}
                aria-label="Copy email and password"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        }
      />
      <AppCardContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              required
              label="First name"
              {...fieldProps(formik, "adminFirstName")}
            />
            <TextField
              variant="outlined"
              fullWidth
              required
              label="Last name"
              {...fieldProps(formik, "adminLastName")}
            />
          </Stack>
          <TextField
            variant="outlined"
            fullWidth
            required
            type="email"
            label="Email"
            {...fieldProps(formik, "adminEmail")}
          />
          <PasswordField
            variant="outlined"
            fullWidth
            required
            label="Password"
            {...fieldProps(formik, "adminPassword")}
          />
          <PasswordField
            variant="outlined"
            fullWidth
            required
            label="Confirm password"
            {...fieldProps(formik, "adminPasswordConfirm")}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="requirePasswordChange"
                checked={formik.values.requirePasswordChange}
                onChange={formik.handleChange}
              />
            }
            label="Ask them to set a new password when they first sign in"
          />
          <div>
            <Button variant="outlined" startIcon={<KeyIcon />} onClick={generate}>
              Generate password
            </Button>
          </div>
        </Stack>
      </AppCardContent>
    </AppCard>
  );
};

export default CompanyAdminCard;
