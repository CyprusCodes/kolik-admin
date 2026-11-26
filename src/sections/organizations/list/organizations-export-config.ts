import { formatSeats, formatTier } from "src/constants/labels";
import { formatDate } from "src/utils/format";

const headers: Record<string, string> = {
  organization_name: "Organization",
  organization_country: "Country",
  parent_organization_name: "Parent",
  plan_type: "Plan",
  organization_tier_type: "Tier",
  employee_count: "Employees",
  enabled_app_count: "Apps",
  created_at: "Joined",
  last_active_at: "Last active",
};

export const organizationsExportConfig = {
  preSelectedCols: "all" as const,
  cellRenderer: (params: { column: string; value: unknown; record: Record<string, unknown> }) => {
    if (params.column === "organization_tier_type") {
      return { style: { text: formatTier(params.value as string | null) } };
    }
    if (params.column === "created_at" || params.column === "last_active_at") {
      return { style: { text: formatDate(params.value as string) } };
    }
    if (params.column === "employee_count") {
      return {
        style: {
          text: formatSeats(
            Number(params.record.employee_count),
            params.record.max_employees as number | null,
          ),
        },
      };
    }
    return {
      style: { text: params.value === null || params.value === undefined ? "-" : String(params.value) },
    };
  },
  headerStyles: () => ({
    textColor: "#FFFFFF" as const,
    bgColor: "#6941C6" as const,
    fontSize: 14,
    colHeadersMap: headers,
  }),
};
