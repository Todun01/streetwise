import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { AlertIcon } from "./icons";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  /** The words above the box. Every box needs one: placeholders are not labels. */
  label: string;
  /** If set, the box turns red and this message appears underneath. */
  error?: string;
  /** Optional helper text underneath (hidden while there is an error). */
  hint?: string;
};

/**
 * A labelled text box with room for an error message.
 *
 * It uses forwardRef so that a form library can reach the real <input> inside it (we need that in Step 3).
 * Everything else you put on it (type, placeholder, autoComplete...) is passed straight to the <input>.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, hint, id, className = "", ...props },
  ref,
) {
  // an automatic unique id, so the label and the message can be tied to the box
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>

      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        className={`min-h-12 w-full rounded-xl border bg-surface px-4 text-base outline-none transition placeholder:text-muted/60 focus:ring-4 ${
          error ? "border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/25"
        } ${className}`}
        {...props}
      />

      {error ? (
        <p id={messageId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
          <AlertIcon className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});