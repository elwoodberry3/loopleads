import { CallStrip } from "@/components/CallStrip";
import { DemoForm } from "@/components/DemoForm";
import { CheckIcon, GreetIcon, HandsIcon, ListIcon, PlusIcon, QuestionIcon, SimpleIcon, ToolsIcon, TruckIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { MissedCallDemo } from "@/components/MissedCallDemo";
import { ScrollButton } from "@/components/ScrollButton";
import { PlayVideoButton, VideoPlayer } from "@/components/VideoPlayer";
import {
  audience,
  benefits,
  demo,
  faqs,
  finalCta,
  founder,
  hero,
  plans,
  problem,
  simplicity,
  site,
  solution,
  transcript,
} from "@/lib/content";

const benefitIcons = {
  hands: HandsIcon,
  why: QuestionIcon,
  greet: GreetIcon,
  list: ListIcon,
  tools: ToolsIcon,
  simple: SimpleIcon,
};

const FORM_ID = "book-demo";

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "LoopLeads",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: site.url,
      description: site.description,
      slogan: site.brandLine,
      audience: { "@type": "BusinessAudience", audienceType: "Junk removal and small field service businesses (1–3 person crews)" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-navy-900/8 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <a href="#main" className="block shrink-0" aria-label="LoopLeads home">
            <Logo className="h-[1.15rem] w-auto sm:h-[1.35rem]" />
          </a>
          <nav aria-label="Page" className="flex items-center gap-1 sm:gap-6">
            <a href="#how-it-works" className="hidden rounded px-1 text-base font-bold text-slate-500 hover:text-navy-900 md:inline">
              How it works
            </a>
            <a href="#plans" className="hidden rounded px-1 text-base font-bold text-slate-500 hover:text-navy-900 md:inline">
              Options
            </a>
            <a href="#faq" className="hidden rounded px-1 text-base font-bold text-slate-500 hover:text-navy-900 md:inline">
              Questions
            </a>
            <ScrollButton target={FORM_ID} className="btn btn-primary !min-h-11 !px-4 !py-2 !text-base">
              Book my demo
            </ScrollButton>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* 01 — Hero / VSL */}
        <section aria-labelledby="hero-title" className="bg-navy-700 text-white">
          <div className="shell pb-16 pt-10 sm:pb-24 sm:pt-14">
            <p className="text-base font-semibold text-ivory-500 sm:text-lg">{hero.eyebrow}</p>
            <h1 id="hero-title" className="type-hero mt-4 max-w-[19ch]">
              {hero.headline}
            </h1>

            <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <VideoPlayer
                  caption={hero.videoCaption}
                  transcript={
                    <div className="space-y-3">
                      {transcript.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  }
                />
              </div>

              <div className="lg:col-span-5">
                <CallStrip />
                <p className="type-lead mt-8 font-semibold">{hero.intro}</p>
                <p className="mt-4 text-lg leading-relaxed text-white/85">{hero.body}</p>
                <p className="mt-4 text-lg leading-relaxed text-white/85">{hero.kicker}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                  <ScrollButton target="how-it-works" className="btn btn-primary">
                    {hero.primaryCta}
                  </ScrollButton>
                  <PlayVideoButton className="btn btn-ghost-dark">{hero.secondaryCta}</PlayVideoButton>
                </div>
                <p className="mt-6 text-base leading-relaxed text-white/65">{hero.trust}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Problem */}
        <section aria-labelledby="problem-title" className="bg-white">
          <div className="shell grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="problem-title" className="type-h2">
                {problem.headline}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-[1.22] text-slate-500 [font-stretch:106%]">
                {problem.places.join(" ")}
              </p>
              <p className="mt-6 font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold leading-[1.22] [font-stretch:112%]">
                {problem.beats.map((b) => (
                  <span key={b} className="block">
                    {b}
                  </span>
                ))}
              </p>
              <div className="measure mt-8 space-y-4 text-lg leading-relaxed">
                {problem.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-10 border-l-4 border-orange-500 pl-5 text-xl font-bold leading-snug">{problem.pullquote}</p>
              <ul className="measure mt-8 space-y-3 text-lg leading-relaxed text-slate-500">
                {problem.shouldnts.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-8 text-xl font-bold">{problem.close}</p>
            </div>
          </div>
        </section>

        {/* 03 — Solution */}
        <section id="how-it-works" aria-labelledby="solution-title" className="scroll-mt-16 bg-neutral-200">
          <div className="shell py-20 sm:py-28">
            <div className="grid gap-8 lg:grid-cols-12">
              <h2 id="solution-title" className="type-h2 lg:col-span-6">
                {solution.headline}
              </h2>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="text-lg leading-relaxed">{solution.body}</p>
                <p className="mt-4 text-lg font-bold leading-relaxed">{solution.promise}</p>
              </div>
            </div>
            <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {solution.steps.map((s, i) => (
                <li key={s.title} className="border-t-[3px] border-navy-900 pt-5">
                  <span className="font-display text-[2.6rem] font-extrabold leading-none text-navy-900/25 [font-stretch:120%]" aria-hidden>
                    {i + 1}
                  </span>
                  <h3 className="type-h3 mt-3">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-500">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14">
              <ScrollButton target="demo" className="btn btn-ghost-light">
                {solution.cta}
              </ScrollButton>
            </div>
          </div>
        </section>

        {/* 04 — Product demonstration */}
        <section id="demo" aria-labelledby="demo-title" className="scroll-mt-16 bg-white">
          <div className="shell py-20 sm:py-28">
            <div className="grid gap-8 lg:grid-cols-12">
              <h2 id="demo-title" className="type-h2 lg:col-span-7">
                {demo.headline}
              </h2>
              <div className="space-y-2 text-lg leading-relaxed lg:col-span-5">
                {demo.setup.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="mt-14">
              <MissedCallDemo />
            </div>
            <div className="mt-16 grid gap-6 border-t border-navy-900/10 pt-10 lg:grid-cols-12">
              <p className="text-xl font-bold lg:col-span-4">{demo.outcome}</p>
              <p className="measure text-lg leading-relaxed lg:col-span-5">{demo.outcomeBold}</p>
              <div className="lg:col-span-3 lg:flex lg:justify-end">
                <ScrollButton target={FORM_ID} className="btn btn-primary lg:whitespace-nowrap lg:!px-5">
                  {demo.cta}
                </ScrollButton>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Benefits */}
        <section aria-labelledby="benefits-title" className="bg-neutral-100">
          <div className="shell py-20 sm:py-28">
            <h2 id="benefits-title" className="type-h2 max-w-[22ch]">
              {benefits.headline}
            </h2>
            <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {benefits.items.map((b) => {
                const Icon = benefitIcons[b.icon];
                return (
                  <li key={b.title} className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-neutral-200 text-navy-900">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="type-h3">{b.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-slate-500">{b.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 06 — Who it's for */}
        <section aria-labelledby="audience-title" className="bg-white">
          <div className="shell py-20 sm:py-28">
            <div className="grid gap-6 lg:grid-cols-12">
              <h2 id="audience-title" className="type-h2 lg:col-span-7">
                {audience.headline}
              </h2>
              <p className="text-lg leading-relaxed lg:col-span-4 lg:col-start-9 lg:pt-3">{audience.intro}</p>
            </div>
            <div className="mt-14 grid gap-10 lg:grid-cols-12">
              <div className="rounded-[18px] bg-navy-900 p-7 text-white sm:p-10 lg:col-span-5">
                <TruckIcon className="size-10 text-orange-500" />
                <h3 className="mt-6 font-display text-[2.2rem] font-extrabold leading-none [font-stretch:118%]">{audience.featured.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/85">{audience.featured.body}</p>
                <p className="mt-6 border-t border-white/15 pt-5 text-base font-semibold text-ivory-500">{audience.featured.note}</p>
              </div>
              <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
                {audience.others.map((o) => (
                  <div key={o.title}>
                    <dt className="type-h3">{o.title}</dt>
                    <dd className="mt-2 text-base leading-relaxed text-slate-500">{o.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-14 max-w-[48ch] text-xl font-bold leading-snug">{audience.close}</p>
          </div>
        </section>

        {/* 07 — Simplicity */}
        <section aria-labelledby="simple-title" className="bg-neutral-100">
          <div className="shell grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="simple-title" className="type-h2">
                {simplicity.headline}
              </h2>
              <div className="mt-8 space-y-3 text-lg leading-relaxed">
                {simplicity.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="divide-y divide-navy-900/10 border-y border-navy-900/10">
                {simplicity.points.map((pt) => (
                  <li key={pt.label} className="grid gap-1 py-6 sm:grid-cols-[12rem_1fr] sm:gap-6">
                    <span className="font-display text-lg font-bold [font-stretch:106%]">{pt.label}</span>
                    <span className="text-base leading-relaxed text-slate-500">{pt.body}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xl font-bold leading-snug">{simplicity.close}</p>
              <div className="mt-8">
                <ScrollButton target={FORM_ID} className="btn btn-primary">
                  {simplicity.cta}
                </ScrollButton>
              </div>
            </div>
          </div>
        </section>

        {/* 08 — Product options */}
        <section id="plans" aria-labelledby="plans-title" className="scroll-mt-16 bg-neutral-200">
          <div className="shell py-20 sm:py-28">
            <h2 id="plans-title" className="type-h2 max-w-[20ch]">
              {plans.headline}
            </h2>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {/* Light — available now: solid, orange-topped */}
              <article className="flex flex-col rounded-[18px] border-t-[6px] border-orange-500 bg-white p-7 sm:p-10">
                <p className="text-base font-bold text-success-600">{plans.light.status}</p>
                <h3 className="mt-3 font-display text-[2rem] font-extrabold leading-none [font-stretch:115%]">{plans.light.name}</h3>
                <p className="mt-2 text-lg font-semibold">{plans.light.tagline}</p>
                <p className="mt-4 text-base leading-relaxed text-slate-500">{plans.light.body}</p>
                <ul className="mt-6 space-y-3">
                  {plans.light.features.map((f) => (
                    <li key={f} className="flex gap-3 text-base">
                      <CheckIcon className="mt-0.5 size-5 shrink-0 text-navy-900" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9">
                  <ScrollButton target={FORM_ID} plan="light" className="btn btn-primary w-full sm:w-auto">
                    {plans.light.cta}
                  </ScrollButton>
                </div>
              </article>

              {/* Core — planned: open, dashed outline */}
              <article className="flex flex-col rounded-[18px] border-2 border-dashed border-slate-500/45 p-7 sm:p-10">
                <p className="text-base font-bold text-slate-500">{plans.core.status}</p>
                <h3 className="mt-3 font-display text-[2rem] font-extrabold leading-none [font-stretch:115%]">{plans.core.name}</h3>
                <p className="mt-2 text-lg font-semibold">{plans.core.tagline}</p>
                <p className="mt-4 text-base leading-relaxed text-slate-500">{plans.core.body}</p>
                <p className="mt-6 text-base font-bold">{plans.core.lead}</p>
                <ul className="mt-3 space-y-3">
                  {plans.core.features.map((f) => (
                    <li key={f} className="flex gap-3 text-base">
                      <PlusIcon className="mt-0.5 size-5 shrink-0 text-slate-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm italic leading-relaxed text-ink-muted">{plans.core.fineprint}</p>
                <div className="mt-auto pt-9">
                  <ScrollButton target={FORM_ID} plan="core" className="btn btn-ghost-light w-full sm:w-auto">
                    {plans.core.cta}
                  </ScrollButton>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 09 — Founder program */}
        <section aria-labelledby="founder-title" className="bg-navy-900 text-white">
          <div className="shell py-20 sm:py-28">
            <div className="grid gap-8 lg:grid-cols-12">
              <h2 id="founder-title" className="type-h2 lg:col-span-6">
                {founder.headline}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-white/85 lg:col-span-5 lg:col-start-8">
                {founder.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <h3 className="mt-16 text-lg font-bold text-ivory-500">{founder.stepsLead}</h3>
            <ol className="mt-6 grid gap-6 md:grid-cols-3">
              {founder.steps.map((s, i) => (
                <li key={s.title} className="rounded-[14px] bg-white/6 p-6 ring-1 ring-white/10 sm:p-7">
                  <span className="font-display text-base font-bold text-orange-500">Step {i + 1}</span>
                  <h4 className="type-h3 mt-2 text-white">{s.title}</h4>
                  <p className="mt-2 text-base leading-relaxed text-white/80">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
              <ScrollButton target={FORM_ID} className="btn btn-primary">
                {founder.cta}
              </ScrollButton>
              <p className="max-w-[46ch] text-base leading-relaxed text-white/70">{founder.reassurance}</p>
            </div>
          </div>
        </section>

        {/* 10 — FAQ */}
        <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 bg-neutral-100">
          <div className="shell grid gap-10 py-20 sm:py-28 lg:grid-cols-12">
            <h2 id="faq-title" className="type-h2 lg:col-span-4">
              Questions owners ask us
            </h2>
            <div className="lg:col-span-8">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-navy-900/12 first:border-t">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-bold leading-snug [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <PlusIcon className="mt-1 size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="measure pb-6 text-lg leading-relaxed text-slate-500">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 11 — Final conversion + demo request form */}
        <section id={FORM_ID} aria-labelledby="final-title" className="scroll-mt-16 bg-navy-700 text-white">
          <div className="shell grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 id="final-title" className="type-h2">
                {finalCta.headline}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/85">{finalCta.body}</p>
              <ul className="mt-6 space-y-2 text-lg leading-relaxed text-white/85">
                {finalCta.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="mt-10 font-display text-[1.75rem] font-extrabold leading-tight text-ivory-500 [font-stretch:112%]">
                {finalCta.punch}
              </p>
              <p className="mt-6 text-base leading-relaxed text-white/70">{finalCta.microcopy}</p>
            </div>
            <div className="lg:col-span-7">
              <DemoForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-900 text-white/70">
        <div className="shell flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo tone="onDark" className="h-5 w-auto" />
            <p className="mt-4 text-base text-ivory-500">{site.brandLine}</p>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} LoopLeads, a product of Adbyrd. Pilot program; features subject to availability.</p>
        </div>
      </footer>
    </>
  );
}
