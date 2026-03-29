-- 기존 행: 수정 시각을 생성 시각과 동일하게 둠
ALTER TABLE "public"."Link" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "public"."Link" SET "updatedAt" = "createdAt";

ALTER TABLE "public"."Link" ALTER COLUMN "updatedAt" DROP DEFAULT;
