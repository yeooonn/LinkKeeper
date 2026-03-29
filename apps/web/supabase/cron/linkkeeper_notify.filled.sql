-- 자동 생성: scripts/generate-supabase-cron-sql.sh (.env 기준)
-- 커밋하지 마세요. Supabase SQL Editor에 붙여 넣을 때만 사용.
--
-- NEXT_PUBLIC_BASE_URL이 localhost이면 pg_cron(클라우드)에서 내 PC로는 호출 불가.
--   배포 도메인이 있으면 .env에 그 URL을 넣고 이 스크립트를 다시 실행하세요.

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'linkkeeper_send_notifications';

SELECT cron.schedule(
  'linkkeeper_send_notifications',
  '* * * * *',
  $$
  SELECT net.http_get(
    url := 'http://localhost:3000/api/cron/send-notifications',
    headers := jsonb_build_object(
      'Authorization',
      'Bearer 13f07a424380fcfd6bafca55a5897f3b6ea73f774d9f3e9f'
    ),
    timeout_milliseconds := 60000
  ) AS request_id;
  $$
);
