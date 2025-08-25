import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ndoto: {
          blue: "#2563EB",
          yellow: "#FACC15",
          green: "#22C55E",
          purple: "#A855F7"
        }
      }
    }
  },
  plugins: []
};

export default config;