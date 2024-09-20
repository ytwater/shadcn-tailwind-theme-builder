import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { BaseColor, baseColors } from "@/registry/registry-base-colors";
import { Style } from "@/registry/registry-styles";

export interface ConfigThemeCssVars {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
}

export type ConfigThemeCssVarsKey = keyof ConfigThemeCssVars;

export type ConfigThemeProps = BaseColor["cssVars"]["light"];

export type Config = {
  style: Style["name"];
  theme: BaseColor["name"];
  light: ConfigThemeCssVars;
  dark: ConfigThemeCssVars;
  radius: number;
};

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  theme: "zinc",
  light: baseColors.find((color) => color.name === "zinc")!.cssVars.light,
  dark: baseColors.find((color) => color.name === "zinc")!.cssVars.dark,
  radius: 0.5,
});

export function useConfig() {
  return useAtom(configAtom);
}
