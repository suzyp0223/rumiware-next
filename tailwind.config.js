/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ src 폴더 안도 포함시켜야 함
  ],
  theme: {
    extend: {
      colors: {
        "peach-pink": "#fff5f3", // 원하는 이름으로 지정
      },
      fontSize: {
        base: "1rem", // ✅ 여기서 base의 크기를 확인 가능
      },
    },
  },
  plugins: [],
};
