import FilterSelect from "src/components/fields/filter-select";
import FilterRow from "src/components/list/filter-row";
import { tierOptions } from "src/constants/labels";
import type { FilterKey } from "./use-organization-filters";

interface OrganizationsFiltersProps {
  values: Record<FilterKey, string | null>;
  onFilterChange: (key: FilterKey, value: string | null) => void;
  hasFilters: boolean;
  onClear: () => void;
}

const OrganizationsFilters = ({ values, onFilterChange, hasFilters, onClear }: OrganizationsFiltersProps) => (
  <FilterRow hasFilters={hasFilters} onClear={onClear}>
    <FilterSelect
      label="Plan"
      allLabel="All plans"
      value={values.plan}
      onChange={(value) => onFilterChange("plan", value)}
      data={[
        { value: "paid", label: "Paid" },
        { value: "trial", label: "Trial" },
      ]}
    />
    <FilterSelect
      label="Tier"
      allLabel="All tiers"
      value={values.tier}
      onChange={(value) => onFilterChange("tier", value)}
      data={tierOptions}
    />
  </FilterRow>
);

export default OrganizationsFilters;
