import z from "zod";

export const linkFormSchema = z.object({
  title: z.string().min(1, { message: "제목은 필수입니다." }),
  url: z.string().url({ message: "유효한 URL 형식이어야 합니다." }),
  tags: z.string().optional(),
  memo: z.string().optional(),
  alert: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
}).refine((data) => {
  if (!data.date) return true; // 날짜 미입력 시 통과
  const now = new Date();
  const selected = new Date(`${data.date}T${data.time || "00:00"}`);
  return selected >= now;
}, {
  message: "현재 이후의 날짜와 시간을 선택해야 합니다.",
  path: ["time"], // 에러를 시간 필드로 연결
});
