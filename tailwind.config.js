// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Indica a Tailwind que busque clases en estos archivos
    './public/index.html',              // Asegúrate de incluir también tus archivos HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};