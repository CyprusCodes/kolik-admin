import { Logout as LogoutIcon } from "@mui/icons-material";
import { useState } from "react";
import type { MouseEvent } from "react";
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Authentication from "src/services/authentication";
import { paths } from "src/paths";

const initials = (first = "", last = "") => `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

export const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const auth = new Authentication();
  const user = auth.getAccessTokenPayload();

  const logout = () => {
    auth.logout();
    navigate(paths.login);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
        aria-label="Account"
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "divider",
          height: 40,
          width: 40,
          borderRadius: "50%",
        }}
      >
        <Avatar sx={{ height: 32, width: 32, fontSize: 12 }}>
          {initials(user?.firstName, user?.lastName)}
        </Avatar>
      </Box>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        disableScrollLock
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        PaperProps={{ sx: { width: 220 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">
            {[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Super admin"}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <MenuItem onClick={logout} sx={{ borderRadius: 1 }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Log out</Typography>} />
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};
