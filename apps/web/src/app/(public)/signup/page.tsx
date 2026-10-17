import { Suspense } from "react";
import { AuthForm } from "@/features/auth/components/auth-form";

export const metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <section className="space-y-6 pt-12">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <Suspense>
        <AuthForm mode="signup" />
      </Suspense>
    </section>
  );
}