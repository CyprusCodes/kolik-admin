import { useTheme } from "@mui/material/styles";
import type { Overview } from "src/types/overview";
import type { DonutSlice } from "./donut-card";
import { useSeriesColors } from "./chart-colors";

const TOP_FEATURES = 5;

const runningTotal = (start: number, values: number[]) => {
  let total = start;
  return values.map((value) => {
    total += value;
    return total;
  });
};

export const useOverviewCharts = (data?: Overview) => {
  const theme = useTheme();
  const colors = useSeriesColors();

  if (!data) return null;

  const dates = data.dailyActivity.map((day) => day.date);
  const newOrganizations = data.dailySignups.map((day) => day.organizations);
  const newEmployees = data.dailySignups.map((day) => day.employees);
  const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
  const used = data.modules.filter((module) => module.count > 0).sort((a, b) => b.count - a.count);
  const rest = sum(used.slice(TOP_FEATURES).map((module) => module.count));

  const featureMix: DonutSlice[] = [
    ...used.slice(0, TOP_FEATURES).map((module, index) => ({
      name: module.label,
      value: module.count,
      color: colors.series[index],
    })),
    ...(rest ? [{ name: "Everything else", value: rest, color: colors.other }] : []),
  ];

  const plans: DonutSlice[] = [
    {
      name: "Paid",
      value: data.totals.paidOrganizations - data.totals.suspendedOrganizations,
      color: theme.palette.primary.main,
    },
    { name: "Trial", value: data.totals.trialOrganizations, color: theme.palette.warning.main },
    { name: "Suspended", value: data.totals.suspendedOrganizations, color: theme.palette.error.main },
  ];

  return {
    dates,
    growth: [
      {
        name: "Organizations",
        data: runningTotal(data.totals.organizations - sum(newOrganizations), newOrganizations),
      },
      { name: "Employees", data: runningTotal(data.totals.employees - sum(newEmployees), newEmployees) },
    ],
    signups: [
      { name: "Employees", data: newEmployees },
      { name: "Organizations", data: newOrganizations },
    ],
    activeUsers: [{ name: "Active users", data: data.dailyActiveUsers.map((day) => day.count) }],
    records: [{ name: "Records created", data: data.dailyActivity.map((day) => day.total) }],
    byFeature: used.slice(0, TOP_FEATURES).map((module) => ({
      name: module.label,
      data: data.dailyActivity.map((day) => day.byModule[module.key] ?? 0),
    })),
    featureMix,
    plans,
  };
};
