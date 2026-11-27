import type { Metadata } from "next";
import { TextField } from "@/features/auth/components/text-field";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-3 text-base text-muted">Pick up where you left off.</p>

      <div className="mt-8 space-y-5">
        <TextField label="Email" type="email" placeholder="you@example.com" />

        {/* TEMPORARY: a preview of the error look. We delete this in Step 3. */}
        <TextField label="Email (error preview)" type="email" defaultValue="abc" error="That doesn't look like an email address" />
      </div>
    </>
  );
}