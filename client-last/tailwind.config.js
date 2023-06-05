/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "0.2rem",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid

        // Complex site-specific column configuration
        footer: "repeat(auto-fit, minmax(240px, 1fr));",
      },
      screens: {
        touch: { raw: "(hover: none) and (pointer: coarse)" },
        // => @media (min-height: 800px) { ... }
        "non-touch": { raw: "@media (hover: hover) and (pointer: fine)" },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("@tailwindcss/line-clamp"),
  ],
};
