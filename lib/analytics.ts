/**
 * Sends contact events to the Google tag installed in app/[locale]/layout.tsx.
 * WhatsApp clicks also send Google's configured conversion_event_contact_1.
 * This measures opening WhatsApp, not a message being sent.
 */

type ConversionEvent =
  | 'quote_request_submit'
  | 'quote_request_success'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click';

declare global {
  interface Window {
    dataLayer?: (Record<string, unknown> | IArguments)[];
    gtag?: (command: 'event', event: string, params: Record<string, unknown>) => void;
  }
}

export function track(event: ConversionEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // Queue early clicks even if the asynchronously loaded tag is not ready yet.
  window.gtag = window.gtag || function () {
    // Google's command queue uses Arguments objects, matching the installed snippet.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  // Only send reporting metadata, not contact URLs or pre-filled messages.
  const metadata: Record<string, unknown> = {};
  for (const key of ['source', 'service']) {
    if (typeof params[key] === 'string') metadata[key] = params[key];
  }
  window.gtag('event', event, { ...metadata, send_to: 'G-GL4QQW6ZFY' });

  if (event === 'whatsapp_click') {
    // Match the event name supplied by Google's manual conversion setup.
    // WhatsApp opens in a new tab, so the website stays open to send the event;
    // a delayed window.location callback would also redirect the original tab.
    window.gtag('event', 'conversion_event_contact_1', {
      ...metadata,
      event_timeout: 2000,
    });
  }
}
