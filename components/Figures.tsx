import type { FigureName } from '@/data/projects';

/** Small drawings that explain what each project does. They are diagrams, not screenshots. */

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`${id}-h`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L8 4 L0 8 z" className="head" />
      </marker>
      <marker id={`${id}-a`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L8 4 L0 8 z" className="heada" />
      </marker>
    </defs>
  );
}

function Svg({ id, label, children, w = 320, h = 180 }: { id: string; label: string; children: React.ReactNode; w?: number; h?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}-title`} className="fig h-auto w-full">
      <title id={`${id}-title`}>{label}</title>
      <Defs id={id} />
      {children}
    </svg>
  );
}

function Box({ x, y, w, h, label, accent }: { x: number; y: number; w: number; h: number; label: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} className={accent ? 'box' : 'box'} style={accent ? { stroke: 'var(--accent)' } : undefined} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className="t">
        {label}
      </text>
    </g>
  );
}

const arrow = (id: string, accent = false) => `url(#${id}-${accent ? 'a' : 'h'})`;

function Exchange() {
  const bids = [112, 96, 80, 64, 48, 32];
  const asks = [24, 40, 56, 72, 88, 104];
  return (
    <Svg id="fx" label="Sketch of an order book. Bars for buy orders (bids) extend left from a center line and bars for sell orders (asks) extend right, with the spread between them.">
      <text x="150" y="16" textAnchor="end">
        Bids
      </text>
      <text x="170" y="16">
        Asks
      </text>
      {bids.map((w, i) => (
        <rect key={`b${i}`} x={150 - w} y={26 + i * 24} width={w} height={16} rx={2} className="up" />
      ))}
      {asks.map((w, i) => (
        <rect key={`a${i}`} x={170} y={26 + i * 24} width={w} height={16} rx={2} className="down" />
      ))}
      <line x1="160" y1="22" x2="160" y2="166" className="ln dash" />
      <text x="160" y="177" textAnchor="middle">
        Spread
      </text>
    </Svg>
  );
}

function Ledger() {
  return (
    <Svg id="fl" label="Sketch of ledger entries. Each entry has a debit side and a credit side of the same amount, and the totals of both sides match.">
      <text x="16" y="20">
        Debit
      </text>
      <text x="176" y="20">
        Credit
      </text>
      <line x1="16" y1="28" x2="304" y2="28" className="ln" />
      <text x="16" y="50" className="t">
        Chain wallet
      </text>
      <text x="136" y="50" textAnchor="end" className="t">
        100
      </text>
      <text x="176" y="50" className="t">
        Alice
      </text>
      <text x="304" y="50" textAnchor="end" className="t">
        100
      </text>
      <text x="16" y="76" className="t">
        Alice
      </text>
      <text x="136" y="76" textAnchor="end" className="t">
        40
      </text>
      <text x="176" y="76" className="t">
        Bob
      </text>
      <text x="304" y="76" textAnchor="end" className="t">
        40
      </text>
      <line x1="16" y1="100" x2="304" y2="100" className="ln" />
      <text x="16" y="122">
        Total
      </text>
      <text x="136" y="122" textAnchor="end" className="t">
        140
      </text>
      <text x="304" y="122" textAnchor="end" className="t">
        140
      </text>
      <text x="16" y="158" className="a">
        Debits equal credits, always.
      </text>
    </Svg>
  );
}

function Auth() {
  return (
    <Svg id="fa" label="Sketch of refresh token rotation. Each token is replaced by the next. Using an old token a second time ends the session.">
      <Box x={14} y={34} w={80} h={36} label="Token 1" />
      <Box x={120} y={34} w={80} h={36} label="Token 2" />
      <Box x={226} y={34} w={80} h={36} label="Token 3" />
      <line x1="94" y1="52" x2="118" y2="52" className="ln" markerEnd={arrow('fa')} />
      <line x1="200" y1="52" x2="224" y2="52" className="ln" markerEnd={arrow('fa')} />
      <text x="107" y="28" textAnchor="middle">
        replaced
      </text>
      <path d="M54 72 C54 110 110 118 140 124" className="lna dash" markerEnd={arrow('fa', true)} />
      <text x="40" y="104" textAnchor="end" className="a">
        used twice
      </text>
      <Box x={110} y={124} w={140} h={36} label="Session ended" accent />
    </Svg>
  );
}

function Wallet() {
  return (
    <Svg id="fw" label="Sketch of wallet addresses. One public key produces a deposit address for each user, and deposits are swept into one hot wallet.">
      <Box x={110} y={10} w={100} h={28} label="Public key" />
      {[20, 120, 220].map((x, i) => (
        <g key={x}>
          <path d={`M160 38 L${x + 40} 68`} className="ln" markerEnd={arrow('fw')} />
          <Box x={x} y={68} w={80} h={28} label={`User ${i + 1}`} />
          <path d={`M${x + 40} 96 L160 132`} className="lna" markerEnd={arrow('fw', true)} />
        </g>
      ))}
      <Box x={110} y={134} w={100} h={28} label="Hot wallet" accent />
      <text x="16" y="124">
        derive
      </text>
      <text x="304" y="124" textAnchor="end" className="a">
        sweep
      </text>
    </Svg>
  );
}

function App() {
  return (
    <Svg id="fp" label="Sketch of the account app. A browser talks to the app, and the app talks to the auth, ledger, and wallet services.">
      <Box x={10} y={68} w={74} h={44} label="Browser" />
      <Box x={116} y={68} w={74} h={44} label="App" accent />
      <line x1="84" y1="90" x2="114" y2="90" className="ln" markerEnd={arrow('fp')} />
      {[
        ['Auth', 18],
        ['Ledger', 70],
        ['Wallet', 122],
      ].map(([label, y]) => (
        <g key={label as string}>
          <Box x={232} y={y as number} w={78} h={34} label={label as string} />
          <path d={`M190 90 L230 ${(y as number) + 17}`} className="ln" markerEnd={arrow('fp')} />
        </g>
      ))}
    </Svg>
  );
}

const FIGURES: Record<FigureName, () => React.JSX.Element> = { exchange: Exchange, ledger: Ledger, auth: Auth, wallet: Wallet, app: App };

export function Figure({ name }: { name: FigureName }) {
  const F = FIGURES[name];
  return <F />;
}

/** The whole system on one page. */
export function Architecture() {
  return (
    <Svg id="fs" w={640} h={270} label="Diagram of how the services connect. The browser talks to the account app. The app talks to the auth, ledger, and wallet services. The wallet checks addresses with auth, talks to the chain, and sends signed events back to the app. The trading screen runs on its own.">
      <Box x={20} y={115} w={96} h={40} label="Browser" />
      <Box x={170} y={115} w={116} h={40} label="Account app" accent />
      <Box x={380} y={14} w={130} h={40} label="Auth service" />
      <Box x={380} y={115} w={130} h={40} label="Ledger" />
      <Box x={380} y={206} w={130} h={40} label="Wallet service" />
      <Box x={548} y={206} w={72} h={40} label="Chain" />

      <rect x={20} y={14} width={116} height={40} rx={4} className="box dash" />
      <text x={78} y={31} textAnchor="middle" className="t">
        Trading screen
      </text>
      <text x={78} y={46} textAnchor="middle">
        runs on its own
      </text>

      <line x1="116" y1="135" x2="168" y2="135" className="ln" markerEnd={arrow('fs')} />
      <line x1="286" y1="125" x2="378" y2="40" className="ln" markerEnd={arrow('fs')} />
      <line x1="286" y1="135" x2="378" y2="135" className="ln" markerEnd={arrow('fs')} />
      <line x1="286" y1="145" x2="378" y2="224" className="ln" markerEnd={arrow('fs')} />
      <line x1="510" y1="226" x2="546" y2="226" className="ln" markerEnd={arrow('fs')} />

      <path d="M510 216 H530 V34 H512" className="lna" markerEnd={arrow('fs', true)} />
      <text x="536" y="122" className="a">
        whitelist
      </text>
      <text x="536" y="136" className="a">
        check
      </text>

      <path d="M380 236 H228 V157" className="lna" markerEnd={arrow('fs', true)} />
      <text x="232" y="258" className="a">
        signed events
      </text>
    </Svg>
  );
}
