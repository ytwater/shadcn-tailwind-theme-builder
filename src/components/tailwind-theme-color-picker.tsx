"use client";

import {
  blackHslString,
  hslStringToHsl,
  removeHslParentheses,
  whiteHslString,
} from "@/components/HslThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfigThemeCssVarsKey, useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
// import { SwatchesPicker } from "react-color";
import { HslStringColorPicker } from "react-colorful";
import { useDebounceCallback } from "usehooks-ts";

export const TailwindThemeColorPicker = ({
  variableName,
  hasForeground,
}: {
  variableName: ConfigThemeCssVarsKey;
  hasForeground?: boolean;
}) => {
  const [config, setConfig] = useConfig();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const handleColorChange = (color: string, varName: ConfigThemeCssVarsKey): void => {
    setConfig((oldConfig) => {
      const newConfig = { ...oldConfig };
      const newTheme = isLight ? { ...newConfig.light } : { ...newConfig.dark };
      newTheme[varName] = removeHslParentheses(color);
      if (isLight) {
        newConfig.light = newTheme;
      } else {
        newConfig.dark = newTheme;
      }

      // TODO: If the dark mode version of this color is the default
      // for the theme, calculate a new complementary color for the dark mode

      return newConfig;
    });
  };
  const debouncedHandleColorChange = useDebounceCallback(handleColorChange, 200);

  // if (!hslTheme) {
  //   return null;
  // }

  const hslColor = isLight ? config.light[variableName] : config.dark[variableName];
  const foregroundVariableName = `${variableName}-foreground` as ConfigThemeCssVarsKey;
  const hslColorForeground = hasForeground
    ? isLight
      ? config.light[foregroundVariableName]
      : config.dark[foregroundVariableName]
    : hslStringToHsl(hslColor).l > 50
      ? blackHslString
      : whiteHslString;
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"outline"}
          size="sm"
          className={cn("justify-start", "w-full")}
          style={
            {
              "--theme-primary": `hsl(${hslColor})`,
            } as React.CSSProperties
          }
        >
          <span
            className={cn(
              "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]",
            )}
          ></span>
          {variableName}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Color Picker for {variableName}</DialogTitle>
          <DialogDescription>Select the color for {variableName}.</DialogDescription>
        </DialogHeader>
        <div>
          <div
            className="flex h-[50px] items-center justify-center rounded"
            style={{ background: `hsl(${hslColor})`, color: `hsl(${hslColorForeground})` }}
          >
            {variableName}
          </div>
          <div className="flex flex-row">
            <div className="m-2">
              <h3>{hasForeground ? "Background Color Picker" : "Color Picker"}</h3>
              <HslStringColorPicker
                color={`hsl(${hslColor})`}
                onChange={(color) => debouncedHandleColorChange(color, variableName)}
              />
            </div>
            {hasForeground && (
              <div className="m-2">
                <h3>Foreground Color Picker</h3>
                <HslStringColorPicker
                  color={`hsl(${hslColorForeground})`}
                  onChange={(color) =>
                    debouncedHandleColorChange(
                      color,
                      `${variableName}-foreground` as ConfigThemeCssVarsKey,
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
