/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Exact Axiom colors extracted from screenshot
        background: {
          DEFAULT: '#0A0E13',      // Main background
          secondary: '#0D1117',    // Cards background
          card: '#161B22',         // Card hover
        },
        surface: {
          DEFAULT: '#1C2128',
          hover: '#22272E',
        },
        primary: {
          DEFAULT: '#5865F2',      // Blue accent
          hover: '#4752C4',
        },
        green: '#22C55E',          // Positive %
        red: '#EF4444',            // Negative %
        cyan: '#06B6D4',           // Info accent
        yellow: '#EAB308',         // Warning
        text: {
          primary: '#E6EDF3',
          secondary: '#8B949E',
          tertiary: '#6E7681',
        },
        border: '#30363D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};