import type { Direction, PaletteMode, Theme } from "@mui/material";
import { createTheme as createMuiTheme, responsiveFontSizes } from "@mui/material/styles";
import { createOptions as createBaseOptions } from "./base/create-options";
import { createOptions as createDarkOptions } from "./dark/create-options";
import { createOptions as createLightOptions } from "./light/create-options";

declare module "@mui/material/styles" {
  export interface NeutralColors {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface Palette {
    neutral: NeutralColors;
  }

  interface PaletteOptions {
    neutral?: NeutralColors;
  }

  interface PaletteColor {
    lightest?: string;
    darkest?: string;
    alpha4?: string;
    alpha8?: string;
    alpha12?: string;
    alpha30?: string;
    alpha50?: string;
  }

  interface TypeBackground {
    paper: string;
    default: string;
  }
}

export type ColorPreset = "blue" | "green" | "indigo" | "purple" | "coffee";

export type Contrast = "normal" | "high";

interface ThemeConfig {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
  direction?: Direction;
  paletteMode?: PaletteMode;
  responsiveFontSizes?: boolean;
}

export const createTheme = (config: ThemeConfig): Theme => {
  let theme = createMuiTheme(
    createBaseOptions({
      direction: config.direction,
    }),
    config.paletteMode === "dark"
      ? createDarkOptions({
          colorPreset: config.colorPreset,
          contrast: config.contrast,
        })
      : createLightOptions({
          colorPreset: config.colorPreset,
          contrast: config.contrast,
        }),
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
