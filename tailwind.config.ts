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
        canvas: "#14110D",
        surface: "#1A1612",
        surfaceSoft: "#1C1813",
        accent: "#D4B670",
        accentSoft: "rgba(212, 182, 112, 0.10)",
        text: "#F5EFE3",
        textMuted: "#A89B82",
        border: "rgba(255, 255, 255, 0.06)"
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
        glow: "0 0 0 1px rgba(214, 185, 119, 0.08), 0 24px 80px rgba(0, 0, 0, 0.42)"
      },
      backgroundImage: {
        halo:
          "radial-gradient(circle at 50% -10%, rgba(122, 150, 178, 0.16), transparent 40%), linear-gradient(180deg, rgba(214, 185, 119, 0.04), rgba(255, 255, 255, 0))"
      }
    }
  },
  plugins: []
};

export default config;
