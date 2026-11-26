import { useState } from "react";
import { Box, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PageHeader } from "src/components/kolik/page-header";
import AttentionCard from "src/sections/overview/attention-card";
import DonutCard from "src/sections/overview/donut-card";
import LineChartCard from "src/sections/overview/line-chart-card";
import StatCards from "src/sections/overview/stat-cards";
import UserCountriesCard from "src/sections/overview/user-countries-card";
import { useSeriesColors } from "src/sections/overview/chart-colors";
import { useOverview } from "src/sections/overview/use-overview";
import { useOverviewCharts } from "src/sections/overview/use-overview-charts";

const RANGES = [
  { value: 7, label: "Last 7 days" },
  { value: 30, label: "Last 30 days" },
  { value: 90, label: "Last 90 days" },
];

const OverviewPage = () => {
  const theme = useTheme();
  const colors = useSeriesColors();
  const [days, setDays] = useState(30);
  const { data } = useOverview(days);
  const charts = useOverviewCharts(data);
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Overview"
        info="Organizations, people and activity across Kolik."
        actions={
          <TextField
            variant="outlined"
            select
            size="small"
            label="Range"
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            sx={{ minWidth: 160 }}
          >
            {RANGES.map((range) => (
              <MenuItem key={range.value} value={range.value}>
                {range.label}
              </MenuItem>
            ))}
          </TextField>
        }
      />
      <StatCards totals={data?.totals} days={days} />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <LineChartCard
              title="Platform growth"
              info="Total organizations and employees on Kolik at the end of each day"
              dates={charts?.dates}
              series={charts?.growth ?? []}
              colors={[success, primary]}
              height={300}
              dualAxis
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <AttentionCard attention={data?.attention} />
          </Grid>
          <Grid item xs={12}>
            <UserCountriesCard data={data?.userCountries} days={days} />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineChartCard
              title="Daily active users"
              info="People who signed in or used Kolik each day"
              dates={charts?.dates}
              series={charts?.activeUsers ?? []}
              colors={[primary]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineChartCard
              title="Records created"
              info="Everything created across all features each day"
              dates={charts?.dates}
              series={charts?.records ?? []}
              colors={[theme.palette.info.main]}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <LineChartCard
              title="Activity by feature"
              info="Records created each day in the five busiest features"
              dates={charts?.dates}
              series={charts?.byFeature ?? []}
              colors={colors.series}
              height={300}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DonutCard
              title="Activity mix"
              info={`Share of records created in the last ${days} days`}
              slices={charts?.featureMix}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <LineChartCard
              title="New organizations and employees"
              info="Added each day"
              dates={charts?.dates}
              series={charts?.signups ?? []}
              colors={[primary, success]}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DonutCard title="Plans" info="Organizations by plan right now" slices={charts?.plans} />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineChartCard
              title="Most used apps"
              info="Organizations with each of the top apps turned on, day by day"
              dates={charts?.dates}
              series={data?.trends.apps ?? []}
              colors={colors.series}
              height={260}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineChartCard
              title="Feature adoption"
              info="Organizations using each of the top features, day by day"
              dates={charts?.dates}
              series={data?.trends.features ?? []}
              colors={colors.series}
              height={260}
            />
          </Grid>
          <Grid item xs={12}>
            <LineChartCard
              title="Most active organizations"
              info="Records created each day by the most active organizations"
              dates={charts?.dates}
              series={data?.trends.organizations ?? []}
              colors={colors.series}
              height={300}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default OverviewPage;
