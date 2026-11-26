import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";

export const useNavCssVars = (): Record<string, string> => {
  const theme = useTheme();

  return useMemo(
    () => ({
      "--nav-bg": theme.palette.neutral[800],
      "--nav-color": theme.palette.common.white,
      "--nav-border-color": "transparent",
      "--nav-logo-border": theme.palette.neutral[700],
      "--nav-section-title-color": theme.palette.neutral[400],
      "--nav-item-color": theme.palette.neutral[400],
      "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
      "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
      "--nav-item-active-color": theme.palette.common.white,
      "--nav-item-disabled-color": theme.palette.neutral[500],
      "--nav-item-icon-color": theme.palette.neutral[400],
      "--nav-item-icon-active-color": theme.palette.primary.main,
      "--nav-item-icon-disabled-color": theme.palette.neutral[500],
      "--nav-item-chevron-color": theme.palette.neutral[600],
      "--nav-scrollbar-color": theme.palette.neutral[400],
    }),
    [theme],
  );
};
