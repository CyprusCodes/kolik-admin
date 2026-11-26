import { useTheme } from "@mui/material/styles";

export const useChartTheme = () => {
  const theme = useTheme();
  const tick = { fill: theme.palette.text.secondary, fontSize: 12 };

  return {
    grid: { stroke: theme.palette.divider, strokeDasharray: "3 3", vertical: false },
    axis: { tick, tickLine: false, axisLine: false },
    cursor: { stroke: theme.palette.divider },
    barCursor: { fill: theme.palette.action.hover },
    legend: {
      wrapperStyle: { fontSize: 12, color: theme.palette.text.secondary, paddingTop: 8 },
      iconType: "circle" as const,
      iconSize: 8,
    },
  };
};
