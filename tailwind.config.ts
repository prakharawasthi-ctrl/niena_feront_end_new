import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scan files in `app` directory
    "./components/**/*.{js,ts,jsx,tsx}", // Scan files in `components` directory
  ],
  theme: {
    extend: {
      // Customize your theme here
      colors: {
        customBlue: "#1e40af",
        customGray: "#64748b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
