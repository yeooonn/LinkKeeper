-- LinkKeeper: 매분 알림 발송 API 호출 (pg_cron + pg_net) — 템플릿(플레이스홀더만 커밋)
--
-- .env 기준으로 실제 URL·CRON_SECRET이 채워진 SQL이 필요하면:
--   npm run generate:supabase-cron
--   → supabase/cron/linkkeeper_notify.filled.sql 생성(gitignore, Supabase SQL Editor에 붙여 넣기)
--
-- 사전 작업: Supabase Dashboard → Database → Extensions 에서 pg_cron, pg_net 활성화
-- 문서: https://supabase.com/docs/guides/database/extensions/pgcron
--       https://supabase.com/docs/guides/database/extensions/pg_net
--
-- [로컬에서 알림 API만 테스트]
--   이 SQL을 localhost URL로 바꿔도 Supabase 클라우드에서 내 PC로는 연결되지 않음.
--   터미널에서: npm run dev 후 npm run cron:local  (scripts/trigger-cron-local.sh, .env의 CRON_SECRET 사용)
--
-- [Supabase→로컬 연동까지 테스트 (선택)]
--   ngrok/cloudflared 등으로 localhost:3000을 공개 URL로 노출한 뒤,
--   __PUBLIC_SITE_URL__ = 그 https 주소(끝 / 없음), __CRON_SECRET__ = 로컬 .env 와 동일하게 치환.
--
-- [배포]
--   __PUBLIC_SITE_URL__  예: https://linkkeeper-xxx.vercel.app (끝에 / 없음)
--   __CRON_SECRET__      Vercel 프로젝트 환경 변수 CRON_SECRET 과 동일한 값

-- 기존 동일 이름 작업이 있으면 제거 후 재등록
SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'linkkeeper_send_notifications';

SELECT cron.schedule(
  'linkkeeper_send_notifications',
  '* * * * *',
  $$
  SELECT net.http_get(
    url := '__PUBLIC_SITE_URL__/api/cron/send-notifications',
    headers := jsonb_build_object(
      'Authorization',
      'Bearer __CRON_SECRET__'
    ),
    timeout_milliseconds := 60000
  ) AS request_id;
  $$
);
