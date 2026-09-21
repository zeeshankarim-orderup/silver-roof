/**
 * Marketing event shim.
 *
 * No tags are installed yet - on purpose. This pushes to the dataLayer when a
 * container exists and is a no-op otherwise, so GTM / Google Ads / Meta Pixel
 * can be added later without touching any component.
 *
 * To switch it on:
 *   1. Add the GTM or gtag snippet in app/[locale]/layout.tsx via next/script.
 *   2. Set NEXT_PUBLIC_GTM_ID in .env.local.
 *   3. Map these event names to conversions in Ads Manager / Google Ads.
 */

type ConversionEvent =
  | 'quote_request_submit'
  | 'quote_request_success'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: ConversionEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
