import { useMemo } from "react";
import { Stack } from "@mui/material";
import FilterSelect from "src/components/fields/filter-select";
import SearchField from "src/components/fields/search-field";
import { PageHeader } from "src/components/kolik/page-header";
import FilterRow from "src/components/list/filter-row";
import ListCard from "src/components/list/list-card";
import OrganizationsXestTable from "src/components/organization-table/organizations-xest-table";
import { buildBillingColumns } from "src/sections/billing/billing-columns";
import { useMakePaid } from "src/sections/billing/use-make-paid";
import { useToggleListFilters } from "src/sections/billing/use-toggle-list-filters";

const BillingPage = () => {
  const makePaid = useMakePaid();
  const { open } = makePaid;
  const columns = useMemo(() => buildBillingColumns(open), [open]);
  const filters = useToggleListFilters("organizations.plan_type");

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Billing"
        info="Paid organizations have no employee limit and no trial end date. Make a trial organization paid once they start paying."
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
              label="Plan"
              allLabel="All plans"
              value={filters.state}
              onChange={filters.setState}
              data={[
                { value: "paid", label: "Paid" },
                { value: "trial", label: "Trial" },
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
          refreshKey={makePaid.refreshKey}
          initialSortCriteria="organizations.trial_expires_at"
        />
      </ListCard>
      {makePaid.modal}
    </Stack>
  );
};

export default BillingPage;
