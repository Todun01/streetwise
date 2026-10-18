import { Section } from "@/components/marketing/section";

const STEPS = [
  {
    title: "Discover",
    body: "Browse street food spots around you that you won't find on other maps, with photos, opening hours and ratings.",
  },
  {
    title: "Unlock and walk",
    body: "Pay a small fee per trip, or subscribe for more. Get directions to the exact spot and walk over.",
  },
  {
    title: "Contribute and earn",
    body: "Found a hidden gem? Capture it on the spot. Once it's approved, you earn real money as a reward.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From curious to fed in three steps"
      className="border-y border-border bg-surface"
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-border bg-background p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}