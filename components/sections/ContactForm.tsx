'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';
import type { Dictionary } from '@/i18n/dictionaries';
import { track } from '@/lib/analytics';
import { EASE } from '@/lib/motion';
import { whatsappHref } from '@/lib/site';
import { validateContact, type ContactErrors, type ContactPayload } from '@/lib/validation';
import { cn } from '@/lib/utils';
import type { FormStatus } from '@/types';

const EMPTY: ContactPayload = { name: '', phone: '', email: '', service: '', message: '', company: '' };

const fieldClass =
  'w-full rounded-frame border border-graphite-900/15 bg-bone px-4 py-3 text-[0.95rem] ' +
  'text-graphite-900 placeholder:text-graphite-400 transition-colors duration-300 ' +
  'focus:border-graphite-900 focus:outline-none';

export function ContactForm({ dict }: { dict: Dictionary }) {
  const copy = dict.contact.form;
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const uid = useId();

  const setField = (field: keyof ContactPayload) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the error as soon as the person starts fixing the field.
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContact(values, copy.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem so screen readers announce it.
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }

    setStatus('submitting');
    track('quote_request_submit', { service: values.service || 'unspecified' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { ok?: boolean; code?: string };

      if (response.status === 501 || data.code === 'NOT_CONFIGURED') {
        // No delivery endpoint is wired up. Say so rather than showing a
        // success screen for a message nobody will receive.
        setStatus('unconfigured');
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus('error');
        return;
      }

      track('quote_request_success', { service: values.service || 'unspecified' });
      setValues(EMPTY);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success' || status === 'unconfigured') {
    const isSuccess = status === 'success';
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        role="status"
        className="flex h-full flex-col justify-center rounded-frame border border-graphite-900/12 bg-bone p-8 shadow-frame lg:p-10"
      >
        {isSuccess ? (
          <CheckCircle2 className="h-10 w-10 text-brass-500" aria-hidden="true" />
        ) : (
          <Info className="h-10 w-10 text-graphite-400" aria-hidden="true" />
        )}

        <h3 className="mt-6 font-display text-2xl font-normal text-graphite-900">
          {isSuccess ? copy.successTitle : copy.unconfiguredTitle}
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-graphite-500">
          {isSuccess ? copy.successBody : copy.unconfiguredBody}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={whatsappHref(dict.cta.whatsappMessage)}
            variant="whatsapp"
            trackAs="whatsapp_click"
          >
            {dict.common.whatsapp}
          </Button>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            {copy.sendAnother}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-frame border border-graphite-900/12 bg-bone p-6 shadow-frame sm:p-8 lg:p-10"
    >
      <h3 className="font-display text-2xl font-normal text-graphite-900">{copy.heading}</h3>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label={copy.name}
          error={errors.name}
          className="sm:col-span-2"
        >
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => setField('name')(event.target.value)}
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={cn(fieldClass, errors.name && 'border-red-500/70')}
          />
        </Field>

        <Field id={`${uid}-phone`} label={copy.phone} error={errors.phone}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(event) => setField('phone')(event.target.value)}
            placeholder={copy.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
            className={cn(fieldClass, 'text-start', errors.phone && 'border-red-500/70')}
          />
        </Field>

        <Field
          id={`${uid}-email`}
          label={copy.email}
          hint={copy.emailOptional}
          error={errors.email}
        >
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setField('email')(event.target.value)}
            placeholder={copy.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={cn(fieldClass, 'text-start', errors.email && 'border-red-500/70')}
          />
        </Field>

        <Field id={`${uid}-service`} label={copy.service} className="sm:col-span-2">
          <select
            id={`${uid}-service`}
            name="service"
            value={values.service}
            onChange={(event) => setField('service')(event.target.value)}
            className={cn(fieldClass, 'appearance-none bg-bone')}
          >
            <option value="">{copy.servicePlaceholder}</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {dict.services.items[service.id as keyof typeof dict.services.items].title}
              </option>
            ))}
            <option value="other">{copy.serviceOther}</option>
          </select>
        </Field>

        <Field
          id={`${uid}-message`}
          label={copy.message}
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(event) => setField('message')(event.target.value)}
            placeholder={copy.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            className={cn(fieldClass, 'resize-y', errors.message && 'border-red-500/70')}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => setField('company')(event.target.value)}
        />
      </div>

      <AnimatePresence>
        {status === 'error' ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            role="alert"
            className="mt-6 flex gap-3 rounded-frame border border-red-500/30 bg-red-500/5 p-4"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
            <div>
              <p className="font-medium text-graphite-900">{copy.errorTitle}</p>
              <p className="mt-1 text-sm text-graphite-500">{copy.errorBody}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        type="submit"
        size="lg"
        className="mt-7 w-full"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {copy.submitting}
          </>
        ) : (
          copy.submit
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-sm text-graphite-600">
        {label}
        {hint ? <span className="text-xs text-graphite-400">({hint})</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
