const colors = {
  primary_color: "rgba(0,0,0,0.8)",
  glass: "rgba(0,0,0,0.5)",
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.primary_color,
      glass: colors.glass,
      secondary: "rgb(255,255,0)",
      light_background: "rgba(255,250,0,0.2)",
      write: "#D81E5B",
      error: "red",
    },
    extend: {},
  },
  plugins: [],
};
