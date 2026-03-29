#!/usr/bin/env bash
# .env의 NEXT_PUBLIC_BASE_URL, CRON_SECRET으로 Supabase SQL Editor용 파일 생성
# (민감값이 들어가므로 생성물은 gitignore)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$ROOT/../.." && pwd)"

if [[ -f "${ROOT}/.env" ]]; then
  ENV_FILE="${ROOT}/.env"
elif [[ -f "${REPO_ROOT}/.env" ]]; then
  ENV_FILE="${REPO_ROOT}/.env"
else
  echo "Error: .env not found (apps/web or repo root)"
  exit 1
fi

BASE_URL=$(grep -E '^NEXT_PUBLIC_BASE_URL=' "$ENV_FILE" | cut -d= -f2- | tr -d '\r' | sed 's/^"//;s/"$//;s/^'"'"'//;s/'"'"'$//')
BASE_URL="${BASE_URL%/}"

CRON_SECRET=$(grep -E '^CRON_SECRET=' "$ENV_FILE" | cut -d= -f2- | tr -d '\r' | sed 's/^"//;s/"$//;s/^'"'"'//;s/'"'"'$//')

if [[ -z "${BASE_URL}" || -z "${CRON_SECRET}" ]]; then
  echo "Error: NEXT_PUBLIC_BASE_URL or CRON_SECRET is empty in .env"
  exit 1
fi

OUT="${ROOT}/supabase/cron/linkkeeper_notify.filled.sql"

# SQL 내 작은따옴표 이스케이프 (url/secret에 ' 가 있으면)
esc_sql() { printf '%s' "$1" | sed "s/'/''/g"; }
BASE_ESC=$(esc_sql "$BASE_URL")
SECRET_ESC=$(esc_sql "$CRON_SECRET")

cat > "$OUT" <<EOF
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
  \$\$
  SELECT net.http_get(
    url := '${BASE_ESC}/api/cron/send-notifications',
    headers := jsonb_build_object(
      'Authorization',
      'Bearer ${SECRET_ESC}'
    ),
    timeout_milliseconds := 60000
  ) AS request_id;
  \$\$
);
EOF

echo "Wrote ${OUT}"
