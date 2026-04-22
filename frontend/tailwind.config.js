/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#e8efe9",
        mist: "#07110d",
        paper: "#0d1713",
        accent: "#7fb08c",
        accentSoft: "#15231d",
        forest: {
          950: "#050a08",
          900: "#07110d",
          850: "#0b1511",
          800: "#10201a",
          700: "#173027",
          600: "#234338",
          500: "#385f4f",
          400: "#5a8a71",
          300: "#7fb08c",
          200: "#a8ccb0",
        },
        gold: {
          300: "#d8c7a0",
          400: "#c6b17f",
        },
      },
      boxShadow: {
        soft: "0 28px 80px -38px rgba(0, 0, 0, 0.75)",
        panel: "0 22px 60px -34px rgba(0, 0, 0, 0.9)",
        glow: "0 0 0 1px rgba(127, 176, 140, 0.15), 0 24px 70px -35px rgba(18, 52, 39, 0.9)",
      },
      fontFamily: {
        sans: ["Georgia", "Cambria", "Times New Roman", "serif"],
        body: ["Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(127, 176, 140, 0.16), transparent 32%), radial-gradient(circle at 20% 20%, rgba(216, 199, 160, 0.08), transparent 18%)",
      },
    },
  },
  plugins: [],
};
