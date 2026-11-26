import * as yup from "yup";
import type { PlanType } from "src/types/organization";

export interface CreateOrganizationValues {
  organizationName: string;
  country: string | null;
  businessType: string;
  websiteUrl: string;
  language: "en" | "tr";
  parentOrganizationId: string;
  planType: PlanType;
  tier: string;
  maxEmployees: string;
  trialExpiresAt: Date | null;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  adminPasswordConfirm: string;
  requirePasswordChange: boolean;
}

const inDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const initialValues: CreateOrganizationValues = {
  organizationName: "",
  country: null,
  businessType: "",
  websiteUrl: "",
  language: "en",
  parentOrganizationId: "",
  planType: "trial",
  tier: "Starter Package",
  maxEmployees: "25",
  trialExpiresAt: inDays(14),
  adminFirstName: "",
  adminLastName: "",
  adminEmail: "",
  adminPassword: "",
  adminPasswordConfirm: "",
  requirePasswordChange: true,
};

export const createOrganizationSchema = yup.object({
  organizationName: yup.string().trim().required("Organization name is required"),
  country: yup.string().nullable().required("Country is required"),
  websiteUrl: yup
    .string()
    .trim()
    .matches(/^https?:\/\/\S+\.\S+/, {
      message: "Enter a full address, e.g. https://example.com",
      excludeEmptyString: true,
    }),
  maxEmployees: yup.string().test("min", "Must be at least 1", (value) => !value || Number(value) >= 1),
  trialExpiresAt: yup
    .date()
    .nullable()
    .when("planType", {
      is: "trial",
      then: (schema) => schema.required("Pick a trial end date").typeError("Pick a trial end date"),
    }),
  adminFirstName: yup.string().trim().required("First name is required"),
  adminLastName: yup.string().trim().required("Last name is required"),
  adminEmail: yup.string().trim().email("Enter a valid email").required("Enter a valid email"),
  adminPassword: yup
    .string()
    .required("At least 8 characters with a letter and a number")
    .min(8, "At least 8 characters with a letter and a number")
    .matches(/[a-zA-Z]/, "At least 8 characters with a letter and a number")
    .matches(/\d/, "At least 8 characters with a letter and a number"),
  adminPasswordConfirm: yup
    .string()
    .oneOf([yup.ref("adminPassword")], "Passwords don't match")
    .required("Passwords don't match"),
});
