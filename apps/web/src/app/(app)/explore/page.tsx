import { createClient } from "@/lib/supabase/server";

export default async function ExplorePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Explore</h1>
      <p className="mt-2">Signed in as: {user?.email ?? "nobody"}</p>
    </main>
  );
}