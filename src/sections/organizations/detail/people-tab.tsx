import { useState } from "react";
import FilterSelect from "src/components/fields/filter-select";
import SearchField from "src/components/fields/search-field";
import ListCard from "src/components/list/list-card";
import FilterRow from "src/components/list/filter-row";
import PlatformXestTable from "src/components/paginated-table/platform-xest-table";
import type { FilterSpec } from "src/components/paginated-table/platform-xest-table";
import { useDebouncedValue } from "src/hooks/use-debounced-value";
import getOrganizationEmployeesPaginated from "src/services/organizations/getOrganizationEmployeesPaginated";
import type { OrganizationEmployeeRow } from "src/types/organization";
import { employeeColumns } from "./people/employee-columns";

const PeopleTab = ({ organizationId }: { organizationId: number }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const filters: FilterSpec[] = [
    ...(status ? [{ column: "employees.status", operation: "employeeStatus", value: status }] : []),
    ...(debouncedSearch.trim()
      ? [
          {
            column: "employees.search",
            operation: "searchEmployees",
            value: debouncedSearch.trim(),
          },
        ]
      : []),
  ];

  return (
    <ListCard
      search={<SearchField value={search} onChange={setSearch} placeholder="Search by name or email" />}
      filters={
        <FilterRow
          hasFilters={Boolean(search || status)}
          onClear={() => {
            setSearch("");
            setStatus(null);
          }}
        >
          <FilterSelect
            label="Status"
            allLabel="All statuses"
            value={status}
            onChange={setStatus}
            data={[
              { value: "enabled", label: "Enabled" },
              { value: "disabled", label: "Disabled" },
            ]}
          />
        </FilterRow>
      }
    >
      <PlatformXestTable<OrganizationEmployeeRow>
        tableId={`organization-employees-${organizationId}`}
        columns={employeeColumns}
        fetchPage={(query) => getOrganizationEmployeesPaginated(organizationId, query)}
        rowKey={(row) => row.id}
        extraFilters={filters}
        initialSortCriteria="users.first_name"
      />
    </ListCard>
  );
};

export default PeopleTab;
