"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactValues } from "@/features/landing/contact-schema";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-primary/40";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactValues) {
    setServerError(null);

    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
      return;
    }

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setServerError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    reset();
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-4">
        <h3 className="text-xl font-semibold">Message sent. Thank you!</h3>
        <p className="text-muted">We&apos;ve received it and will get back to you by email.</p>
        <Button variant="secondary" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name?.message}>
          <input
            id="contact-name"
            {...register("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="contact-phone" label="Phone" optional error={errors.phone?.message}>
          <input
            id="contact-phone"
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="contact-email" label="Email" error={errors.email?.message}>
        <input
          id="contact-email"
          {...register("email")}
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={inputClass}
        />
      </Field>

      {/* honeypot: hidden from people, bots fill it in */}
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {serverError && (
        <p role="alert" className="text-sm text-danger">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}