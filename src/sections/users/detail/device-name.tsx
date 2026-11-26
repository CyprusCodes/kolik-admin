import {
  Computer as ComputerIcon,
  DevicesOther as DevicesOtherIcon,
  PhoneIphone as PhoneIphoneIcon,
  TabletMac as TabletMacIcon,
} from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { DeviceType } from "src/types/user";

const ICONS: Record<DeviceType, typeof ComputerIcon> = {
  phone: PhoneIphoneIcon,
  tablet: TabletMacIcon,
  desktop: ComputerIcon,
  unknown: DevicesOtherIcon,
};

const DeviceName = ({
  device,
  deviceType,
  userAgent,
}: {
  device: string;
  deviceType: DeviceType;
  userAgent: string | null;
}) => {
  const Icon = ICONS[deviceType] ?? DevicesOtherIcon;

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        }}
      >
        <Icon fontSize="small" />
      </Box>
      <Tooltip title={userAgent ?? ""} placement="top-start">
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          {device}
        </Typography>
      </Tooltip>
    </Stack>
  );
};

export default DeviceName;
