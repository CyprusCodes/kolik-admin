import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useId } from "react";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import ChartCard from "./chart-card";
import ChartTooltip from "./chart-tooltip";
import { useChartTheme } from "./use-chart-theme";

export interface LineSeries {
  name: string;
  data: number[];
}

interface LineChartCardProps {
  title: string;
  info?: string;
  dates?: string[];
  series: LineSeries[];
  colors: string[];
  dualAxis?: boolean;
  height?: number;
}

const LineChartCard = ({
  title,
  info,
  dates,
  series,
  colors,
  dualAxis,
  height = 280,
}: LineChartCardProps) => {
  const theme = useTheme();
  const chart = useChartTheme();
  const gradientId = useId().replace(/:/g, "");
  const empty = series.every((line) => line.data.every((value) => value === 0));
  const rows = (dates ?? []).map((date, index) => ({
    date: format(new Date(date), "MMM d"),
    ...Object.fromEntries(series.map((line, seriesIndex) => [`s${seriesIndex}`, line.data[index] ?? 0])),
  }));
  const axisFor = (index: number) => (dualAxis && index === 1 ? "right" : "left");

  return (
    <ChartCard title={title} info={info} height={height} loading={!dates} empty={empty}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={rows} margin={{ top: 8, right: dualAxis ? 0 : 8, left: -16, bottom: 0 }}>
          <defs>
            {colors.map((color, index) => (
              <linearGradient key={color + index} id={`${gradientId}-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={series.length > 1 ? 0.18 : 0.28} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid {...chart.grid} />
          <XAxis dataKey="date" {...chart.axis} minTickGap={24} />
          <YAxis yAxisId="left" {...chart.axis} allowDecimals={false} />
          {dualAxis && <YAxis yAxisId="right" orientation="right" {...chart.axis} allowDecimals={false} />}
          <Tooltip content={<ChartTooltip />} cursor={chart.cursor} />
          {series.length > 1 && <Legend {...chart.legend} />}
          {series.map((line, index) => (
            <Area
              key={line.name}
              yAxisId={axisFor(index)}
              type="monotone"
              dataKey={`s${index}`}
              name={line.name}
              stroke={colors[index]}
              strokeWidth={2}
              strokeLinecap="round"
              fill={`url(#${gradientId}-${index})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: theme.palette.background.paper }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default LineChartCard;
