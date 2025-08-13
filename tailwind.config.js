/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Violet - Primary dark color for text and main elements
        'deep-violet': '#302C4D',
        // Bright Purple - Main accent color for highlights and CTAs
        'bright-purple': '#8C6FF0',
        // Soft Lavender - Secondary text and subtle highlights
        'soft-lavender': '#BCA6F5',
        // Pastel Blue - Light accents and backgrounds
        'pastel-blue': '#A4C9FF',
        // Cool White - Main background color
        'cool-white': '#F6F6FA',
        // Muted Gray - Secondary text and subtle elements
        'muted-gray': '#9B9BA4',
        
        // Extended palette for better component support
        primary: {
          50: '#f6f6fa',
          100: '#e8e6f2',
          200: '#d4d0e8',
          300: '#bca6f5',
          400: '#a48cff',
          500: '#8c6ff0',
          600: '#7c5ce6',
          700: '#6b4bd3',
          800: '#5a3fb0',
          900: '#302c4d',
        },
        secondary: {
          50: '#f6f6fa',
          100: '#ede9f7',
          200: '#ddd4f0',
          300: '#bca6f5',
          400: '#a48cff',
          500: '#8c6ff0',
          600: '#7c5ce6',
          700: '#6b4bd3',
          800: '#5a3fb0',
          900: '#302c4d',
        },
        accent: {
          50: '#f6f6fa',
          100: '#e8f2ff',
          200: '#d4e6ff',
          300: '#a4c9ff',
          400: '#7db3ff',
          500: '#5a9eff',
          600: '#4285f4',
          700: '#3367d6',
          800: '#2851a3',
          900: '#1e3a8a',
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #8C6FF0 0%, #A4C9FF 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #8C6FF0 0%, #A4C9FF 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(140,111,240,0.1) 0%, rgba(164,201,255,0.05) 100%)',
        'gradient-sidebar': 'linear-gradient(180deg, #302C4D 0%, #8C6FF0 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
