import { useMemo } from "react";
import { Stack } from "@mui/material";
import FilterSelect from "src/components/fields/filter-select";
import SearchField from "src/components/fields/search-field";
import { PageHeader } from "src/components/kolik/page-header";
import FilterRow from "src/components/list/filter-row";
import ListCard from "src/components/list/list-card";
import OrganizationsXestTable from "src/components/organization-table/organizations-xest-table";
import { useToggleListFilters } from "src/sections/billing/use-toggle-list-filters";
import { buildSessionRecordingColumns } from "src/sections/session-recording/session-recording-columns";
import { useSessionRecordingToggle } from "src/sections/session-recording/use-session-recording-toggle";

const SessionRecordingPage = () => {
  const toggle = useSessionRecordingToggle();
  const columns = useMemo(() => buildSessionRecordingColumns(toggle), [toggle]);
  const filters = useToggleListFilters("organization_session_recording.session_recording");

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Session recording"
        info="Choose which organizations OpenReplay records sessions for."
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
              label="Recording"
              allLabel="On and off"
              value={filters.state}
              onChange={filters.setState}
              data={[
                { value: "1", label: "Recording on" },
                { value: "0", label: "Recording off" },
              ]}
            />
          </FilterRow>
        }
      >
        <OrganizationsXestTable
          tableId="session-recording"
          columns={columns}
          search={filters.debouncedSearch}
          additionalFilters={filters.filters}
        />
      </ListCard>
    </Stack>
  );
};

export default SessionRecordingPage;
