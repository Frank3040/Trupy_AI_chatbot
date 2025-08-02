/** @type {import('tailwindcss').Config} */
module.exports = {
  /*  1️⃣  Rutas donde Tailwind debe buscar clases  */
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  /*  2️⃣  Tema (puedes extender colores, fuentes, etc.)  */
  theme: {
    extend: {
      /* Ejemplo: paleta personalizada */
      colors: {
        primary: {
          DEFAULT: '#7c3aed',      /* purple‑600 */
          dark: '#6d28d9',         /* hover */
        },
      },
    },
  },

  /*  3️⃣  Plugins oficiales u opcionales  */
  plugins: [
    require('@tailwindcss/forms'),   // estilos básicos para <form>
    require('@tailwindcss/typography'), // si usas prose/markdown
  ],
}
