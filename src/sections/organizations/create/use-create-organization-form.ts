import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import postOrganization from "src/services/organizations/postOrganization";
import { paths } from "src/paths";
import { createOrganizationSchema, initialValues } from "./create-organization-schema";
import type { CreateOrganizationValues } from "./create-organization-schema";

const endOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy.toISOString();
};

const toPayload = (values: CreateOrganizationValues) => ({
  organization: {
    organizationName: values.organizationName.trim(),
    country: values.country ?? "",
    businessType: values.businessType.trim(),
    websiteUrl: values.websiteUrl.trim() || null,
    language: values.language,
    parentOrganizationId: values.parentOrganizationId ? Number(values.parentOrganizationId) : null,
    planType: values.planType,
    tier: values.tier || null,
    maxEmployees:
      values.planType === "trial" && values.maxEmployees !== "" ? Number(values.maxEmployees) : null,
    trialExpiresAt:
      values.planType === "trial" && values.trialExpiresAt ? endOfDay(values.trialExpiresAt) : null,
  },
  admin: {
    firstName: values.adminFirstName.trim(),
    lastName: values.adminLastName.trim(),
    email: values.adminEmail.trim(),
    password: values.adminPassword,
    requirePasswordChange: values.requirePasswordChange,
  },
});

export const useCreateOrganizationForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useFormik<CreateOrganizationValues>({
    initialValues,
    validationSchema: createOrganizationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await postOrganization(toPayload(values));
        const created = response.data.organization;
        queryClient.invalidateQueries({ queryKey: ["organizations"] });
        queryClient.invalidateQueries({ queryKey: ["overview"] });
        toast.success(`${created.organizationName} is ready. ${values.adminEmail} can sign in now.`);
        navigate(paths.organizations.detail(created.organizationId));
      } catch (error) {
        const message: string | undefined = isAxiosError(error) ? error.response?.data?.message : undefined;
        if (message?.includes("email")) {
          helpers.setFieldError("adminEmail", message);
        } else if (message?.includes("organization with this name")) {
          helpers.setFieldError("organizationName", message);
        } else {
          toast.error(message ?? "Couldn't create the organization. Try again.");
        }
      }
    },
  });
};

export type CreateOrganizationFormik = ReturnType<typeof useCreateOrganizationForm>;
