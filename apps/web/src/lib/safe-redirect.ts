/** Only allow redirects to paths on THIS site (prevents open-redirect attacks). */
export function safeRedirectPath(value: string | null, fallback = "/explore"): string {
    if (!value) return fallback;
    if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
    return value;
  }