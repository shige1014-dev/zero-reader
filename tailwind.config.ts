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
        canvas: "#05080B",
        surface: "#0B1117",
        surfaceSoft: "#111922",
        accent: "#D6B977",
        accentSoft: "rgba(214, 185, 119, 0.10)",
        text: "#E8E3D8",
        textMuted: "#8D9399",
        border: "rgba(156, 171, 185, 0.16)"
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
