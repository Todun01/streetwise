import { NextResponse } from "next/server";
import { contactSchema } from "@/features/landing/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // never trust the browser: validate again on the server
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const { website, ...data } = parsed.data;

  // honeypot: bots fill the hidden field. Pretend it worked, send nothing.
  if (website) return NextResponse.json({ ok: true });

  const url = process.env.CONTACT_API_URL;
  if (!url) {
    if (process.env.NODE_ENV === "development") {
      console.log("[contact] dev mode, not sent:", data);
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] CONTACT_API_URL is not set");
    return NextResponse.json(
      { error: "Messages can't be sent right now. Please email us instead." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_API_KEY
          ? { Authorization: `Bearer ${process.env.CONTACT_API_KEY}` }
          : {}),
      },
      // TODO: reshape this to whatever your email backend expects
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Email backend responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again, or email us directly." },
      { status: 502 },
    );
  }
}