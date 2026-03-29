function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function getPushPermissionStatus(): NotificationPermission {
  if (typeof window === "undefined") return "denied";
  if (typeof Notification === "undefined") return "denied";
  return Notification.permission;
}

export async function subscribePushSubscription(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return false;
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey) {
    console.warn("NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set");
    return false;
  }

  const registration = await navigator.serviceWorker.ready;

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
    });
  }

  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(subscription.toJSON()),
  });

  return res.ok;
}

/**
 * 로그인 직후: 권한이 없으면 요청하고, 허용 시 구독 저장.
 */
export async function subscribeToPushOnLogin(): Promise<void> {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

  try {
    await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
  } catch (e) {
    console.error("Service worker registration failed:", e);
    return;
  }

  const status = getPushPermissionStatus();
  if (status === "denied") return;

  if (status === "default") {
    const result = await Notification.requestPermission();
    if (result !== "granted") return;
  }

  await subscribePushSubscription();
}

/**
 * 링크 알림 설정(step 2)에서 호출: 이미 거부된 경우 false.
 */
export async function ensurePushPermissionFromAlertFlow(): Promise<boolean> {
  const status = getPushPermissionStatus();

  if (status === "granted") {
    return subscribePushSubscription();
  }

  if (status === "denied") {
    return false;
  }

  const ok = window.confirm(
    "알림을 받으려면 브라우저 알림을 허용해야 합니다. 허용하시겠습니까?",
  );
  if (!ok) return false;

  const result = await Notification.requestPermission();
  if (result !== "granted") return false;

  return subscribePushSubscription();
}
