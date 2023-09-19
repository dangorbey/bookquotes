import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'baskerville': ['baskerville-display-pt', 'serif'], // Ensure fonts with spaces have " " surrounding it.
      'artifex': ['artifex-cf', 'serif']
    },
  },
  plugins: [],
} satisfies Config;
