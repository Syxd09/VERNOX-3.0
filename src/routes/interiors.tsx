import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";

import { StoreHeader } from "@/components/store-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import interiorImage from "@/assets/abstract-painting.jpg";

export const Route = createFileRoute("/interiors")({
  head: () => ({
    meta: [
      { title: "Interior Design — FORMA Studio" },
      { name: "description", content: "Work with FORMA Studio on a considered interior, from an art consultation to a complete room design." },
      { property: "og:title", content: "Interior Design — FORMA Studio" },
      { property: "og:description", content: "Thoughtful interior design, shaped around the pieces you love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Interiors,
});

const services = [
  { number: "01", title: "Art consultation", copy: "Find the right work for your wall, your light, and the way you live." },
  { number: "02", title: "Room refresh", copy: "Thoughtful edits to color, layout, lighting, and the pieces already at home." },
  { number: "03", title: "Full-service interiors", copy: "A considered direction from first sketches to the last object in place." },
];

function Interiors() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <StoreHeader />
      <section className="relative flex min-h-[470px] items-end overflow-hidden bg-muted sm:min-h-[570px]">
        <img src={interiorImage} alt="Original artwork in a serene, thoughtfully styled room" width={1008} height={1200} fetchPriority="high" className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/5 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-10 text-background sm:px-10 sm:pb-14 lg:px-16">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs text-background/80"><ArrowLeft aria-hidden="true" className="size-3.5" /> Back to the collection</Link>
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-background/80">FORMA Studio · Interior design</p>
          <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">Spaces with a point of view.</h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-background/85 sm:text-base">Personal interiors, grounded in good art, honest materials, and the way you want to feel at home.</p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 border-b border-border pb-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">A thoughtful process · 01</p>
              <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">Good rooms feel like you.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">We bring art and interiors together from the first conversation. Whether one wall needs a point of view or a whole home is ready for a new chapter, the process begins with what matters to you.</p>
          </div>
          <div className="grid gap-0 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="border-b border-border py-7 md:border-b-0 md:border-r md:py-9 md:pr-7 md:[&:not(:first-child)]:pl-7 md:[&:last-child]:border-r-0">
                <p className="text-[10px] tracking-[0.15em] text-muted-foreground">{service.number}</p>
                <h3 className="mt-5 font-display text-xl font-medium">{service.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Let’s begin · 02</p>
            <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">Tell us about your space.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">Share a little about what you have in mind. We’ll shape the next conversation around your room and your priorities.</p>
            <div className="mt-9 border-t border-border pt-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Project journey</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>Discover</span><ArrowRight aria-hidden="true" className="size-3" /><span>Design</span><ArrowRight aria-hidden="true" className="size-3" /><span>Source</span><ArrowRight aria-hidden="true" className="size-3" /><span>Make it home</span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="flex min-h-80 flex-col items-start justify-center border-y border-border py-10" role="status">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check aria-hidden="true" className="size-5" /></span>
              <h3 className="mt-5 font-display text-2xl font-medium">Thank you for the introduction.</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Your details are shown here for the preview only; this form is not connected to an inbox.</p>
              <Button variant="outline" className="mt-5" onClick={() => setSubmitted(false)}>Edit your enquiry</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2"><Label htmlFor="client-name">Your name</Label><Input id="client-name" name="name" placeholder="Name" required /></div>
                <div className="grid gap-2"><Label htmlFor="client-email">Email address</Label><Input id="client-email" name="email" type="email" placeholder="you@example.com" required /></div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-type">I’m interested in</Label>
                <div className="relative"><select id="project-type" name="project" defaultValue="" required className="h-10 w-full appearance-none border border-input bg-background px-3 pr-10 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="" disabled>Choose a project type</option><option>Art consultation</option><option>Room refresh</option><option>Full-service interiors</option></select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /></div>
              </div>
              <div className="grid gap-2"><Label htmlFor="project-notes">A little about your space</Label><Textarea id="project-notes" name="notes" placeholder="Room, timing, and what you would love to change…" rows={4} /></div>
              <Button type="submit" className="h-11 w-full justify-between sm:w-fit sm:min-w-60">Request a consultation <ArrowRight aria-hidden="true" className="size-4" /></Button>
              <p className="text-[10px] leading-5 text-muted-foreground">Preview enquiry only. Submission does not send or store your details.</p>
            </form>
          )}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sourcing & visualization</p><p className="mt-2 text-sm text-muted-foreground">Partner connections are not configured in this frontend preview.</p></div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm">Return to art & objects <ArrowRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </section>

      <footer className="bg-primary px-5 py-8 text-primary-foreground sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 text-xs sm:flex-row"><span className="font-display tracking-[0.12em]">FORMA STUDIO</span><span className="text-primary-foreground/60">Interior design · Preview experience</span></div></footer>
    </main>
  );
}