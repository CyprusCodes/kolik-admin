import { ContentCopy as ContentCopyIcon, OpenInNew as OpenInNewIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RowActionsMenu from "src/components/paginated-table/row-actions-menu";
import { paths } from "src/paths";

const UserRowActions = ({ userId, email }: { userId: number; email: string }) => {
  const navigate = useNavigate();

  return (
    <RowActionsMenu
      items={[
        {
          key: "view",
          label: "View details",
          icon: <OpenInNewIcon fontSize="small" />,
          onClick: () => navigate(paths.users.detail(userId)),
        },
        {
          key: "copy",
          label: "Copy email",
          icon: <ContentCopyIcon fontSize="small" />,
          onClick: () => {
            navigator.clipboard?.writeText(email);
            toast.success(`Copied ${email}`);
          },
        },
      ]}
    />
  );
};

export default UserRowActions;
