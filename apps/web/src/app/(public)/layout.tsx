import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto min-h-dvh max-w-md p-6">{children}</div>;
}