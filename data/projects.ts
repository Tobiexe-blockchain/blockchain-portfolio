export type FigureName = 'exchange' | 'ledger' | 'auth' | 'wallet' | 'app';

export interface Project {
  slug: string;
  title: string;
  repo: string;
  figure: FigureName;
  summary: string;
  highlights: string[];
  /** Number of automated tests, as stated in the repository's README. */
  tests: number;
  testNote: string;
  tags: string[];
  github: string;
  /** Hosted demo. Leave undefined when there is none. */
  live?: string;
  /** Shown instead of a live link. */
  noLive?: string;
}

const gh = (repo: string) => `https://github.com/Tobiexe-blockchain/${repo}`;

export const projects: Project[] = [
  {
    slug: 'exchange-ui',
    title: 'Trading screen',
    repo: 'phantom-exchange-ui',
    figure: 'exchange',
    summary:
      'A live order book, recent trades, a candlestick chart, and an order form, with open orders and balances. It works on phones and desktops. The hosted demo runs on simulated prices inside your browser, so it needs no server.',
    highlights: [
      'Order book with depth bars, running totals, and the spread.',
      'Limit and market orders with balance checks, and a confirm step before cancelling.',
      'Connects to a matching engine through one adapter, or to the built-in demo.',
    ],
    tests: 40,
    testNote: 'Candle maths, order validation, the engine adapter, and a simulated exchange that is checked to never lose or invent funds.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Socket.io'],
    github: gh('phantom-exchange-ui'),
    live: 'https://phantom-exchange-ui.vercel.app',
  },
  {
    slug: 'account-app',
    title: 'Account area',
    repo: 'phantom-exchange-app',
    figure: 'app',
    summary:
      'Sign in with two-factor, save withdrawal addresses, deposit, withdraw, and see balances. It is also the piece that keeps the auth, ledger, and wallet services in step with each other.',
    highlights: [
      'A withdrawal locks funds in the ledger first, then asks the wallet to send. If the wallet refuses, the funds are released. If its answer is unclear, they stay held.',
      'Signed wallet events credit deposits exactly once.',
      'The browser never sees a service key and never supplies a destination address.',
    ],
    tests: 35,
    testNote: 'Plus a 58 step run against the real services and a local chain. Two safeguards were removed on purpose to prove that run catches them.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: gh('phantom-exchange-app'),
    noLive: 'No hosted demo yet. It needs the three backend services running, so run it locally from the README.',
  },
  {
    slug: 'ledger',
    title: 'Double-entry ledger',
    repo: 'phantom-ledger',
    figure: 'ledger',
    summary:
      'Every balance change is a pair of entries that cancel out. It handles deposits, transfers, trade settlement, and withdrawals, holding funds until the chain confirms.',
    highlights: [
      'Row locking stops two requests from spending the same money.',
      'Every write carries an idempotency key, so a repeated request is harmless.',
      'A reconcile call proves debits equal credits and that no balance was tampered with.',
    ],
    tests: 25,
    testNote: 'Run against a real database, including parallel withdrawals, repeated requests, and tamper detection.',
    tags: ['TypeScript', 'Fastify', 'PostgreSQL'],
    github: gh('phantom-ledger'),
    noLive: 'A backend service with no screens. Run it locally from the README.',
  },
  {
    slug: 'auth',
    title: 'Auth and security',
    repo: 'phantom-auth',
    figure: 'auth',
    summary:
      'Sign-in with short-lived tokens that rotate, authenticator-app two-factor with backup codes, lockout after repeated failures, and a withdrawal address whitelist with a waiting period.',
    highlights: [
      'Reusing an old refresh token ends that whole session.',
      'Two-factor secrets are encrypted at rest, and each code works once.',
      'A new payout address needs an email confirmation and 24 hours before it can be used.',
    ],
    tests: 54,
    testNote: 'Forged tokens, replayed codes, and parallel password guessing. The README maps each threat to the test that covers it.',
    tags: ['TypeScript', 'Fastify', 'PostgreSQL', 'argon2'],
    github: gh('phantom-auth'),
    noLive: 'A backend service with no screens. Run it locally from the README.',
  },
  {
    slug: 'wallet',
    title: 'Wallet service',
    repo: 'phantom-wallet',
    figure: 'wallet',
    summary:
      'Gives each user a deposit address, watches the chain for deposits, sends withdrawals from a hot wallet, replaces stuck transactions with higher fees, and sweeps deposits together. Test networks only.',
    highlights: [
      'Deposit addresses come from one public key, so handing them out needs no private key.',
      'A deposit is reported only after enough confirmations, and one whose block disappears in a reorg is never credited.',
      'The signed transaction is saved before it is sent, so a crash cannot cause a second payout.',
    ],
    tests: 77,
    testNote: 'Run against a local chain, a real database, and Redis. Removing the nonce lock or the limit lock makes its tests fail.',
    tags: ['TypeScript', 'ethers.js', 'PostgreSQL', 'Redis', 'BullMQ'],
    github: gh('phantom-wallet'),
    noLive: 'A backend service with no screens. Run it locally from the README.',
  },
];

export const totalTests = projects.reduce((n, p) => n + p.tests, 0);
export const endToEndChecks = 58;
