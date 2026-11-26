import { useTheme } from "@mui/material/styles";

export const useSeriesColors = () => {
  const theme = useTheme();
  return {
    series: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.light,
    ],
    other: theme.palette.mode === "dark" ? theme.palette.neutral![600] : theme.palette.neutral![300],
  };
};
