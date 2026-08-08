/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF4FE",
          100: "#DCE6FD",
          light: "#93C5FD",
          dark: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          light: "#6EE7B7",
          dark: "#047857",
        },
        accent: {
          DEFAULT: "#F97316",
          50: "#FFF7ED",
          light: "#FDBA74",
          dark: "#C2410C",
        },
        surface: "#F8FAFC",
        ink: {
          DEFAULT: "#1E293B",
          muted: "#64748B",
          faint: "#94A3B8",
        },
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(30,41,59,0.04), 0 4px 12px rgba(30,41,59,0.06)",
        "card-hover": "0 8px 24px rgba(30,41,59,0.12)",
        glow: "0 8px 30px rgba(37,99,235,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
