import type { Config } from "tailwindcss";
import { sharedTheme, sharedSafelist } from "@recipe-manager/config/tailwind";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  safelist: sharedSafelist,
  theme: sharedTheme,
  plugins: [require("tailwindcss-animate")]
};

export default config;
