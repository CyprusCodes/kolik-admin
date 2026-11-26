import { useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import countries from "i18n-iso-countries";
import { geoCentroid } from "d3-geo";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import worldUrl from "world-atlas/countries-110m.json?url";
import type { UserCountry } from "src/types/overview";
import { formatNumber } from "src/utils/format";

interface Hovered {
  name: string;
  users: number;
}

const UsersMap = ({ data }: { data: UserCountry[] }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState<Hovered | null>(null);
  const byNumeric = useMemo(
    () => new Map(data.map((country) => [countries.alpha2ToNumeric(country.code), country])),
    [data],
  );
  const max = Math.max(1, ...data.map((country) => country.users));
  const empty = theme.palette.mode === "dark" ? theme.palette.neutral![800] : theme.palette.neutral![100];

  return (
    <Box sx={{ position: "relative" }}>
      <ComposableMap projection="geoEqualEarth" projectionConfig={{ scale: 160 }} width={800} height={400}>
        <Geographies geography={worldUrl}>
          {({ geographies }) => [
            ...geographies.map((geography) => {
              const country = byNumeric.get(String(geography.id));
              const fill = country
                ? alpha(theme.palette.primary.main, 0.25 + 0.75 * (country.users / max))
                : empty;
              return (
                <Geography
                  key={geography.rsmKey}
                  geography={geography}
                  onMouseEnter={() =>
                    setHovered({
                      name: country?.name ?? geography.properties.name,
                      users: country?.users ?? 0,
                    })
                  }
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    default: {
                      fill,
                      stroke: theme.palette.background.paper,
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: country ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.12),
                      stroke: theme.palette.background.paper,
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    pressed: { fill, outline: "none" },
                  }}
                />
              );
            }),
            ...geographies
              .filter((geography) => byNumeric.has(String(geography.id)))
              .map((geography) => {
                const country = byNumeric.get(String(geography.id))!;
                return (
                  <Marker
                    key={`marker-${geography.rsmKey}`}
                    coordinates={geoCentroid(geography) as [number, number]}
                    onMouseEnter={() => setHovered({ name: country.name, users: country.users })}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <circle
                      r={4 + 10 * Math.sqrt(country.users / max)}
                      fill={alpha(theme.palette.primary.main, 0.85)}
                      stroke={theme.palette.background.paper}
                      strokeWidth={1.5}
                    />
                  </Marker>
                );
              }),
          ]}
        </Geographies>
      </ComposableMap>
      {hovered && (
        <Paper
          elevation={8}
          sx={{ position: "absolute", top: 8, left: 8, px: 1.5, py: 1, pointerEvents: "none" }}
        >
          <Typography variant="subtitle2">{hovered.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {formatNumber(hovered.users)} {hovered.users === 1 ? "user" : "users"}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default UsersMap;
