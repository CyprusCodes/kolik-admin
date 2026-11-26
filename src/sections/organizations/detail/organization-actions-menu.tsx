import {
  ContentCopy as ContentCopyIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import RowActionsMenu from "src/components/paginated-table/row-actions-menu";
import type { OrganizationDetail } from "src/types/organization";

interface OrganizationActionsMenuProps {
  organization: OrganizationDetail;
  onChangePlan: () => void;
  onSuspend: () => void;
  onReactivate: () => void;
}

const OrganizationActionsMenu = ({
  organization,
  onChangePlan,
  onSuspend,
  onReactivate,
}: OrganizationActionsMenuProps) => (
  <RowActionsMenu
    items={[
      { key: "plan", label: "Change plan", icon: <EditIcon fontSize="small" />, onClick: onChangePlan },
      {
        key: "copy",
        label: "Copy organization ID",
        icon: <ContentCopyIcon fontSize="small" />,
        onClick: () => {
          navigator.clipboard?.writeText(String(organization.organizationId));
          toast.success(`Copied organization ID ${organization.organizationId}`);
        },
      },
      organization.status === "active"
        ? {
            key: "suspend",
            label: "Suspend organization",
            icon: <BlockIcon fontSize="small" />,
            onClick: onSuspend,
            danger: true,
          }
        : {
            key: "reactivate",
            label: "Reactivate organization",
            icon: <PlayArrowIcon fontSize="small" />,
            onClick: onReactivate,
          },
    ]}
  />
);

export default OrganizationActionsMenu;
