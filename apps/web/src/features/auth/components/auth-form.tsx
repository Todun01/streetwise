"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { safeRedirectPath } from "@/lib/safe-redirect";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
  username: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const next = safeRedirectPath(useSearchParams().get("next"));
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    setFormError(null);
    setNotice(null);

    if (mode === "signup" && !/^[a-zA-Z0-9_]{3,24}$/.test(values.username ?? "")) {
      setError("username", { message: "3–24 characters: letters, numbers, underscores" });
      return;
    }

    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) return setFormError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: { data: { username: values.username } },
      });
      if (error) return setFormError(error.message);
      if (!data.session) {
        // Happens when "Confirm email" is on: no session until they click the link.
        return setNotice("Check your email to confirm your account, then sign in.");
      }
    }

    router.replace(next);
    router.refresh();
  }

  const input =
    "w-full rounded-lg border border-neutral-300 px-3 py-2 text-base dark:border-neutral-700 dark:bg-neutral-900";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {mode === "signup" && (
        <div>
          <input {...register("username")} placeholder="Username" autoComplete="username" className={input} />
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
        </div>
      )}

      <div>
        <input {...register("email")} type="email" placeholder="Email" autoComplete="email" className={input} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className={input}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
      {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </Button>
    </form>
  );
}