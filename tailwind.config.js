/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ src 폴더 안도 포함시켜야 함
  ],
  theme: {
    extend: {
      boxShadow: {
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)", // ⬆ 위쪽 그림자
        "top-md": "0 -6px 10px -2px rgba(0, 0, 0, 0.15)", // 좀 더 진하고 크게
      },
      colors: {
        "peach-pink": "#fff5f3", // 원하는 이름으로 지정
        "tab-gray": "#f3f4f6",

        back: "var(--color-back)",
        white: "var(--color-white)",

        gray: {
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },
        blue: {
          100: "var(--color-blue-100)",
          200: "var(--color-blue-200)",
          300: "var(--color-blue-300)",
          400: "var(--color-blue-400)",
          500: "var(--color-blue-500)",
          600: "var(--color-blue-600)",
          700: "var(--color-blue-700)",
          800: "var(--color-blue-800)",
          900: "var(--color-blue-900)",
        },
        red: {
          100: "var(--color-red-100)",
          200: "var(--color-red-200)",
          300: "var(--color-red-300)",
          400: "var(--color-red-400)",
          500: "var(--color-red-500)",
          600: "var(--color-red-600)",
          700: "var(--color-red-700)",
          800: "var(--color-red-800)",
          900: "var(--color-red-900)",
        },
        yellow: {
          100: "var(--color-yellow-100)",
          200: "var(--color-yellow-200)",
          300: "var(--color-yellow-300)",
          400: "var(--color-yellow-400)",
          500: "var(--color-yellow-500)",
          600: "var(--color-yellow-600)",
          700: "var(--color-yellow-700)",
          800: "var(--color-yellow-800)",
          900: "var(--color-yellow-900)",
        },
        green: {
          100: "var(--color-green-100)",
          200: "var(--color-green-200)",
          300: "var(--color-green-300)",
          400: "var(--color-green-400)",
          500: "var(--color-green-500)",
          600: "var(--color-green-600)",
          700: "var(--color-green-700)",
          800: "var(--color-green-800)",
          900: "var(--color-green-900)",
        },
        brown: {
          100: "var(--color-brown-100)",
          200: "var(--color-brown-200)",
          300: "var(--color-brown-300)",
          400: "var(--color-brown-400)",
          500: "var(--color-brown-500)",
          600: "var(--color-brown-600)",
          700: "var(--color-brown-700)",
          800: "var(--color-brown-800)",
          900: "var(--color-brown-900)",
        },
        purple: {
          100: "var(--color-purple-100)",
          200: "var(--color-purple-200)",
          300: "var(--color-purple-300)",
          400: "var(--color-purple-400)",
          500: "var(--color-purple-500)",
          600: "var(--color-purple-600)",
          700: "var(--color-purple-700)",
          800: "var(--color-purple-800)",
          900: "var(--color-purple-900)",
        },
        peach: {
          100: "var(--color-peach-100)",
          200: "var(--color-peach-200)",
          300: "var(--color-peach-300)",
          line: "var(--color-peach-line)",
          btn: "var(--color-peach-btn)",
          text: "var(--color-peach-text)",
          hoverText: "var(--color-peach-hoverText)",
          darker: "var(--color-peach-darker)",
        },
        opacity: {
          20: "var(--color-opacity-20)",
        },
      },
      fontSize: {
        base: "1rem", // ✅ 여기서 base의 크기를 확인 가능
      },
    },
  },
  plugins: [],
};
