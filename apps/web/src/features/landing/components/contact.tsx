import { Section } from "@/components/marketing/section";
import { ContactForm } from "@/features/landing/components/contact-form";
import { site } from "@/lib/site";

const label = "text-sm text-muted";
const link = "font-medium transition-colors hover:text-accent";

export function Contact() {
  const { name, phone, email, whatsapp } = site.contact;
  const phoneHref = phone.replace(/[^\d+]/g, ""); // "+234 800 000 0000" -> "+2348000000000"

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Questions or ideas? Talk to us."
      intro="Spot suggestions, feedback, or partnership ideas. We'd love to hear from you."
      className="border-t border-border bg-surface"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <aside aria-label="Contact details" className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          <h3 className="text-xl font-semibold">Get in touch</h3>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className={label}>Name</dt>
              <dd className="mt-0.5 font-medium">{name}</dd>
            </div>
            <div>
              <dt className={label}>Phone</dt>
              <dd className="mt-0.5">
                <a href={`tel:${phoneHref}`} className={link}>{phone}</a>
              </dd>
            </div>
            <div>
              <dt className={label}>Email</dt>
              <dd className="mt-0.5 break-words">
                <a href={`mailto:${email}`} className={link}>{email}</a>
              </dd>
            </div>
            {whatsapp && (
              <div>
                <dt className={label}>WhatsApp</dt>
                <dd className="mt-0.5">
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className={link}>
                    Message us directly
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </aside>

        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}