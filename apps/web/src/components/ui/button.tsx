import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover disabled:opacity-50",
  secondary: "border border-border bg-surface text-foreground hover:border-accent disabled:opacity-50",
  danger: "bg-danger text-background hover:opacity-90 disabled:opacity-50",
};

/** The look of a button, usable on <button> AND on <Link>. */
export function buttonClasses(variant: Variant = "primary", className = "") {
  return `inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-base font-medium transition-colors disabled:cursor-not-allowed ${styles[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...props} className={buttonClasses(variant, className)} />;
}