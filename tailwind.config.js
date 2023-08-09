/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "lato": ["Lato", "sans-serif"],
      "nunito": ["Nunito", "sans-serif"]
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      myTheme: {
        primary: "#FEBF00",
        secondary: "#FF4F3B",
        accent: "#FFFFFF",
        neutral: "#000000",
        "base-100": "#FFFFFF",
        "base-200": "#F2F2F2"
      }
    }]
  }
}

