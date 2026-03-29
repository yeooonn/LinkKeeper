#!/usr/bin/env bash
# 로컬 개발: 알림 Cron API를 60초마다 호출 (trigger-cron-local.sh와 동일 .env 사용)
# 사용: 다른 터미널에서 npm run dev 실행 후 → npm run cron:local:watch
# 종료: Ctrl+C

set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

echo "cron:local 루프 시작 (60초 간격). 중지: Ctrl+C"
while true; do
  echo "--- $(date "+%Y-%m-%d %H:%M:%S") ---"
  bash "$SCRIPT_DIR/trigger-cron-local.sh" || echo "(요청 실패, 루프 유지)"
  sleep 60
done
