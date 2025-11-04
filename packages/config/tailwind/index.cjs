const sharedSafelist = ["dark", "light"];

const sharedTheme = {
  extend: {
    colors: {
      brand: {
        DEFAULT: "#4F46E5",
        foreground: "#FFFFFF",
        50: "#EEF2FF",
        100: "#E0E7FF",
        200: "#C7D2FE",
        300: "#A5B4FC",
        400: "#818CF8",
        500: "#6366F1",
        600: "#4F46E5",
        700: "#4338CA",
        800: "#3730A3",
        900: "#312E81"
      }
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      display: ["Playfair Display", "ui-serif", "Georgia"]
    }
  }
};

module.exports = {
  sharedSafelist,
  sharedTheme
};
