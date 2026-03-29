import db from "@/shared/lib/db";
import { configureWebPush, webpush } from "@/shared/lib/webPushServer";
import { AlertType } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function verifyCronAuth(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  try {
    if (!process.env.CRON_SECRET) {
      return NextResponse.json(
        { error: "CRON_SECRET is not set in environment variables" },
        { status: 500 },
      );
    }

    if (!verifyCronAuth(req)) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          hint: "Use: curl -H \"Authorization: Bearer YOUR_SECRET\" ... (copy CRON_SECRET from .env, not the placeholder text)",
        },
        { status: 401 },
      );
    }

    try {
      configureWebPush();
    } catch (e) {
      console.error("web push config:", e);
      return NextResponse.json(
        { error: "VAPID keys not configured", detail: String(e) },
        { status: 500 },
      );
    }

    const nowMs = Date.now();

    const candidates = await db.link.findMany({
      where: {
        alertSent: false,
        alertType: { not: AlertType.NONE },
        alertAt: { not: null },
      },
      include: { user: true },
    });

    const dueLinks = candidates.filter((link) => {
      if (!link.alertAt) return false;
      const t = new Date(link.alertAt).getTime();
      return !Number.isNaN(t) && t <= nowMs;
    });

    let sent = 0;
    let failed = 0;

    let skippedNoSubscription = 0;

    for (const link of dueLinks) {
      const subscriptions = await db.pushSubscription.findMany({
        where: { userId: link.userId },
      });

      if (subscriptions.length === 0) {
        skippedNoSubscription += 1;
        continue;
      }

      const payload = JSON.stringify({
        title: "LinkKeeper",
        body: `"${link.title}" 링크를 확인할 시간입니다.`,
        url: link.url,
        icon: "/favicon.ico",
      });

      let anyPushOk = false;

      for (const sub of subscriptions) {
        const pushSub = {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        };

        try {
          await webpush.sendNotification(pushSub, payload, {
            TTL: 60 * 60,
          });
          sent += 1;
          anyPushOk = true;
        } catch (err: unknown) {
          failed += 1;
          const statusCode =
            err && typeof err === "object" && "statusCode" in err
              ? (err as { statusCode?: number }).statusCode
              : undefined;
          if (statusCode === 410) {
            await db.pushSubscription.delete({
              where: { endpoint: sub.endpoint },
            });
          }
          console.error("webpush send error:", err);
        }
      }

      if (!anyPushOk) {
        continue;
      }

      await db.notification.create({
        data: {
          userId: link.userId,
          linkId: link.id,
          alertType: link.alertType,
          message: `"${link.title}" 알림`,
        },
      });

      await db.link.update({
        where: { id: link.id },
        data: { alertSent: true },
      });
    }

    return NextResponse.json({
      dueCount: dueLinks.length,
      pushAttempts: sent,
      pushFailures: failed,
      skippedNoSubscription,
    });
  } catch (e) {
    console.error("[cron/send-notifications]", e);
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
