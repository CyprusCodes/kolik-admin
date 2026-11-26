import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@xest-ui/data-table";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/kolik/toaster";
import { SettingsProvider } from "./contexts/settings-context";
import { useSettings } from "./hooks/use-settings";
import { createTheme } from "./theme";
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: false, retry: 1 },
  },
});

const ThemedApp = () => {
  const { paletteMode } = useSettings();
  const theme = useMemo(
    () =>
      createTheme({
        colorPreset: "purple",
        contrast: "normal",
        direction: "ltr",
        paletteMode,
        responsiveFontSizes: true,
      }),
    [paletteMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AppProvider locale="en">
          <RouterProvider router={router} />
        </AppProvider>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
};

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <SettingsProvider>
      <ThemedApp />
    </SettingsProvider>
  </LocalizationProvider>
);

export default App;
