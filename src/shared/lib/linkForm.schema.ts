import z from "zod";

// 링크 추가 폼 zod 스키마 정의
export const linkFormSchema = z.object({
  title: z.string().min(1, { message: "제목은 필수입니다." }),
  url: z.url({ message: "유효한 URL 형식이어야 합니다." }),
  tags: z.string().optional(), // 태그는 선택적, 공백 허용
  memo: z.string().optional(), // 메모는 선택적
  alert: z
    .enum(["NONE", "ONE_HOUR", "ONE_DAY", "ONE_WEEK", "CUSTOM"] as const)
    .optional(), // ALERT_OPTION에 맞춘 enum
  date: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "유효한 날짜 형식이어야 합니다.",
    }),
  time: z.string().optional(),
});
