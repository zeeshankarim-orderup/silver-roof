import type { Dictionary } from '@/i18n/dictionaries';

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  /** Honeypot - real people leave it empty. */
  company?: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

/** Saudi mobile, landline or international - deliberately permissive. */
const PHONE_RE = /^[+\d][\d\s()-]{7,19}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims a value that is supposed to be a string but may be anything. */
export const str = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

/**
 * Shared by the form and the API route, so the browser and the server never
 * disagree about what counts as valid.
 */
export function validateContact(
  values: ContactPayload,
  messages: Dictionary['contact']['form']['errors'],
): ContactErrors {
  const errors: ContactErrors = {};
  // The API route validates whatever JSON arrives, so never assume the fields
  // are present or are strings.
  const name = str(values?.name);
  const phone = str(values?.phone);
  const email = str(values?.email);
  const message = str(values?.message);

  if (!name) errors.name = messages.nameRequired;
  else if (name.length < 2) errors.name = messages.nameShort;

  if (!phone) errors.phone = messages.phoneRequired;
  else if (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 9) {
    errors.phone = messages.phoneInvalid;
  }

  if (email && !EMAIL_RE.test(email)) errors.email = messages.emailInvalid;

  if (!message) errors.message = messages.messageRequired;
  else if (message.length < 10) errors.message = messages.messageShort;

  return errors;
}
