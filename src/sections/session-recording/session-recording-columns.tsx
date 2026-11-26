import type { Col } from "@xest-ui/data-table";
import AsyncSwitch from "src/components/async-switch";
import {
  actionsColumn,
  nameColumn,
  parentColumn,
  planColumn,
} from "src/components/organization-table/organization-columns";
import type { OrganizationRow } from "src/types/organization";

const recordingOptions = [
  { label: "On", value: 1 },
  { label: "Off", value: 0 },
];

export const buildSessionRecordingColumns = (
  toggle: (target: { id: number; name: string }, enabled: boolean) => Promise<boolean>,
): Col<OrganizationRow>[] => [
  nameColumn,
  { ...parentColumn, hidden: false },
  planColumn,
  {
    title: "Session recording",
    dataIndex: "session_recording",
    filterType: {
      dbCol: "organization_session_recording.session_recording",
      type: "options",
      options: recordingOptions,
    },
    render: (row) => (
      <AsyncSwitch
        key={`${row.organization_id}-${row.session_recording}`}
        checked={Boolean(row.session_recording)}
        aria-label={`Session recording for ${row.organization_name}`}
        onToggle={(enabled) => toggle({ id: row.organization_id, name: row.organization_name }, enabled)}
      />
    ),
  },
  actionsColumn,
];
