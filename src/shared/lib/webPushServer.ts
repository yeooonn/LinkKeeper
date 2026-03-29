import webpush from "web-push";

let configured = false;

export function configureWebPush(): void {
  if (configured) return;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const contact =
    process.env.VAPID_CONTACT_EMAIL ?? "mailto:noreply@linkkeeper.local";

  if (!publicKey || !privateKey) {
    throw new Error(
      "NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY must be set",
    );
  }

  webpush.setVapidDetails(contact, publicKey, privateKey);
  configured = true;
}

export { webpush };
