export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "naqsh-ivory": "#FBF4EA",
        "naqsh-noir": "#241014",
        "naqsh-umber": "#3A1F27",
        "naqsh-gold": "#C9A24B",
        "naqsh-rose": "#6E1423",
        "naqsh-sand": "#EFDCC8",
        "naqsh-emerald": "#1F4D3A",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Manrope"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
