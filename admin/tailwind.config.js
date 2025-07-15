// tailwind.config.js
import {   Config } from "tailwindcss"

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#405189", 
        secondary: "#F3F4F6", 
        accent: "#FFB703",  
        danger: "#E63946",  
        success: "#38B000",  
        scrollbarThumb: "#888",  
        scrollbarTrack: "#f0f0f0",  
        scrollbarThumbHover: "#555",  
      },
      boxShadow: {
        "custom-light": "0 2px 6px rgba(0, 0, 0, 0.05)",  
        light: "rgba(0, 0, 0, 0.10) 0px 1px 2px", 
      },
    },
  },
  darkMode: "class",  
  plugins: [],
}

export default config;
