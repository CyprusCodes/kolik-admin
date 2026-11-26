import { ContentCopy as ContentCopyIcon, Edit as EditIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import RowActionsMenu from "src/components/paginated-table/row-actions-menu";
import type { OrganizationDetail } from "src/types/organization";

interface OrganizationActionsMenuProps {
  organization: OrganizationDetail;
  onChangePlan: () => void;
}

const OrganizationActionsMenu = ({ organization, onChangePlan }: OrganizationActionsMenuProps) => (
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
    ]}
  />
);

export default OrganizationActionsMenu;
