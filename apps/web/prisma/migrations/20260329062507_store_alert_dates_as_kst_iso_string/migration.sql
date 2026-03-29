-- 기존 TIMESTAMP(3) 값을 UTC로 해석한 뒤, 한국 시각 ISO 문자열(+09:00)로 변환해 저장
ALTER TABLE "public"."Link" ALTER COLUMN "customAlertDate" SET DATA TYPE TEXT USING (
  CASE
    WHEN "customAlertDate" IS NULL THEN NULL
    ELSE to_char(("customAlertDate" AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD"T"HH24:MI:SS') || '+09:00'
  END
);

ALTER TABLE "public"."Link" ALTER COLUMN "alertAt" SET DATA TYPE TEXT USING (
  CASE
    WHEN "alertAt" IS NULL THEN NULL
    ELSE to_char(("alertAt" AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD"T"HH24:MI:SS') || '+09:00'
  END
);
