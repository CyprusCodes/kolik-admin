import { useMemo, useState } from "react";
import {
  Add as AddIcon,
  CenterFocusStrong as CenterFocusStrongIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import countries from "i18n-iso-countries";
import { geoCentroid } from "d3-geo";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import worldUrl from "world-atlas/countries-110m.json?url";
import type { UserCountry } from "src/types/overview";
import { formatNumber } from "src/utils/format";

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const START = { coordinates: [0, 0] as [number, number], zoom: 1 };

const allowZoomEvent = ((event?: MouseEvent) =>
  Boolean(event) && event!.type !== "wheel" && !event!.ctrlKey && !event!.button) as unknown as (
  element: SVGElement,
) => boolean;

interface Hovered {
  name: string;
  users: number;
}

const UsersMap = ({ data }: { data: UserCountry[] }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState<Hovered | null>(null);
  const [position, setPosition] = useState(START);
  const zoomBy = (factor: number) =>
    setPosition((current) => ({
      ...current,
      zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current.zoom * factor)),
    }));
  const { zoom } = position;
  const byNumeric = useMemo(
    () => new Map(data.map((country) => [countries.alpha2ToNumeric(country.code), country])),
    [data],
  );
  const max = Math.max(1, ...data.map((country) => country.users));
  const empty = theme.palette.mode === "dark" ? theme.palette.neutral![800] : theme.palette.neutral![100];

  return (
    <Box sx={{ position: "relative" }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        width={800}
        height={400}
        style={{ cursor: zoom > MIN_ZOOM ? "grab" : "default" }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          filterZoomEvent={allowZoomEvent}
          onMoveEnd={({ coordinates, zoom: next }: { coordinates: [number, number]; zoom: number }) =>
            setPosition({ coordinates, zoom: next })
          }
        >
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
                        strokeWidth: 0.5 / zoom,
                        outline: "none",
                      },
                      hover: {
                        fill: country ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.12),
                        stroke: theme.palette.background.paper,
                        strokeWidth: 0.5 / zoom,
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
                        r={(4 + 10 * Math.sqrt(country.users / max)) / zoom}
                        fill={alpha(theme.palette.primary.main, 0.85)}
                        stroke={theme.palette.background.paper}
                        strokeWidth={1.5 / zoom}
                        style={{ cursor: "pointer" }}
                      />
                    </Marker>
                  );
                }),
            ]}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Stack spacing={0.75} sx={{ position: "absolute", top: 8, left: 8 }}>
        {[
          {
            label: "Zoom in",
            icon: <AddIcon fontSize="small" />,
            onClick: () => zoomBy(1.6),
            disabled: zoom >= MAX_ZOOM,
          },
          {
            label: "Zoom out",
            icon: <RemoveIcon fontSize="small" />,
            onClick: () => zoomBy(1 / 1.6),
            disabled: zoom <= MIN_ZOOM,
          },
          {
            label: "Reset view",
            icon: <CenterFocusStrongIcon fontSize="small" />,
            onClick: () => setPosition(START),
            disabled: zoom === 1 && position.coordinates[0] === 0 && position.coordinates[1] === 0,
          },
        ].map((button) => (
          <Tooltip key={button.label} title={button.label} placement="right">
            <span>
              <IconButton
                size="small"
                aria-label={button.label}
                onClick={button.onClick}
                disabled={button.disabled}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                {button.icon}
              </IconButton>
            </span>
          </Tooltip>
        ))}
      </Stack>
      {hovered && (
        <Paper
          elevation={8}
          sx={{ position: "absolute", top: 8, right: 8, px: 1.5, py: 1, pointerEvents: "none" }}
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
