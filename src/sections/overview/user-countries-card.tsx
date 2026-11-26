import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { AppCard, AppCardContent, AppCardHeader } from "src/components/kolik/app-card";
import type { Overview } from "src/types/overview";
import { formatNumber } from "src/utils/format";
import { countryFlag } from "./country-flag";
import UsersMap from "./users-map";

const SHOWN = 8;

const UserCountriesCard = ({ data, days }: { data?: Overview["userCountries"]; days: number }) => {
  const located = data?.countries ?? [];
  const total = located.reduce((sum, country) => sum + country.users, 0);

  return (
    <AppCard>
      <AppCardHeader
        title="Users by country"
        info={`Each user who signed in during the last ${days} days, counted once by the country of their latest sign-in.`}
      />
      <AppCardContent>
        {!data ? (
          <Skeleton variant="rounded" height={360} />
        ) : (
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} lg={8}>
              <UsersMap data={located} />
            </Grid>
            <Grid item xs={12} lg={4}>
              {located.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No sign-ins with a known location in this range.
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {located.slice(0, SHOWN).map((country) => (
                    <Stack key={country.code} direction="row" alignItems="center" spacing={1.5}>
                      <Box component="span" sx={{ fontSize: 20, lineHeight: 1, width: 24 }}>
                        {countryFlag(country.code)}
                      </Box>
                      <Typography variant="body2" sx={{ flexGrow: 1, minWidth: 0 }} noWrap>
                        {country.name}
                      </Typography>
                      <Typography variant="subtitle2">{formatNumber(country.users)}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ width: 40, textAlign: "right" }}
                      >
                        {Math.round((country.users / total) * 100)}%
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              )}
              {data.unknownUsers > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                  {formatNumber(data.unknownUsers)} {data.unknownUsers === 1 ? "user" : "users"} signed in
                  from an unknown location
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </AppCardContent>
    </AppCard>
  );
};

export default UserCountriesCard;
