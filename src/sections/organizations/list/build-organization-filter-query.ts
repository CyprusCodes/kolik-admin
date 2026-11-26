import type { FilterSpec } from "src/components/paginated-table/platform-xest-table";
import type { FilterKey } from "./use-organization-filters";

const dbColumns: Record<FilterKey, string> = {
  plan: "organizations.plan_type",
  status: "organization_statuses.status",
  tier: "organizations.organization_tier_type",
};

export const buildOrganizationFilters = (
  values: Record<FilterKey, string | null>,
  search: string,
): FilterSpec[] => {
  const filters: FilterSpec[] = [];
  (Object.keys(dbColumns) as FilterKey[]).forEach((key) => {
    const value = values[key];
    if (value) {
      filters.push({ column: dbColumns[key], operation: "equals", value });
    }
  });
  if (search.trim()) {
    filters.push({
      column: "organizations.organization_name",
      operation: "containsIgnoreCase",
      value: search.trim(),
    });
  }
  return filters;
};
