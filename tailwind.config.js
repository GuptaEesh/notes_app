const colors = {
  primary_color: "rgba(0,0,0,0.8)",
  glass: "rgba(0,0,0,0.5)",
  secondary_color: "rgb(255,255,0)",
  light_background_color: "rgba(255,250,0,0.2)",
  danger_color: "red",
  white: "white",
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.primary_color,
      glass: colors.glass,
      secondary: colors.secondary_color,
      light_background: colors.light_background_color,
      error: colors.danger_color,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
};
