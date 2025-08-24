module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)", // 기본 배경색
        foreground: "var(--color-foreground)", // 글자, 아이콘 등 전경 요소의 기본 색상
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      screens: {
        laptop: { max: "1512px" }, // 노트북 (맥북 M1 프로 기준)
        desktop: { min: "1513px" }, // 모니터
      },
    },
  },
  plugins: [],
};
