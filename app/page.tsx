import { ArrowUpRight } from 'lucide-react';
import { Architecture } from '@/components/Figures';
import { ProjectRow } from '@/components/ProjectRow';
import { profile } from '@/data/profile';
import { endToEndChecks, projects, totalTests } from '@/data/projects';

const NAV = [
  { href: '#projects', label: 'Projects' },
  { href: '#fit', label: 'How they fit' },
  { href: '#checks', label: 'Checks' },
  { href: '#about', label: 'About' },
] as const;

const linkBtn = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 text-base font-medium transition-colors duration-150 lg:text-sm';

const SKILLS: Array<[string, string]> = [
  ['Front end', 'React, Next.js, TypeScript, Tailwind CSS'],
  ['Back end', 'Node.js, Fastify, Express, PostgreSQL, Redis, BullMQ, Socket.io'],
  ['Blockchain', 'ethers.js, HD wallets, ERC-20 transfers, EIP-1559 fees, local chains with Hardhat'],
  ['Security', 'argon2, JWT and token rotation, TOTP two-factor, rate limiting, audit logs'],
];

export default function Page() {
  const contact = [
    { label: 'GitHub', href: profile.github },
    profile.email && { label: 'Email', href: `mailto:${profile.email}` },
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin },
    profile.x && { label: 'X', href: profile.x },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <header className="sticky top-0 z-[var(--z-sticky)] border-b border-line bg-bg pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-4 sm:px-6">
          <a href="#top" className="flex min-h-11 items-center font-semibold">
            {profile.name}
          </a>
          <nav aria-label="Sections" className="flex flex-wrap gap-x-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="flex min-h-11 items-center px-2 text-sm text-muted hover:text-fg">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <section aria-labelledby="hero-h" className="grid gap-10 py-14 lg:grid-cols-12 lg:py-24">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <p className="text-sm text-muted">Blockchain developer portfolio</p>
            <h1 id="hero-h" className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="max-w-[48ch] text-xl text-muted">
              <span className="num text-fg">{profile.handle}</span> in {profile.location}. {profile.headline}
            </p>
            <p className="max-w-[62ch]">
              These five projects fit together: a ledger that keeps the books balanced, a service for sign-in and two-factor, a wallet service for deposits and payouts on a test network, a trading screen, and an account app that joins them. Each has its code on GitHub, and the trading screen has a live demo you can try now.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="#projects" className={`${linkBtn} border-transparent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-pressed`}>
                See the projects
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`${linkBtn} border-line hover:bg-raised active:bg-raised`}>
                GitHub
                <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <dl className="flex flex-col self-end border-t border-line lg:col-span-4">
            {[
              [String(projects.length), 'repositories'],
              [String(totalTests), 'automated tests'],
              [String(endToEndChecks), 'step end-to-end run'],
              ['Test', 'networks only, no real funds'],
            ].map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-4 border-b border-line py-3">
                <dt className="num w-20 shrink-0 text-3xl font-medium">{n}</dt>
                <dd className="text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-h" className="border-t border-line py-14 lg:py-20">
          <div className="mb-10 flex max-w-[62ch] flex-col gap-2">
            <h2 id="projects-h" className="text-3xl font-semibold">
              Projects
            </h2>
            <p className="text-muted">Everything here runs on test networks. Nothing holds real money.</p>
          </div>
          <ol className="flex flex-col">
            {projects.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i} />
            ))}
          </ol>
        </section>

        {/* How they fit */}
        <section id="fit" aria-labelledby="fit-h" className="border-t border-line py-14 lg:py-20">
          <div className="mb-10 flex max-w-[62ch] flex-col gap-2">
            <h2 id="fit-h" className="text-3xl font-semibold">
              How they fit together
            </h2>
            <p className="text-muted">The hard part of an exchange is keeping several services agreeing about the same money. This is how a withdrawal moves through them.</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="rounded-md border border-line bg-surface p-4 lg:col-span-7">
              <Architecture />
            </div>
            <ol className="flex list-decimal flex-col gap-3 pl-5 lg:col-span-5">
              <li>The account app asks the ledger to hold the funds.</li>
              <li>It asks the wallet service to send them.</li>
              <li>The wallet checks with the auth service that the address is on the user&apos;s whitelist and past its waiting period.</li>
              <li>The wallet signs the transaction, saves it, sends it, and watches the chain until it is confirmed.</li>
              <li>It sends a signed event back to the app, and the app tells the ledger to settle the hold for good.</li>
              <li className="text-muted">If the wallet refuses at step 3 or earlier, the app tells the ledger to give the funds back. If the answer is unclear, the funds stay held until it is.</li>
            </ol>
          </div>
        </section>

        {/* Checks */}
        <section id="checks" aria-labelledby="checks-h" className="border-t border-line py-14 lg:py-20">
          <div className="mb-10 flex max-w-[62ch] flex-col gap-2">
            <h2 id="checks-h" className="text-3xl font-semibold">
              How it is checked
            </h2>
            <p className="text-muted">
              <span className="num text-fg">{totalTests}</span> automated tests across the five repositories, run against real databases and a local chain, plus one run that drives a whole user journey through every service.
            </p>
          </div>
          <div className="overflow-x-auto rounded-md border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Tests per project</caption>
              <thead>
                <tr>
                  <th scope="col" className="bg-surface px-4 py-3 text-xs font-medium text-muted">
                    Project
                  </th>
                  <th scope="col" className="bg-surface px-4 py-3 text-right text-xs font-medium text-muted">
                    Tests
                  </th>
                  <th scope="col" className="bg-surface px-4 py-3 text-xs font-medium text-muted">
                    What they cover
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row" className="num border-t border-line px-4 py-3 text-left align-top font-medium">
                      {p.repo}
                    </th>
                    <td className="num border-t border-line px-4 py-3 text-right align-top">{p.tests}</td>
                    <td className="max-w-[52ch] border-t border-line px-4 py-3 align-top text-muted">{p.testNote}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="border-t border-line px-4 py-3 text-left align-top font-medium">
                    Whole stack
                  </th>
                  <td className="num border-t border-line px-4 py-3 text-right align-top">{endToEndChecks}</td>
                  <td className="max-w-[52ch] border-t border-line px-4 py-3 align-top text-muted">
                    A real user journey through the app, auth, ledger, and wallet and a local chain: sign-up, two-factor, adding an address, a deposit credited once, a withdrawal that reaches the recipient, refunds after a refusal, forged events, and the ledger balancing at the end.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[68ch] text-sm text-muted">To prove the checks can fail, two safeguards were removed on purpose, the refund after a wallet refusal and the webhook signature check. The run caught both.</p>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-h" className="grid gap-10 border-t border-line py-14 lg:grid-cols-12 lg:py-20">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <h2 id="about-h" className="text-3xl font-semibold">
              About
            </h2>
            <p className="max-w-[62ch]">
              I am {profile.name}, also known as <span className="num">{profile.handle}</span>. I am a full-stack web developer and an ICT student in {profile.location}, focused on networking, system administration, and security.
            </p>
            <p className="max-w-[62ch]">These projects are how I am learning how money moves safely through a system, and how to prove it does. I am also exploring AI engineering.</p>
            <p className="max-w-[62ch] text-muted">I work with AI coding tools and check what they write by running it and testing it.</p>
          </div>
          <dl className="flex flex-col lg:col-span-6">
            {SKILLS.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="font-medium">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-h" className="flex flex-col gap-4 border-t border-line py-14 lg:py-20">
          <h2 id="contact-h" className="text-3xl font-semibold">
            Contact
          </h2>
          <p className="max-w-[62ch] text-muted">The code for everything above is public. Open an issue or say hello on GitHub.</p>
          <div className="flex flex-wrap gap-2">
            {contact.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`${linkBtn} ${i === 0 ? 'border-transparent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-pressed' : 'border-line hover:bg-raised active:bg-raised'}`}
              >
                {c.label}
                <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted sm:px-6">Test networks only. Nothing on this page or in these projects holds real money.</p>
      </footer>
    </>
  );
}
