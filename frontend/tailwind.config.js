/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: "hsl(220, 35%, 7%)",
        foreground: "hsl(210, 40%, 98%)",
        card: "hsl(222, 35%, 10%)",
        "card-foreground": "hsl(210, 40%, 98%)",
        popover: "hsl(222, 35%, 10%)",
        "popover-foreground": "hsl(210, 40%, 98%)",
        primary: "hsl(346, 100%, 56%)",
        "primary-foreground": "hsl(210, 40%, 98%)",
        secondary: "hsl(160, 75%, 47%)",
        "secondary-foreground": "hsl(222, 47%, 11%)",
        muted: "hsl(217, 33%, 17%)",
        "muted-foreground": "hsl(215, 20%, 65%)",
        accent: "hsl(217, 33%, 17%)",
        "accent-foreground": "hsl(210, 40%, 98%)",
        destructive: "hsl(0, 62%, 30%)",
        "destructive-foreground": "hsl(210, 40%, 98%)",
        border: "hsl(217, 33%, 17%)",
        input: "hsl(217, 33%, 17%)",
        ring: "hsl(346, 100%, 56%)",
        hemo: {
          bg: "#0b0f17",
          paper: "#111623",
          subtle: "#1a202e",
          red: "#ff304f",
          green: "#1dd1a1",
          cyan: "#00d2d3",
          purple: "#5f27cd",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 48, 79, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 48, 79, 0.6)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
