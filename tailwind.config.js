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
        "tab-gray": "#f3f4f6",
      },
      fontSize: {
        base: "1rem", // ✅ 여기서 base의 크기를 확인 가능
      },
      boxShadow: {
        leftBottomSide: "-2px 0 6px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.08)",
        rightBottomSide: "2px 0 6px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.08)",
        bottomSide: "0 2px 6px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
