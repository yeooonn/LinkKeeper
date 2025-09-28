import z from "zod";

// 링크 추가 폼 zod 스키마 정의
export const addLinkFormSchema = z.object({
  title: z.string().min(1, { message: "제목은 필수입니다." }),
  url: z.url({ message: "유효한 URL 형식이어야 합니다." }),
  tags: z.string().optional(), // 태그는 선택적, 공백 허용
  memo: z.string().optional(), // 메모는 선택적
  alert: z
    .enum(["미등록", "1시간", "1일", "1주일", "사용자 정의"] as const)
    .optional(), // ALERT_OPTION에 맞춘 enum
  date: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "유효한 날짜 형식이어야 합니다.",
    }),
  time: z.string().optional(),
});
