import {
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
} from "@mui/icons-material";
import { Box, ButtonBase } from "@mui/material";
import { alpha } from "@mui/material/styles";

const options = [
  { dark: false, label: "Light mode", Icon: LightModeOutlinedIcon },
  { dark: true, label: "Dark mode", Icon: DarkModeOutlinedIcon },
];

export const DarkModeSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <Box
    role="radiogroup"
    aria-label="Theme mode"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.25,
      p: 0.25,
      borderRadius: 999,
      backgroundColor: (theme) => alpha(theme.palette.neutral[500], 0.12),
    }}
  >
    {options.map(({ dark, label, Icon }) => {
      const active = checked === dark;
      return (
        <ButtonBase
          key={label}
          role="radio"
          aria-checked={active}
          aria-label={label}
          onClick={active ? undefined : onChange}
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            color: active ? "text.primary" : "text.secondary",
            backgroundColor: active ? "background.paper" : "transparent",
            boxShadow: active ? "0 1px 3px rgba(0, 0, 0, 0.12)" : "none",
            "&:hover": { color: "text.primary" },
          }}
        >
          <Icon sx={{ fontSize: 18 }} />
        </ButtonBase>
      );
    })}
  </Box>
);
