const colors = require("./lib/colors.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0B1620",
        card: "#111F2C",
        cardElevated: "#162635",
        borderSubtle: "#1F3446",

        primary: "#2D8CFF",
        primaryDark: "#1F6FE5",
        accent: "#27B1FF",
        mutedBlue: "#6FA9DC",

        success: "#22C55E",
        successDark: "#16A34A",
        warning: "#F59E0B",
        danger: "#EF4444",

        textPrimary: "#E6EDF3",
        textSecondary: "#9FB3C8",
        textMuted: "#5C7285",
      },
    },
    plugins: [],
  },
};
