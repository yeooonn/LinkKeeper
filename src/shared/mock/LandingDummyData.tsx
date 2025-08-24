export interface LandingArticle {
  title: string;
  link: string;
  filename: string;
  time: string;
  tag: string[];
  alert: boolean;
  bookmark: boolean;
  hasRead: boolean;
}

export const LandingDummyData: LandingArticle[] = [
  {
    title: "React 18의 새로운 기능들",
    link: "https://react.dev/blog/2022/03/29/react-v18",
    filename: "개발자료",
    time: "2시간 전",
    tag: ["React", "Frontend"],
    alert: true,
    bookmark: true,
    hasRead: false,
  },
  {
    title: "Next.js 14 릴리즈 노트",
    link: "https://nextjs.org/blog/next-14",
    filename: "개발자료",
    time: "1일 전",
    tag: ["Next.js", "Frontend"],
    alert: false,
    bookmark: false,
    hasRead: true,
  },
  {
    title: "타입스크립트 유틸리티 타입 정리",
    link: "https://typescriptlang.org/docs/handbook/utility-types.html",
    filename: "개발자료",
    time: "3일 전",
    tag: ["TypeScript"],
    alert: false,
    bookmark: true,
    hasRead: false,
  },
  {
    title: "FSD 구조 적용 가이드",
    link: "https://example.com/fsd-guide",
    filename: "프로젝트 관리",
    time: "5시간 전",
    tag: ["Architecture", "Frontend"],
    alert: true,
    bookmark: false,
    hasRead: true,
  },
  {
    title: "CSS Grid 완벽 가이드",
    link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    filename: "디자인 자료",
    time: "2일 전",
    tag: ["CSS", "Design"],
    alert: false,
    bookmark: true,
    hasRead: false,
  },
];
