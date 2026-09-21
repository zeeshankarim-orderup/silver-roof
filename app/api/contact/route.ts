import { NextResponse } from 'next/server';
import { en } from '@/i18n/en';
import { str, validateContact, type ContactPayload } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Contact endpoint.
 *
 * There is no mail provider wired up yet, so when CONTACT_WEBHOOK_URL is unset
 * this returns 501 and the form tells the visitor to use WhatsApp instead of
 * showing a success screen for a message nobody will ever read.
 *
 * To switch it on, point CONTACT_WEBHOOK_URL at anything that accepts a JSON
 * POST (Formspree, n8n, Zapier, a CRM inbox), or replace the forward below with
 * a direct provider call such as Resend.
 */
export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, code: 'BAD_REQUEST' }, { status: 400 });
  }

  // Honeypot: report success to the bot, forward nothing.
  if (str(payload.company).length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation using the same rules as the browser.
  const errors = validateContact(payload, en.contact.form.errors);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: 'INVALID', errors }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    console.warn('[contact] CONTACT_WEBHOOK_URL is not set - nothing was sent.', {
      name: payload.name,
      phone: payload.phone,
      service: payload.service,
    });
    return NextResponse.json({ ok: false, code: 'NOT_CONFIGURED' }, { status: 501 });
  }

  try {
    const forwarded = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: str(payload.name),
        phone: str(payload.phone),
        email: str(payload.email),
        service: str(payload.service),
        message: str(payload.message),
        receivedAt: new Date().toISOString(),
        source: 'silverroof.sa/contact',
      }),
    });

    if (!forwarded.ok) {
      console.error('[contact] Delivery endpoint responded', forwarded.status);
      return NextResponse.json({ ok: false, code: 'DELIVERY_FAILED' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] Delivery failed', error);
    return NextResponse.json({ ok: false, code: 'DELIVERY_FAILED' }, { status: 502 });
  }
}
