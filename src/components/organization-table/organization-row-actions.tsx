import { ContentCopy as ContentCopyIcon, OpenInNew as OpenInNewIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RowActionsMenu from "src/components/paginated-table/row-actions-menu";
import { paths } from "src/paths";

const OrganizationRowActions = ({ organizationId }: { organizationId: number }) => {
  const navigate = useNavigate();

  return (
    <RowActionsMenu
      items={[
        {
          key: "view",
          label: "View details",
          icon: <OpenInNewIcon fontSize="small" />,
          onClick: () => navigate(paths.organizations.detail(organizationId)),
        },
        {
          key: "copy",
          label: "Copy organization ID",
          icon: <ContentCopyIcon fontSize="small" />,
          onClick: () => {
            navigator.clipboard?.writeText(String(organizationId));
            toast.success(`Copied organization ID ${organizationId}`);
          },
        },
      ]}
    />
  );
};

export default OrganizationRowActions;
