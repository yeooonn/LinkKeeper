import db from "@/shared/lib/db";
import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const subscriptionSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const parsed = subscriptionSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid subscription payload" },
        { status: 400 },
      );
    }

    const { endpoint, keys } = parsed.data;

    await db.pushSubscription.upsert({
      where: { endpoint },
      create: {
        userId: user.id,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      update: {
        userId: user.id,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("push subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to save subscription" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (endpoint) {
      const existing = await db.pushSubscription.findUnique({
        where: { endpoint },
      });
      if (existing && existing.userId === user.id) {
        await db.pushSubscription.delete({ where: { endpoint } });
      }
    } else {
      await db.pushSubscription.deleteMany({ where: { userId: user.id } });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("push unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to remove subscription" },
      { status: 500 },
    );
  }
}
