import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Theme colors
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        cta: "var(--cta)",
        
        // Text colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        
        // Surface colors
        surface: {
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
        },
        border: "var(--border-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
