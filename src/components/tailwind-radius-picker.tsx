"use client";

import { useHslTheme } from "@/components/HslThemeProvider";
import { Button } from "@/components/ui/button";
// import { SwatchesPicker } from "react-color";

export const TailwindRadiusPicker = () => {
  const { hslTheme, setHslTheme } = useHslTheme();
  const handleRadiusChange = (radius: string): void => {
    console.log("hslTheme", hslTheme);
    console.log("radius", radius);
    if (hslTheme) {
      console.log(`setting radius to ${radius}`);
      setHslTheme({ ...hslTheme, radius });
    }
  };
  console.log("radius", hslTheme?.radius);
  return (
    <div>
      Radius
      <div>
        <Button
          onClick={() => handleRadiusChange("0rem")}
          variant={hslTheme?.radius === "0rem" ? "default" : "outline"}
        >
          0
        </Button>
        <Button
          onClick={() => handleRadiusChange("0.3rem")}
          variant={hslTheme?.radius === "0.3rem" ? "default" : "outline"}
        >
          0.3
        </Button>
        <Button
          onClick={() => handleRadiusChange("0.5rem")}
          variant={hslTheme?.radius === "0.5rem" ? "default" : "outline"}
        >
          0.5
        </Button>
        <Button
          onClick={() => handleRadiusChange("0.75rem")}
          variant={hslTheme?.radius === "0.75rem" ? "default" : "outline"}
        >
          0.75
        </Button>
        <Button
          onClick={() => handleRadiusChange("1rem")}
          variant={hslTheme?.radius === "1rem" ? "default" : "outline"}
        >
          1.0
        </Button>
      </div>
    </div>
  );
};
