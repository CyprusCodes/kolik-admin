import { Box, Stack, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatNumber } from "src/utils/format";
import ChartCard from "./chart-card";
import ChartTooltip from "./chart-tooltip";

export interface DonutSlice {
  name: string;
  value: number;
  color: string;
}

const DonutCard = ({ title, info, slices }: { title: string; info?: string; slices?: DonutSlice[] }) => {
  const shown = (slices ?? []).filter((slice) => slice.value > 0);
  const total = shown.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <ChartCard title={title} info={info} height={260} loading={!slices} empty={total === 0}>
      <Box sx={{ position: "relative" }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={shown}
              dataKey="value"
              nameKey="name"
              innerRadius="68%"
              outerRadius="95%"
              paddingAngle={shown.length > 1 ? 2 : 0}
              stroke="none"
              isAnimationActive
            >
              {shown.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {formatNumber(total)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total
          </Typography>
        </Box>
      </Box>
      <Stack spacing={1} sx={{ mt: 2 }}>
        {shown.map((slice) => (
          <Stack key={slice.name} direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: slice.color, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ flexGrow: 1 }} noWrap>
              {slice.name}
            </Typography>
            <Typography variant="subtitle2">{formatNumber(slice.value)}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ width: 36, textAlign: "right" }}>
              {Math.round((slice.value / total) * 100)}%
            </Typography>
          </Stack>
        ))}
      </Stack>
    </ChartCard>
  );
};

export default DonutCard;
