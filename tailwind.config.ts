import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        mapFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        zoomInZoomOut: {
          "0%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.01, 1.01)" },
          "100%": { transform: "scale(1, 1)" },
        },
        fade: {
          "0%": { opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "90%": { opacity: "0" },
        },
      },
      animation: {
        "map-fade": "mapFade 2s linear",
        "zoom-in-zoom-out": "zoomInZoomOut 5s ease infinite",
        "fade-animate": "fade 5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
