import { Button, Stack } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SearchField from "src/components/fields/search-field";
import { PageHeader } from "src/components/kolik/page-header";
import ListCard from "src/components/list/list-card";
import OrganizationsXestTable from "src/components/organization-table/organizations-xest-table";
import { organizationColumns } from "src/components/organization-table/organization-columns";
import { organizationsExportConfig } from "src/sections/organizations/list/organizations-export-config";
import OrganizationsFilters from "src/sections/organizations/list/organizations-filters";
import { useOrganizationFilters } from "src/sections/organizations/list/use-organization-filters";
import { paths } from "src/paths";

const OrganizationsPage = () => {
  const navigate = useNavigate();
  const filters = useOrganizationFilters();

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Organizations"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(paths.organizations.create)}
          >
            New organization
          </Button>
        }
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
          <OrganizationsFilters
            values={filters.values}
            onFilterChange={filters.setFilter}
            hasFilters={filters.hasFilters}
            onClear={filters.clear}
          />
        }
      >
        <OrganizationsXestTable
          tableId="organizations"
          columns={organizationColumns}
          filters={filters.values}
          search={filters.debouncedSearch}
          exportConfig={organizationsExportConfig}
          initialSortCriteria="-organization_headcounts.employee_count"
        />
      </ListCard>
    </Stack>
  );
};

export default OrganizationsPage;
