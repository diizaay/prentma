const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
        display: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#c8e1ff',
          200: '#9ac5ff',
          300: '#6ba9ff',
          400: '#3d8df5',
          500: '#0071C0',
          600: '#005ea5',
          700: '#004a83',
          800: '#003765',
          900: '#002748',
          DEFAULT: '#0071C0',
          foreground: '#ffffff'
        },
        secondary: {
          50: '#ecfbff',
          100: '#d2f4ff',
          200: '#a4e7ff',
          300: '#76daff',
          400: '#48caff',
          500: '#2ab2f0',
          600: '#1f8dc4',
          700: '#156c96',
          800: '#0b4c69',
          900: '#052f42',
          DEFAULT: '#1f8dc4',
          foreground: '#ffffff'
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f6f9ff'
        },
        outline: '#d7e3ff',
        accent: {
          DEFAULT: '#2ab2f0',
          foreground: '#003f6b'
        },
        muted: {
          DEFAULT: '#5f7ab2',
          foreground: '#f6f8ff'
        },
        destructive: {
          DEFAULT: '#ff4d4d',
          foreground: '#ffffff'
        },
        border: '#d7e3ff',
        input: '#f1f6ff',
        ring: '#94b8ff',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#171E43'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#171E43'
        },
        chart: {
          1: '#0071C0',
          2: '#2ab2f0',
          3: '#19d2b8',
          4: '#f6c34c',
          5: '#ff6a7a'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
