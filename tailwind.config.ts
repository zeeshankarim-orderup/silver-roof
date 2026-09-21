import type { Config } from "tailwindcss";

/**
 * Silver Roof design tokens.
 *
 * Palette reference: architectural concrete + brushed aluminum + warm interiors.
 * Nothing here is a generic grey scale - `silver` is cooled slightly to read as
 * metal, `graphite` is warmed slightly so text never looks blue on the bone base.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./i18n/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // The default opacity scale steps in 5s; these are the in-between values
      // the design uses for hairlines and scrims.
      opacity: {
        8: "0.08",
        12: "0.12",
        15: "0.15",
        18: "0.18",
        22: "0.22",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        62: "0.62",
        65: "0.65",
        72: "0.72",
        85: "0.85",
        92: "0.92",
        96: "0.96",
      },
      colors: {
        bone: {
          DEFAULT: "#FBF9F5",
          50: "#FDFCFA",
          100: "#FBF9F5",
          200: "#F4F0E8",
        },
        linen: {
          DEFAULT: "#EFEAE1",
          dark: "#E5DFD3",
        },
        silver: {
          100: "#E9ECEE",
          200: "#D7DBDE",
          300: "#C3C8CB",
          400: "#A2A8AC",
          500: "#848A8E",
        },
        graphite: {
          400: "#767C80",
          500: "#5C6165",
          600: "#434749",
          700: "#303335",
          800: "#242627",
          900: "#1B1D1E",
          950: "#121314",
        },
        brass: {
          200: "#E4D6B8",
          300: "#D2BE93",
          400: "#BFA36C",
          500: "#A98A52",
          600: "#8E7340",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "sans-serif"],
      },
      fontSize: {
        // A modular scale (~1.25) with headline sizes tightened for display serif.
        "display-sm": [
          "clamp(2rem, 5vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "clamp(2.5rem, 6vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(3rem, 8vw, 5.75rem)",
          { lineHeight: "1", letterSpacing: "-0.025em" },
        ],
      },
      letterSpacing: {
        label: "0.14em",
      },
      maxWidth: {
        shell: "88rem",
        prose: "38rem",
      },
      borderRadius: {
        card: "2px",
        frame: "4px",
      },
      boxShadow: {
        frame:
          "0 1px 2px rgba(27, 29, 30, 0.04), 0 12px 32px -18px rgba(27, 29, 30, 0.35)",
        lift: "0 2px 4px rgba(27, 29, 30, 0.04), 0 28px 60px -28px rgba(27, 29, 30, 0.45)",
        panel: "0 30px 80px -40px rgba(27, 29, 30, 0.55)",
      },
      transitionTimingFunction: {
        // Slow-out easing used across hover states so motion matches Framer variants.
        architectural: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.45" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        "scroll-hint": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "scroll-hint":
          "scroll-hint 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
