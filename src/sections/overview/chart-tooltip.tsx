import { Box, Paper, Stack, Typography } from "@mui/material";
import type { TooltipProps } from "recharts";
import { formatNumber } from "src/utils/format";

const ChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;

  return (
    <Paper elevation={8} sx={{ px: 1.5, py: 1, minWidth: 140 }}>
      {label !== undefined && (
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {label}
        </Typography>
      )}
      <Stack spacing={0.5} sx={{ mt: label !== undefined ? 0.5 : 0 }}>
        {payload.map((entry) => (
          <Stack key={String(entry.dataKey ?? entry.name)} direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: entry.color ?? (entry.payload as { fill?: string })?.fill,
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {entry.name}
            </Typography>
            <Typography variant="subtitle2">{formatNumber(Number(entry.value ?? 0))}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default ChartTooltip;
