import type { Variant } from '../variants/themes'
import type { IconName } from '../variants/icons'
import { MOCK, formatMoney, formatNumber } from '../mock'
import { Greeting, Nav, ScreenShell, SectionTitle } from './shared'

/** 6 · Gauge — balance as a pressure/fuel gauge, quick-action row, horizontal cards. */
export function GaugeHome({ v }: { v: Variant }) {
  const I = v.icons
  const ratio = Math.min(1, MOCK.balance / MOCK.goal)
  const left = MOCK.goal - MOCK.balance

  // semicircle 180° arc, r=100, centred at (120,120)
  const arcLen = Math.PI * 100
  const angle = Math.PI * (1 - ratio)
  const needle = { x: 120 + 78 * Math.cos(angle), y: 120 - 78 * Math.sin(angle) }

  const actions: { icon: IconName; label: string }[] = [
    { icon: 'scan', label: 'Skaner' },
    { icon: 'wallet', label: "To'lash" },
    { icon: 'history', label: 'Tarix' },
    { icon: 'ticket', label: 'Aksiyalar' },
  ]

  return (
    <ScreenShell v={v}>
      <div className="flex-1 px-4 pt-4">
        <Greeting v={v} />

        <div className="mt-5 rounded-[var(--radius)] bg-[var(--surface)] px-5 pb-5 pt-4" style={{ boxShadow: 'var(--shadow)' }}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ink-2)]">
              <I.flame size={16} className="text-[var(--accent)]" /> Bonus bosimi
            </span>
            <span className="rounded-full bg-[var(--primary-soft)] px-2.5 py-1 text-[11.5px] font-bold text-[var(--primary)]">{Math.round(ratio * 100)}%</span>
          </div>

          <svg viewBox="0 0 240 140" className="mx-auto mt-1 w-full max-w-[280px]">
            <defs>
              <linearGradient id="g6" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--gauge-from)" />
                <stop offset="100%" stopColor="var(--gauge-to)" />
              </linearGradient>
            </defs>
            {/* tick marks */}
            {Array.from({ length: 11 }).map((_, i) => {
              const a = Math.PI * (1 - i / 10)
              return (
                <line
                  key={i}
                  x1={120 + 112 * Math.cos(a)}
                  y1={120 - 112 * Math.sin(a)}
                  x2={120 + (i % 5 === 0 ? 102 : 106) * Math.cos(a)}
                  y2={120 - (i % 5 === 0 ? 102 : 106) * Math.sin(a)}
                  stroke="var(--ink-3)"
                  strokeWidth={i % 5 === 0 ? 2 : 1}
                  strokeLinecap="round"
                />
              )
            })}
            <path d="M20 120 A100 100 0 0 1 220 120" fill="none" stroke="var(--track)" strokeWidth="14" strokeLinecap="round" />
            <path
              d="M20 120 A100 100 0 0 1 220 120"
              fill="none"
              stroke="url(#g6)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${arcLen * ratio} ${arcLen}`}
            />
            <line x1="120" y1="120" x2={needle.x} y2={needle.y} stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="120" cy="120" r="7" fill="var(--ink)" />
            <circle cx="120" cy="120" r="3" fill="var(--surface)" />
          </svg>

          <p className="tnum -mt-3 text-center text-[34px] font-extrabold leading-none tracking-tight text-[var(--money)]">{formatMoney(MOCK.balance)}</p>
          <p className="mt-1.5 text-center text-[12.5px] text-[var(--ink-3)]">
            Keyingi darajagacha <b className="text-[var(--ink-2)]">{formatNumber(left)} so'm</b> qoldi
          </p>
          <button className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15.5px] font-bold text-[var(--primary-ink)]" style={{ background: 'var(--scan-bg)' }}>
            <I.wallet size={20} /> Bonus bilan to'lash
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {actions.map((a) => {
            const Icon = I[a.icon]
            return (
              <button key={a.label} className="flex flex-col items-center gap-1.5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--primary)]" style={{ boxShadow: 'var(--shadow)' }}>
                  <Icon size={24} />
                </span>
                <span className="text-[12px] font-medium text-[var(--ink-2)]">{a.label}</span>
              </button>
            )
          })}
        </div>

        <SectionTitle action="Barchasi">Aksiyalar va narxlar</SectionTitle>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          <div className="w-[250px] shrink-0 rounded-[20px] p-4 text-white" style={{ background: 'linear-gradient(135deg, var(--gauge-from), var(--gauge-to))' }}>
            <I.sparkle size={22} />
            <p className="mt-3 text-[20px] font-extrabold">{MOCK.promo.percent}% bonus</p>
            <p className="text-[12.5px] text-white/85">{MOCK.promo.label} · bugun {MOCK.promo.until} gacha</p>
          </div>
          <div className="w-[200px] shrink-0 rounded-[20px] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow)' }}>
            <I.fuel size={22} className="text-[var(--accent)]" />
            <p className="mt-3 text-[12px] text-[var(--ink-3)]">Bugungi metan narxi</p>
            <p className="tnum text-[20px] font-extrabold">{formatNumber(MOCK.pricePerM3)} <span className="text-[13px] font-semibold text-[var(--ink-3)]">so'm/m³</span></p>
          </div>
        </div>

        <SectionTitle>Qanday ishlaydi?</SectionTitle>
        <div className="rounded-[20px] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow)' }}>
          <div className="relative flex justify-between">
            <span className="absolute left-[16%] right-[16%] top-4 h-0.5 bg-[var(--track)]" />
            {['Skanerlang', 'Bonus oling', "Kassada to'lang"].map((s, i) => (
              <div key={s} className="relative flex w-1/3 flex-col items-center text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: 'var(--scan-bg)' }}>
                  {i + 1}
                </span>
                <span className="mt-2 text-[12px] font-medium text-[var(--ink-2)]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionTitle>Fikringiz biz uchun muhim</SectionTitle>
        <div className="divide-y divide-[var(--border)] rounded-[20px] bg-[var(--surface)]" style={{ boxShadow: 'var(--shadow)' }}>
          {[
            { icon: 'idea' as const, t: 'Taklif yuborish', h: "Yaxshilash g'oyasi", tone: 'primary' },
            { icon: 'complaint' as const, t: 'Shikoyat qilish', h: 'Muammo haqida yozing', tone: 'danger' },
          ].map((r) => {
            const Icon = I[r.icon]
            return (
              <div key={r.t} className="flex items-center gap-3 px-4 py-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `var(--${r.tone}-soft)`, color: `var(--${r.tone})` }}>
                  <Icon size={20} />
                </span>
                <div className="flex-1">
                  <p className="text-[14.5px] font-semibold">{r.t}</p>
                  <p className="text-[12px] text-[var(--ink-3)]">{r.h}</p>
                </div>
                <I.chevron size={17} className="text-[var(--ink-3)]" />
              </div>
            )
          })}
        </div>
      </div>
      <Nav v={v} kind="floating" />
    </ScreenShell>
  )
}
