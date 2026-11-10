/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F7F8",
        surface: "#FFFFFF",
        raised: "#EAF0F2",
        line: "#D9E2E6",
        muted: "#63717E",
        ink: "#17252D",
        acid: "#176B5B",
        aqua: "#137A8A",
        coral: "#C84B3C",
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