/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paper
        cream: "#FBF7F2",
        ivory: "#F6EFE7",
        paper: "#FFFDFA",
        // Tulip
        blush: "#F2DCDA",
        petal: "#E6B3B4",
        rose: "#D18A8F",
        ember: "#A83E45",
        // Ink
        ink: "#2B2522",
        ash: "#6A605A",
        mute: "#9A8F88",
        // Leaf
        leaf: "#8C9C82",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        paper: "0 1px 2px rgba(43,37,34,0.04), 0 12px 30px -12px rgba(43,37,34,0.18)",
        photo: "0 2px 3px rgba(43,37,34,0.06), 0 18px 40px -20px rgba(43,37,34,0.35)",
        soft: "0 10px 40px -20px rgba(168,62,69,0.35)",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
