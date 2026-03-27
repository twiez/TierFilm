/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Noto Sans Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        bg: {
          base: "#08080f",
          surface: "#0f0f1a",
          elevated: "#161625",
          card: "#1c1c2e",
        },
        accent: {
          DEFAULT: "#7c3aed",
          light: "#a855f7",
          glow: "rgba(124,58,237,0.3)",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          DEFAULT: "rgba(255,255,255,0.10)",
          strong: "rgba(255,255,255,0.18)",
        },
        tier: {
          s: "#f59e0b",
          a: "#10b981",
          b: "#3b82f6",
          c: "#f97316",
          d: "#ef4444",
        },
        text: {
          primary: "#f0f0f5",
          secondary: "#9090a8",
          muted: "#5a5a72",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-accent":
          "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(124,58,237,0.2)",
        "glow-md": "0 0 40px rgba(124,58,237,0.25)",
        "glow-lg": "0 0 80px rgba(124,58,237,0.3)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5)",
      },
      backdropBlur: {
        xs: "4px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        counter: "counter 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
