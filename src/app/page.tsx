import CardsPage from "@/components/card-page";
import { HslThemeProvider } from "@/components/HslThemeProvider";
import { TailwindRadiusPicker } from "@/components/tailwind-radius-picker";
import { TailwindThemeColorPicker } from "@/components/tailwind-theme-color-picker";
import { ThemeSelector } from "@/components/theme-selector";

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen">
      <HslThemeProvider>
        <ThemeSelector />

        <div className="grid grid-cols-2">
          <TailwindThemeColorPicker variableName="background" />
          <TailwindThemeColorPicker variableName="foreground" />
          <TailwindThemeColorPicker variableName="primary" />
          <TailwindThemeColorPicker variableName="secondary" />
          <TailwindThemeColorPicker variableName="muted" hasForeground />
          <TailwindThemeColorPicker variableName="popover" hasForeground />
          <TailwindThemeColorPicker variableName="card" hasForeground />
          <TailwindThemeColorPicker variableName="destructive" hasForeground />
          <TailwindThemeColorPicker variableName="accent" hasForeground />
          <TailwindThemeColorPicker variableName="ring" />
          <TailwindRadiusPicker />
        </div>
        <CardsPage />
      </HslThemeProvider>
    </div>
  );
}
