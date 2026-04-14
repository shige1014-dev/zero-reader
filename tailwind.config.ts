import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0D0D0D",
        surface: "#141414",
        surfaceSoft: "#191919",
        accent: "#C9A84C",
        accentSoft: "rgba(201, 168, 76, 0.14)",
        text: "#E8E8E0",
        textMuted: "#888880",
        border: "rgba(201, 168, 76, 0.15)"
      },
      fontFamily: {
        display: [
          "\"Avenir Next\"",
          "\"Segoe UI\"",
          "\"Helvetica Neue\"",
          "sans-serif"
        ],
        body: [
          "\"Iowan Old Style\"",
          "\"Palatino Linotype\"",
          "\"Book Antiqua\"",
          "\"Baskerville\"",
          "Georgia",
          "serif"
        ],
        mono: [
          "\"IBM Plex Mono\"",
          "\"SFMono-Regular\"",
          "\"Cascadia Code\"",
          "monospace"
        ]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(201, 168, 76, 0.12), 0 16px 48px rgba(0, 0, 0, 0.34)"
      },
      backgroundImage: {
        halo:
          "radial-gradient(circle at top, rgba(201, 168, 76, 0.18), transparent 38%), linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))"
      }
    }
  },
  plugins: []
};

export default config;
