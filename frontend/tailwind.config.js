/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#eef0ea",
        mist: "#0a0d0c",
        paper: "#111614",
        accent: "#cbb88a",
        accentSoft: "#1b211e",
        forest: {
          950: "#070a09",
          900: "#0d1211",
          850: "#111816",
          800: "#151d1a",
          700: "#1c2723",
          600: "#23312d",
          500: "#31423d",
          400: "#607066",
          300: "#90a295",
          200: "#bdc8c0",
        },
        gold: {
          300: "#d8c8a2",
          400: "#cbb88a",
          500: "#a48f60",
        },
        jade: {
          400: "#4f6b5e",
          500: "#3f554a",
        },
      },
      boxShadow: {
        soft: "0 28px 80px -38px rgba(0, 0, 0, 0.82)",
        panel: "0 26px 70px -38px rgba(0, 0, 0, 0.95)",
        glow: "0 0 0 1px rgba(203, 184, 138, 0.12), 0 28px 80px -42px rgba(0, 0, 0, 0.95)",
      },
      fontFamily: {
        sans: ["Georgia", "Iowan Old Style", "Palatino Linotype", "serif"],
        body: ["Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(203, 184, 138, 0.10), transparent 28%), radial-gradient(circle at 20% 22%, rgba(79, 107, 94, 0.12), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 45%)",
      },
    },
  },
  plugins: [],
};
