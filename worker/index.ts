interface Env {
  TURNSTILE_SECRET_KEY: string;
  TELEGRAM_TOKEN: string;
  TELEGRAM_TO: string;
}

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  turnstileToken?: string;
}

const ALLOWED_ORIGIN = "https://tuanitpro.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let body: ContactBody;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request body" }, 400);
    }

    const { name, email, subject, message, turnstileToken } = body;

    if (!turnstileToken) {
      return json({ error: "Missing Turnstile token" }, 400);
    }

    // Verify Turnstile token server-side
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
        }),
      }
    );

    const { success } = (await verifyRes.json()) as { success: boolean };
    if (!success) {
      return json({ error: "Turnstile verification failed" }, 403);
    }

    // Forward message to Telegram
    const text = [
      `New message from ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Message: ${message}`,
    ].join("\n");

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_TO, text }),
      }
    );

    if (!telegramRes.ok) {
      return json({ error: "Failed to deliver message" }, 502);
    }

    return json({ ok: true }, 200);
  },
};
