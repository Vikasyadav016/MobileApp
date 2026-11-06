/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#090B0E",
        surface: "#111519",
        raised: "#191F23",
        line: "#262D30",
        muted: "#7F8B8A",
        ink: "#F0F4EF",
        acid: "#C6F36A",
        aqua: "#70E0CE",
        coral: "#FF8D72",
      },
      fontFamily: {
        display: ["SpaceGrotesk_600SemiBold"],
        body: ["SpaceGrotesk_400Regular"],
        medium: ["SpaceGrotesk_500Medium"],
        bold: ["SpaceGrotesk_700Bold"],
      },
    },
  },
  plugins: [],
};