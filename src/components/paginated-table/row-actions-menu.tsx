import type { FC, MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

export interface RowAction {
  key: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}

interface RowActionsMenuProps {
  items: RowAction[];
}

export const RowActionsMenu: FC<RowActionsMenuProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const close = () => setAnchorEl(null);

  const run = (item: RowAction) => {
    close();
    item.onClick();
  };

  if (!items.length) return null;

  return (
    <>
      <Tooltip title={"More options"}>
        <IconButton onClick={open} aria-label={"More options"} aria-haspopup="menu">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        onClick={(event) => event.stopPropagation()}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { maxHeight: "none", minWidth: 200 } }}
        MenuListProps={{ sx: { maxHeight: "none" } }}
      >
        {items.map((item) => [
          item.danger && <Divider key={`${item.key}-divider`} />,
          <MenuItem
            key={item.key}
            onClick={() => run(item)}
            disabled={item.disabled}
            sx={item.danger ? { color: "error.main" } : undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>,
        ])}
      </Menu>
    </>
  );
};

export default RowActionsMenu;
