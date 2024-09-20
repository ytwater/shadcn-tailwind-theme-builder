"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeSelector() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <Button
        variant={theme === "light" ? "default" : "outline"}
        // className="bg-slate-600 text-white dark:bg-slate-50 dark:text-black"
        onClick={() => setTheme("light")}
      >
        <SunIcon className="mr-1 size-5" /> Set Light Theme
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        // className="bg-slate-50 text-black dark:bg-slate-600 dark:text-white"
        onClick={() => setTheme("dark")}
      >
        <MoonIcon className="mr-1 size-5" /> Set Dark Theme
      </Button>
    </div>
  );
}
