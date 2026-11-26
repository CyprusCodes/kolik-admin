import type { SyntheticEvent } from "react";
import { Box, Divider, Tab, Tabs, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export interface NavEntry {
  value: string;
  label: string;
}

interface VerticalNavProps {
  items: NavEntry[];
  value: string;
  onChange: (value: string) => void;
}

export const useDetailNavLayout = () => useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

export const HorizontalDetailNav = ({ items, value, onChange }: VerticalNavProps) => (
  <div>
    <Tabs
      indicatorColor="primary"
      onChange={(_: SyntheticEvent, next: string) => onChange(next)}
      scrollButtons="auto"
      textColor="primary"
      value={value}
      variant="scrollable"
    >
      {items.map((item) => (
        <Tab key={item.value} label={item.label} value={item.value} />
      ))}
    </Tabs>
    <Divider />
  </div>
);

const VerticalNav = ({ items, value, onChange }: VerticalNavProps) => (
  <Box sx={{ width: 220, flexShrink: 0, position: "sticky", top: 88 }}>
    <Tabs
      orientation="vertical"
      onChange={(_: SyntheticEvent, next: string) => onChange(next)}
      value={value}
      sx={{
        "& .MuiTabs-indicator": { display: "none" },
        "& .MuiTabs-flexContainer": { gap: 0.5 },
      }}
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          label={item.label}
          value={item.value}
          sx={{
            alignItems: "flex-start",
            justifyContent: "center",
            minHeight: 40,
            px: 1.5,
            py: 1,
            m: 0,
            borderRadius: "8px",
            color: "text.secondary",
            fontWeight: 500,
            textAlign: "left",
            "&:hover": { bgcolor: "action.hover", color: "text.primary" },
            "&.Mui-selected, &.Mui-selected:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              color: "primary.dark",
              fontWeight: 600,
            },
            "& + &": { ml: 0 },
          }}
        />
      ))}
    </Tabs>
  </Box>
);

export default VerticalNav;
