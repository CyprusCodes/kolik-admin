import { Stack } from "@mui/material";
import SearchField from "src/components/fields/search-field";
import { PageHeader } from "src/components/kolik/page-header";
import ListCard from "src/components/list/list-card";
import PlatformXestTable from "src/components/paginated-table/platform-xest-table";
import getPlatformUsersPaginated from "src/services/platformUsers/getPlatformUsersPaginated";
import { userColumns } from "src/sections/users/list/user-columns";
import UsersFilters from "src/sections/users/list/users-filters";
import { useUserFilters } from "src/sections/users/list/use-user-filters";
import type { PlatformUserRow } from "src/types/user";

const UsersPage = () => {
  const filters = useUserFilters();

  return (
    <Stack spacing={3}>
      <PageHeader title="Users" />
      <ListCard
        search={
          <SearchField
            value={filters.search}
            onChange={filters.setSearch}
            placeholder="Search by name or email"
          />
        }
        filters={<UsersFilters filters={filters} />}
      >
        <PlatformXestTable<PlatformUserRow>
          tableId="users"
          columns={userColumns}
          fetchPage={getPlatformUsersPaginated}
          rowKey={(row) => row.user_id}
          extraFilters={filters.filters}
          initialSortCriteria="-users.created_at"
        />
      </ListCard>
    </Stack>
  );
};

export default UsersPage;
