#!/usr/bin/env bash
# 로컬에서 알림 Cron API 호출 (.env의 CRON_SECRET 사용)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Error: .env not found"
  exit 1
fi

# CRON_SECRET=값 (따옴표 있으면 제거)
CRON_SECRET=$(grep -E '^CRON_SECRET=' .env | cut -d= -f2- | tr -d '\r' | sed 's/^"//;s/"$//;s/^'"'"'//;s/'"'"'$//')

if [[ -z "${CRON_SECRET}" ]]; then
  echo "Error: CRON_SECRET is empty in .env"
  exit 1
fi

BASE_URL="${NEXT_PUBLIC_BASE_URL:-http://localhost:3000/}"
BASE_URL="${BASE_URL%/}"

curl -sS -H "Authorization: Bearer ${CRON_SECRET}" "${BASE_URL}/api/cron/send-notifications"
echo
