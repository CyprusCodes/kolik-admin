import type { Col } from "@xest-ui/data-table";
import type { ExportDataProps } from "@xest-ui/data-table/dist/DataTable/ExportData";
import PlatformXestTable from "src/components/paginated-table/platform-xest-table";
import type { FilterSpec } from "src/components/paginated-table/platform-xest-table";
import getOrganizationsPaginated from "src/services/organizations/getOrganizationsPaginated";
import type { OrganizationRow } from "src/types/organization";
import { buildOrganizationFilters } from "src/sections/organizations/list/build-organization-filter-query";
import type { FilterKey } from "src/sections/organizations/list/use-organization-filters";

interface OrganizationsXestTableProps {
  tableId: string;
  columns: Col<OrganizationRow>[];
  filters?: Record<FilterKey, string | null>;
  search?: string;
  exportConfig?: ExportDataProps<Record<string, unknown>>;
  initialSortCriteria?: string;
  additionalFilters?: FilterSpec[];
}

const noFilters: Record<FilterKey, string | null> = { plan: null, status: null, tier: null };

const OrganizationsXestTable = ({
  tableId,
  columns,
  filters = noFilters,
  search = "",
  exportConfig,
  initialSortCriteria = "organizations.organization_name",
  additionalFilters = [],
}: OrganizationsXestTableProps) => (
  <PlatformXestTable<OrganizationRow>
    tableId={tableId}
    columns={columns}
    fetchPage={getOrganizationsPaginated}
    rowKey={(row) => row.organization_id}
    extraFilters={[...buildOrganizationFilters(filters, search), ...additionalFilters]}
    exportConfig={exportConfig}
    initialSortCriteria={initialSortCriteria}
  />
);

export default OrganizationsXestTable;
