import { createContext } from "react";

export type PaletteMode = "light" | "dark";

export interface Settings {
  paletteMode: PaletteMode;
}

export interface SettingsContextValue extends Settings {
  setPaletteMode: (mode: PaletteMode) => void;
}

export const SettingsContext = createContext<SettingsContextValue>({
  paletteMode: "light",
  setPaletteMode: () => undefined,
});
