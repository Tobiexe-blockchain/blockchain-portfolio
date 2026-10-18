import { describe, expect, it } from 'vitest';
import { endToEndChecks, projects, totalTests } from '../data/projects';

describe('project data', () => {
  it('has unique slugs and repositories', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.repo)).size).toBe(projects.length);
  });

  it('links every project to its own GitHub repository', () => {
    for (const p of projects) expect(p.github).toBe(`https://github.com/Tobiexe-blockchain/${p.repo}`);
  });

  it('gives every project without a live link a reason, and every live link is https', () => {
    for (const p of projects) {
      if (p.live) expect(p.live).toMatch(/^https:\/\//);
      else expect(p.noLive, p.repo).toBeTruthy();
    }
  });

  it('adds the test counts up exactly', () => {
    expect(totalTests).toBe(projects.reduce((n, p) => n + p.tests, 0));
    expect(totalTests).toBe(231);
    expect(endToEndChecks).toBe(58);
  });

  it('has a summary, highlights, and a figure for every project', () => {
    for (const p of projects) {
      expect(p.summary.length).toBeGreaterThan(40);
      expect(p.highlights.length).toBeGreaterThanOrEqual(3);
      expect(['exchange', 'ledger', 'auth', 'wallet', 'app']).toContain(p.figure);
    }
  });

  it('only the trading screen has a live demo for now', () => {
    expect(projects.filter((p) => p.live).map((p) => p.repo)).toEqual(['phantom-exchange-ui']);
  });
});
