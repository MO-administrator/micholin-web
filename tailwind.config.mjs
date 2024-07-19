/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      height: {
        100: "46rem",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "ping-forward": "ping 1s cubic-bezier(0, 0, 0.2, 1) forwards",
        "ping-reverse": "ping 1s cubic-bezier(0, 0, 1, 0.2) reverse",
      },
      listStyleImage: {
        chevron: "url('/icons/right-thin-chevron.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
