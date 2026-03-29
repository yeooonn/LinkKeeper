/** @type {import('tailwindcss').Config} */
/**
 * 웹 `apps/web/src/shared/styles/globals.css` :root 라이트 모드와 동일한 팔레트
 * (background-primary, border-primary, foreground-* 등)
 */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#f9fafb",
          secondary: "#ffffff",
          hover: "#f3f4f6",
          grayTag: "#f3f4f6",
          blueTag: "#dbeafe",
        },
        foreground: {
          primary: "#171717",
          secondary: "#364153",
          trtiary: "#99a1af",
          grayTag: "#6a7282",
          blueTag: "#3b82f6",
        },
        border: {
          primary: "#e5e7eb",
          muted: "#f3f4f6",
          grayTag: "#d1d5dc",
        },
      },
      borderRadius: {
        /** 웹 카드·입력 공통 */
        card: "0.75rem",
      },
    },
  },
  plugins: [],
};
