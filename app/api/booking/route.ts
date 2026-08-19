import { NextResponse } from "next/server";

/**
 * Discovery-call enquiries.
 *
 * This is deliberately a stub: it validates and logs, and nothing more. The
 * UI contract around it is real, so wiring a provider later is a change to
 * `deliver()` alone — the client, the validation, and the response shape all
 * stay as they are.
 *
 * TODO: deliver to a real destination (Resend/Postmark for email, or hand off
 * to Cal.com / Acuity for the 15-minute discovery event type).
 */

type Errors = Partial<Record<"name" | "email", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX = { name: 120, email: 200, message: 4000 } as const;

type Enquiry = { name: string; email: string; message?: string };

function validate(body: unknown): { data?: Enquiry; errors: Errors } {
  const errors: Errors = {};
  if (typeof body !== "object" || body === null) {
    return { errors: { name: "Invalid request body." } };
  }

  const { name, email, message } = body as Record<string, unknown>;

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (!cleanName) errors.name = "Please tell me your name.";
  else if (cleanName.length > MAX.name) errors.name = "That name is too long.";

  if (!cleanEmail) errors.email = "I need an email address to reply to.";
  else if (!EMAIL.test(cleanEmail) || cleanEmail.length > MAX.email)
    errors.email = "That doesn't look like an email address.";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    data: {
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage ? cleanMessage.slice(0, MAX.message) : undefined,
    },
    errors: {},
  };
}

async function deliver(enquiry: Enquiry): Promise<void> {
  // Replace with the real transport. Kept as a named seam so the swap is obvious.
  console.info("[booking] enquiry received", {
    name: enquiry.name,
    email: enquiry.email,
    hasMessage: Boolean(enquiry.message),
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { name: "Invalid request body." } },
      { status: 400 },
    );
  }

  const { data, errors } = validate(body);
  if (!data) return NextResponse.json({ ok: false, errors }, { status: 400 });

  try {
    await deliver(data);
  } catch (error) {
    console.error("[booking] delivery failed", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
