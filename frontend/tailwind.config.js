import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: true,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root"
  },

}