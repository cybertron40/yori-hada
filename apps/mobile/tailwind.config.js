const { sharedTheme, sharedSafelist } = require("@recipe-manager/config/tailwind");

module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: sharedTheme,
  plugins: [],
  safelist: sharedSafelist
};
