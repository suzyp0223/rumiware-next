/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ src 폴더 안도 포함시켜야 함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
