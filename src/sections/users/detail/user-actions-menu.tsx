import {
  Block as BlockIcon,
  Email as EmailIcon,
  Logout as LogoutIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import RowActionsMenu from "src/components/paginated-table/row-actions-menu";
import type { PlatformUser } from "src/types/user";

interface UserActionsMenuProps {
  user: PlatformUser;
  isSelf: boolean;
  onPasswordReset: () => void;
  onToggleStatus: () => void;
  onSignOutEverywhere: () => void;
}

const UserActionsMenu = ({
  user,
  isSelf,
  onPasswordReset,
  onToggleStatus,
  onSignOutEverywhere,
}: UserActionsMenuProps) => {
  const enabled = user.userStatus === "enabled";

  return (
    <RowActionsMenu
      items={[
        {
          key: "reset",
          label: "Send password reset",
          icon: <EmailIcon fontSize="small" />,
          onClick: onPasswordReset,
        },
        {
          key: "sign-out",
          label: "Sign out everywhere",
          icon: <LogoutIcon fontSize="small" />,
          onClick: onSignOutEverywhere,
          disabled: isSelf,
        },
        {
          key: "status",
          label: enabled ? "Disable user" : "Enable user",
          icon: enabled ? <BlockIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />,
          onClick: onToggleStatus,
          disabled: isSelf,
          danger: enabled,
        },
      ]}
    />
  );
};

export default UserActionsMenu;
