import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        darkTheme: {

          "primary": "#9400ff",

          "secondary": "#5f9e00",

          "accent": "#ce3300",

          "neutral": "#121212",

          "base-100": "#2e2726",

          "info": "#00d5ff",

          "success": "#00e4a2",

          "warning": "#e5a900",

          "error": "#fe626e",
          "body":{
            "background-color":"#292635"
          }
        },
        lightTheme: {

          "primary": "#a100ff",

          "secondary": "#ff5400",

          "accent": "#977600",

          "neutral": "#2d2d33",

          "base-100": "#fff9e7",

          "info": "#00aeff",

          "success": "#00c100",

          "warning": "#ff7d00",

          "error": "#ff2a61",
          "body":{
            "background-color":"#e3e6e6"
          }
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('daisyui'),
  ],
};
export default config;
