import FilterSelect from "src/components/fields/filter-select";
import FilterRow from "src/components/list/filter-row";
import type { useUserFilters } from "./use-user-filters";

const UsersFilters = ({ filters }: { filters: ReturnType<typeof useUserFilters> }) => (
  <FilterRow hasFilters={filters.hasFilters} onClear={filters.clear}>
    <FilterSelect
      label="Status"
      allLabel="All statuses"
      value={filters.status}
      onChange={filters.setStatus}
      data={[
        { value: "enabled", label: "Enabled" },
        { value: "disabled", label: "Disabled" },
      ]}
    />
    <FilterSelect
      label="Role"
      allLabel="Everyone"
      value={filters.superAdmin}
      onChange={filters.setSuperAdmin}
      data={[
        { value: "1", label: "Super admins" },
        { value: "0", label: "Everyone else" },
      ]}
    />
  </FilterRow>
);

export default UsersFilters;
