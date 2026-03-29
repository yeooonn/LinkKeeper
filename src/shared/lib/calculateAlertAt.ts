import { AlertType } from "@prisma/client";
import {
  parseInstantFromStored,
  toKstOffsetIsoString,
} from "@/shared/lib/kstIsoString";

export type AlertSchedule = {
  alertAt: string | null;
  alertSent: boolean;
};

function toDate(
  d: Date | string | null | undefined,
): Date | null {
  if (d == null) return null;
  if (d instanceof Date) {
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return parseInstantFromStored(d);
}

/**
 * 링크 생성 시 anchorAt은 보통 링크의 createdAt.
 * 수정 시 상대 알림(1시간/1일/1주)은 anchorAt을 `new Date()`로 두는 것이 자연스럽다.
 */
export function calculateAlertAt(
  anchorAt: Date,
  alertType: AlertType | string,
  customAlertDate?: Date | string | null,
): AlertSchedule {
  if (alertType === AlertType.NONE || alertType === "NONE") {
    return { alertAt: null, alertSent: false };
  }

  switch (alertType) {
    case AlertType.ONE_HOUR:
    case "ONE_HOUR":
      return {
        alertAt: toKstOffsetIsoString(
          new Date(anchorAt.getTime() + 60 * 60 * 1000),
        ),
        alertSent: false,
      };
    case AlertType.ONE_DAY:
    case "ONE_DAY":
      return {
        alertAt: toKstOffsetIsoString(
          new Date(anchorAt.getTime() + 24 * 60 * 60 * 1000),
        ),
        alertSent: false,
      };
    case AlertType.ONE_WEEK:
    case "ONE_WEEK":
      return {
        alertAt: toKstOffsetIsoString(
          new Date(anchorAt.getTime() + 7 * 24 * 60 * 60 * 1000),
        ),
        alertSent: false,
      };
    case AlertType.CUSTOM:
    case "CUSTOM": {
      const custom = toDate(customAlertDate ?? undefined);
      if (!custom) {
        return { alertAt: null, alertSent: false };
      }
      return { alertAt: toKstOffsetIsoString(custom), alertSent: false };
    }
    default:
      return { alertAt: null, alertSent: false };
  }
}
