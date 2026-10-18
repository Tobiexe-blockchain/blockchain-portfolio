import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Figure } from './Figures';

const base = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 text-base font-medium transition-colors duration-150 lg:text-sm';

export function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  return (
    <li className="grid gap-6 border-t border-line py-10 first:border-t-0 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="rounded-md border border-line bg-surface p-4">
          <Figure name={p.figure} />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-7">
        <header className="flex flex-col gap-1">
          <p className="num text-sm text-muted">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="text-2xl font-semibold">{p.title}</h3>
          <p className="num text-sm text-muted">{p.repo}</p>
        </header>

        <p className="max-w-[68ch]">{p.summary}</p>

        <ul className="flex max-w-[68ch] list-disc flex-col gap-1 pl-5 text-muted">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <p className="max-w-[68ch] text-sm">
          <span className="font-medium">How it is checked.</span> <span className="num">{p.tests}</span> automated tests. <span className="text-muted">{p.testNote}</span>
        </p>

        <ul className="flex flex-wrap gap-2" aria-label="Built with">
          {p.tags.map((t) => (
            <li key={t} className="rounded-sm border border-line px-2 py-0.5 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className={`${base} border-transparent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-pressed`}>
                Open live demo
                <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${base} border-line hover:bg-raised active:bg-raised`}>
              View the code on GitHub
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          {!p.live && p.noLive && <p className="max-w-[68ch] text-sm text-muted">{p.noLive}</p>}
        </div>
      </div>
    </li>
  );
}
