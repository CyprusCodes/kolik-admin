import type { IntegrationKey } from "src/types/organization";

export const integrationLabels: Record<IntegrationKey, { label: string; description: string }> = {
  email: { label: "Email", description: "Organization SMTP for outgoing mail" },
  sms: { label: "SMS", description: "SMS provider for broadcasts" },
  activeDirectory: {
    label: "Active Directory",
    description: "Directory accounts linked to employees",
  },
};
