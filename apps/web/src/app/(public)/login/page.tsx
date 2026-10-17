import { Suspense } from "react";
import { AuthForm } from "@/features/auth/components/auth-form";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <section className="space-y-6 pt-12">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <Suspense>
        <AuthForm mode="login" />
      </Suspense>
    </section>
  );
}