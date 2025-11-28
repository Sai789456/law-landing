/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your custom colors to avoid conflicts
      colors: {
        'gold': '#b59a6d',
        'gold-light': '#bfa37c',
        'gold-dark': '#a38863',
        'bg-dark': '#141414',
        'bg-section': '#f5f5f0',
        'text-dark': '#1a1a1a',
        'text-muted': '#c3c3c3',
        'primary': '#c89b3c',
        'primary-dark': '#a87f2e',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
  // IMPORTANT: Prevent Tailwind from resetting your styles
  corePlugins: {
    preflight: false, // Disable Tailwind's base reset to preserve your existing styles
  },
}

