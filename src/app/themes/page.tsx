import { Metadata } from "next";

import { ThemeCustomizer } from "@/components/theme-customizer";
import { ThemeWrapper } from "@/components/theme-wrapper";
import "@/registry/themes.css";
import { ThemesTabs } from "./tabs";

export const metadata: Metadata = {
  title: "Themes",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function ThemesPage() {
  return (
    <div className="container">
      <ThemeWrapper
        defaultTheme="zinc"
        className="relative flex w-full flex-col items-start md:flex-row"
      >
        <ThemeCustomizer />
      </ThemeWrapper>
      <ThemesTabs />
    </div>
  );
}
