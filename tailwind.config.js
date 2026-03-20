/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'api-dark': '#0A0A0F',
        'api-cream': '#F5F5F0',
        'aram': '#10B981',
        'porul': '#F59E0B',
        'inbam': '#8B5CF6',
        'api-accent': '#2E86C1',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
