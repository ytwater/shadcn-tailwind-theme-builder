"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { HslColor } from "react-colorful";

export const hslStringToHsl = (hslString: string): HslColor => {
  const [h, s, l] = hslString
    .replace("hsl(", "")
    .replace("%", "")
    .replace("%)", "")
    .split(" ")
    .map((v) => parseInt(v));
  return { h, s, l };
};
export const hslToHslString = (hsl: HslColor): string => {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
};

export const removeHslParentheses = (hslString: string): string => {
  return hslString.replace("hsl(", "").replace(")", "");
};

export const addHslParentheses = (hslString: string): string => {
  if (hslString.startsWith("hsl(")) {
    return hslString;
  }
  return `hsl(${hslString})`;
};

export const blackHsl: HslColor = {
  h: 0,
  s: 0,
  l: 0,
};
export const blackHslString = hslToHslString(blackHsl);
export const whiteHsl: HslColor = {
  h: 0,
  s: 0,
  l: 100,
};
export const whiteHslString = hslToHslString(whiteHsl);

export function keys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export type HslThemeAttributes =
  | "background"
  | "foreground"
  | "muted"
  | "mutedForeground"
  | "popover"
  | "popoverForeground"
  | "card"
  | "cardForeground"
  | "border"
  | "input"
  | "primary"
  | "primaryForeground"
  | "secondary"
  | "secondaryForeground"
  | "accent"
  | "accentForeground"
  | "destructive"
  | "destructiveForeground"
  | "ring"
  | "radius";

// export type HslThemeProps = Record<HslThemeAttributes, string>;

export interface HslThemeProps {
  background: string;
  foreground: string;

  muted: string;
  mutedForeground: string;

  popover: string;
  popoverForeground: string;

  card: string;
  cardForeground: string;

  border: string;
  input: string;

  primary: string;
  primaryForeground: string;

  secondary: string;
  secondaryForeground: string;

  accent: string;
  accentForeground: string;

  destructive: string;
  destructiveForeground: string;

  ring: string;

  radius: string;
}

interface HslThemeProviderProps {
  hslTheme: HslThemeProps | null;
  setHslTheme: (theme: HslThemeProps) => void;
}

export const HslThemeContext = createContext<HslThemeProviderProps>({
  hslTheme: null,
  setHslTheme: () => {},
});

export const HSL_THEME_EMPTY = {
  background: "",
  foreground: "",

  muted: "",
  mutedForeground: "",

  popover: "",
  popoverForeground: "",

  card: "",
  cardForeground: "",

  border: "",
  input: "",

  primary: "",
  primaryForeground: "",

  secondary: "",
  secondaryForeground: "",

  accent: "",
  accentForeground: "",

  destructive: "",
  destructiveForeground: "",

  ring: "",

  radius: "",
};

export const useHslTheme = () => useContext(HslThemeContext);

export const HslThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [hslTheme, setHslTheme] = useState<HslThemeProps | null>(null);
  // console.log("🚀 ~ file: HslThemeProvider.tsx:151 ~ HslThemeProvider ~ hslTheme:", hslTheme);

  // useEffect(() => {
  //   const root = document.querySelector(":root");

  // }, []);

  useEffect(() => {
    const root = document.querySelector(":root");
    if (root) {
      if (!hslTheme) {
        const rs = getComputedStyle(root);
        const theme = { ...HSL_THEME_EMPTY };
        for (const key of keys(theme)) {
          const color = rs.getPropertyValue(`--${key}`);
          theme[key] = color;
        }
        console.log("🚀 ~ file: HslThemeProvider.tsx:123 ~ useEffect ~ theme:", theme);
        setHslTheme(theme);
      } else {
        const rs = getComputedStyle(root);
        for (const key of keys(hslTheme)) {
          const color = rs.getPropertyValue(`--${key}`);
          const newColor = hslTheme[key];
          if (color !== newColor) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (root as any).style.setProperty(`--${key}`, newColor);
          }
        }
      }
    }
  }, [hslTheme]);

  return (
    <HslThemeContext.Provider
      value={{
        hslTheme,
        setHslTheme,
      }}
    >
      {children}
    </HslThemeContext.Provider>
  );
};
