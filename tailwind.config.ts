import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          text: "#333",
          "text-light": "#555",
          button: "#E3C9A8",
        },
        thema: {
          "04-point": "var(--color-thema-04-point)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-noto-sans)", "system-ui", "sans-serif"],
        gowun: ["GowunDodum", "system-ui", "sans-serif"],
        caramel: ["Caramel", "cursive", "sans-serif"],
      },
      maxWidth: {
        mobile: "360px",
      },
      screens: {
        mobile: "360px",
      },
    },
  },
  plugins: [],
};

export default config;
