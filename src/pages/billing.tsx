import { useMemo } from "react";
import { Stack } from "@mui/material";
import FilterSelect from "src/components/fields/filter-select";
import SearchField from "src/components/fields/search-field";
import { PageHeader } from "src/components/kolik/page-header";
import FilterRow from "src/components/list/filter-row";
import ListCard from "src/components/list/list-card";
import OrganizationsXestTable from "src/components/organization-table/organizations-xest-table";
import { buildBillingColumns } from "src/sections/billing/billing-columns";
import { useBillingToggle } from "src/sections/billing/use-billing-toggle";
import { useToggleListFilters } from "src/sections/billing/use-toggle-list-filters";

const BillingPage = () => {
  const billing = useBillingToggle();
  const { toggle } = billing;
  const columns = useMemo(() => buildBillingColumns(toggle), [toggle]);
  const filters = useToggleListFilters("organizations.billing_enabled");

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Billing"
        info="Turn billing off for an organization to stop charging it. Turning it off needs a reason."
      />
      <ListCard
        search={
          <SearchField
            value={filters.search}
            onChange={filters.setSearch}
            placeholder="Search by organization name"
          />
        }
        filters={
          <FilterRow>
            <FilterSelect
              label="Billing"
              allLabel="On and off"
              value={filters.state}
              onChange={filters.setState}
              data={[
                { value: "1", label: "Billing on" },
                { value: "0", label: "Billing off" },
              ]}
            />
          </FilterRow>
        }
      >
        <OrganizationsXestTable
          tableId="billing"
          columns={columns}
          search={filters.debouncedSearch}
          additionalFilters={filters.filters}
        />
      </ListCard>
      {billing.modal}
    </Stack>
  );
};

export default BillingPage;
