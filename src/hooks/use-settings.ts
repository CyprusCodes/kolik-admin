import { useContext } from "react";
import { SettingsContext } from "src/contexts/settings-store";

export const useSettings = () => useContext(SettingsContext);
