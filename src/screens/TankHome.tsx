import type { Variant } from '../variants/themes'
import { MOCK, formatMoney, formatNumber } from '../mock'
import { Nav, ScreenShell, SectionTitle } from './shared'

/** 10 · Tank — balance as a CNG cylinder filling up towards the next reward, industrial dark look. */
export function TankHome({ v }: { v: Variant }) {
  const I = v.icons
  const ratio = Math.min(1, MOCK.balance / MOCK.goal)
  const segments = 10
  const lit = Math.round(ratio * segments)
  // cylinder interior: y from 26 to 190 (height 164)
  const fillTop = 26 + 164 * (1 - ratio)

  return (
    <ScreenShell v={v}>
      <div className="flex-1 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">AGNKS · CNG</p>
            <p className="text-[20px] font-bold">Salom, Sardor</p>
          </div>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-2)]">
            <I.bell size={21} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[var(--danger)]" />
          </button>
        </div>

        {/* tank */}
        <div className="mt-5 flex gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow)' }}>
          <svg viewBox="0 0 90 210" className="h-[196px] w-[84px] shrink-0">
            <defs>
              <linearGradient id="gas10" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--gas-from)" />
                <stop offset="100%" stopColor="var(--gas-to)" />
              </linearGradient>
              <clipPath id="tank10">
                <rect x="12" y="26" width="66" height="164" rx="30" />
              </clipPath>
            </defs>
            {/* valve */}
            <rect x="36" y="4" width="18" height="14" rx="3" fill="var(--ink-3)" />
            <rect x="30" y="16" width="30" height="8" rx="3" fill="var(--ink-3)" />
            {/* body */}
            <rect x="12" y="26" width="66" height="164" rx="30" fill="var(--track)" />
            <g clipPath="url(#tank10)">
              <rect x="12" y={fillTop} width="66" height={190 - fillTop} fill="url(#gas10)" />
              <path d={`M12 ${fillTop} q16 -6 33 0 t33 0 v8 h-66z`} fill="rgba(255,255,255,.25)" />
              {[22, 40, 58].map((x, i) => (
                <circle key={x} cx={x + 6} cy={fillTop + 30 + i * 28} r={2.5 + (i % 2)} fill="rgba(255,255,255,.4)">
                  <animate attributeName="cy" from={180} to={fillTop + 8} dur={`${2.4 + i * 0.7}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
            <rect x="12" y="26" width="66" height="164" rx="30" fill="none" stroke="var(--border-strong)" strokeWidth="2.5" />
            <rect x="22" y="40" width="7" height="120" rx="3.5" fill="rgba(255,255,255,.12)" />
          </svg>

          <div className="flex min-w-0 flex-1 flex-col">
            <p className="text-[12.5px] text-[var(--ink-3)]">Bonus balansi</p>
            <p className="tnum text-[28px] font-extrabold leading-tight tracking-tight text-[var(--money)]">{formatMoney(MOCK.balance)}</p>
            <p className="mt-1 text-[12px] text-[var(--ink-3)]">
              Ballon {Math.round(ratio * 100)}% to'la · keyingi sovg'a {formatNumber(MOCK.goal)} so'mda
            </p>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: segments }).map((_, i) => (
                <span key={i} className="h-2.5 flex-1 rounded-sm" style={{ background: i < lit ? 'var(--gas-to)' : 'var(--track)' }} />
              ))}
            </div>
            <button className="mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[var(--gas-to)] text-[14.5px] font-bold text-[var(--gas-to)]">
              <I.wallet size={19} /> Bonus bilan to'lash
            </button>
          </div>
        </div>

        {/* station strip */}
        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[12.5px]">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gas-to)] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--gas-to)]" />
          </span>
          <span className="min-w-0 truncate font-semibold">{MOCK.station.name}</span>
          <span className="shrink-0 whitespace-nowrap text-[var(--ink-3)]">· navbat {MOCK.station.queue}</span>
          <span className="tnum ml-auto shrink-0 whitespace-nowrap font-semibold text-[var(--accent)]">{formatNumber(MOCK.pricePerM3)}/m³</span>
        </div>

        {/* promo */}
        <div className="mt-4 rounded-[18px] border border-[var(--accent)]/50 p-4" style={{ background: 'linear-gradient(135deg, var(--accent-soft), transparent)' }}>
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <I.sparkle size={18} />
            <span className="text-[12px] font-bold uppercase tracking-wider">Aksiya</span>
          </div>
          <p className="mt-1.5 text-[17px] font-extrabold">
            {MOCK.promo.label} — {MOCK.promo.percent}% bonus
          </p>
          <p className="text-[12.5px] text-[var(--ink-3)]">Bugun {MOCK.promo.until} gacha har chekdan</p>
        </div>

        {/* recent */}
        <SectionTitle action="Tarix">So'nggi amallar</SectionTitle>
        <div className="divide-y divide-[var(--border)] rounded-[18px] border border-[var(--border)] bg-[var(--surface)]">
          {MOCK.history.map((h) => (
            <div key={h.time} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--chip)] text-[var(--ink-2)]">
                {h.amount > 0 ? <I.fuel size={18} /> : <I.wallet size={18} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold">{h.station}</p>
                <p className="text-[11.5px] text-[var(--ink-3)]">{h.time}</p>
              </div>
              <span className="tnum text-[14px] font-bold" style={{ color: h.amount > 0 ? 'var(--gas-to)' : 'var(--ink)' }}>
                {h.amount > 0 ? '+' : '−'}
                {formatMoney(Math.abs(h.amount))}
              </span>
            </div>
          ))}
        </div>

        {/* how + feedback */}
        <div className="mt-4 grid grid-cols-3 gap-2 pb-4">
          {[
            { icon: 'help' as const, t: 'Qanday ishlaydi' },
            { icon: 'idea' as const, t: 'Taklif' },
            { icon: 'complaint' as const, t: 'Shikoyat' },
          ].map((x) => {
            const Icon = I[x.icon]
            return (
              <button key={x.t} className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 text-[11.5px] font-semibold text-[var(--ink-2)]">
                <Icon size={20} className="text-[var(--accent)]" />
                {x.t}
              </button>
            )
          })}
        </div>
      </div>
      <Nav v={v} kind="wide-scan" />
    </ScreenShell>
  )
}
