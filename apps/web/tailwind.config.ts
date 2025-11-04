import type { Config } from "tailwindcss";
import { sharedTheme, sharedSafelist } from "@recipe-manager/config/tailwind";

const config: Config = {
  darkMode: ["class"],
  safelist: sharedSafelist,
  theme: sharedTheme,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  plugins: [require("tailwindcss-animate")]
};

export default config;
