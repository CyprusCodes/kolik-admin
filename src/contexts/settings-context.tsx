import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { SettingsContext } from "./settings-store";
import type { PaletteMode, Settings } from "./settings-store";

const STORAGE_KEY = "kolik-admin-settings";

const readSettings = (): Settings => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (stored && (stored.paletteMode === "light" || stored.paletteMode === "dark")) {
      return { paletteMode: stored.paletteMode };
    }
  } catch {
    return { paletteMode: "light" };
  }
  return { paletteMode: "light" };
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(readSettings);

  const setPaletteMode = useCallback((paletteMode: PaletteMode) => {
    setSettings({ paletteMode });
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ paletteMode }));
    } catch {
      return;
    }
  }, []);

  const value = useMemo(() => ({ ...settings, setPaletteMode }), [settings, setPaletteMode]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
