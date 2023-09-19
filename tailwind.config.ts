import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   myAmber: "rgba(252, 211, 77, 50)"
      // }
    },
  },
  plugins: [],
} satisfies Config;
