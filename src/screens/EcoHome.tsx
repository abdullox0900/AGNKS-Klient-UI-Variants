import type { Variant } from '../variants/themes'
import { MOCK, formatMoney, formatNumber } from '../mock'
import { Greeting, Nav, ScreenShell, SectionTitle } from './shared'

/** 8 · Eco — CO₂-saved ring up top, compact balance row, nearest station with queue. */
export function EcoHome({ v }: { v: Variant }) {
  const I = v.icons
  const co2Goal = 50
  const ratio = Math.min(1, MOCK.month.co2SavedKg / co2Goal)
  const r = 54
  const c = 2 * Math.PI * r

  return (
    <ScreenShell v={v}>
      <div className="flex-1 px-4 pt-4">
        <Greeting v={v} subtitle="Toza havo uchun rahmat 🌿" />

        {/* eco impact */}
        <div className="relative mt-5 overflow-hidden rounded-[var(--radius)] p-5 text-white" style={{ background: 'var(--hero-bg)' }}>
          <svg className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 opacity-15" viewBox="0 0 24 24" fill="white">
            <path d="M17 8C8 10 5.9 16.2 3.8 21.3l1.9.7.9-2.3c.5.2 1 .3 1.4.3C19 20 22 3 22 3c-1 2-8 2.3-13 3.3S2 11.5 2 13.5 3.8 17.3 3.8 17.3C7 8 17 8 17 8z" />
          </svg>
          <div className="relative flex items-center gap-5">
            <div className="relative h-[124px] w-[124px] shrink-0">
              <svg viewBox="0 0 124 124" className="h-full w-full -rotate-90">
                <circle cx="62" cy="62" r={r} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="10" />
                <circle cx="62" cy="62" r={r} fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * ratio} ${c}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <I.leaf size={20} />
                <span className="tnum mt-0.5 text-[24px] font-extrabold leading-none">{MOCK.month.co2SavedKg}</span>
                <span className="text-[11px] text-white/80">kg CO₂</span>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white/85">Bu oy tabiatga hissangiz</p>
              <p className="mt-1 text-[14px] leading-snug">
                Metan tanlab <b>{MOCK.month.co2SavedKg} kg</b> CO₂ chiqindisini kamaytirdingiz
              </p>
              <p className="mt-2 rounded-full bg-white/15 px-2.5 py-1 text-[11.5px] font-semibold">
                Benzinga nisbatan −{formatNumber(MOCK.month.savedVsPetrol)} so'm
              </p>
            </div>
          </div>
        </div>

        {/* balance row */}
        <div className="mt-3 flex items-center gap-3 rounded-[20px] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow)' }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
            <I.bonus size={24} />
          </span>
          <div className="flex-1">
            <p className="text-[12px] text-[var(--ink-3)]">Bonus balansi</p>
            <p className="tnum text-[22px] font-extrabold leading-tight text-[var(--money)]">{formatMoney(MOCK.balance)}</p>
          </div>
          <button className="rounded-xl px-4 py-2.5 text-[13.5px] font-bold text-[var(--primary-ink)]" style={{ background: 'var(--scan-bg)' }}>
            To'lash
          </button>
        </div>

        {/* nearest station */}
        <SectionTitle action="Xarita">Eng yaqin shoxobcha</SectionTitle>
        <div className="relative overflow-hidden rounded-[20px] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow)' }}>
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              maskImage: 'linear-gradient(90deg, transparent 30%, #000 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 30%, #000 100%)',
            }}
          />
          <div className="relative flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <I.pin size={22} />
            </span>
            <div className="flex-1">
              <p className="text-[14.5px] font-bold">{MOCK.station.name}</p>
              <p className="text-[12.5px] text-[var(--ink-3)]">{MOCK.station.distanceKm} km · hozir ochiq</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11.5px] font-semibold">
                <span className="flex items-center gap-1 rounded-full bg-[var(--primary-soft)] px-2.5 py-1 text-[var(--primary)]">
                  <I.car size={13} /> Navbat: {MOCK.station.queue} ta
                </span>
                <span className="flex items-center gap-1 rounded-full bg-[var(--chip)] px-2.5 py-1 text-[var(--ink-2)]">
                  <I.clock size={13} /> ~{MOCK.station.waitMin} daq
                </span>
                <span className="flex items-center gap-1 rounded-full bg-[var(--chip)] px-2.5 py-1 text-[var(--ink-2)]">
                  <I.fuel size={13} /> {formatNumber(MOCK.pricePerM3)} so'm/m³
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* promo */}
        <div className="mt-4 flex items-center gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-3.5">
          <I.sparkle size={22} className="text-[var(--accent)]" />
          <p className="flex-1 text-[13.5px]">
            <b>{MOCK.promo.label}:</b> har chekdan {MOCK.promo.percent}% · bugun {MOCK.promo.until} gacha
          </p>
        </div>

        {/* how + feedback */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 pb-4">
          {[
            { icon: 'help' as const, t: 'Qanday ishlaydi?', tone: 'primary' },
            { icon: 'idea' as const, t: 'Taklif', tone: 'accent' },
            { icon: 'complaint' as const, t: 'Shikoyat', tone: 'danger' },
          ].map((x) => {
            const Icon = I[x.icon]
            return (
              <button key={x.t} className="flex flex-col items-center gap-2 rounded-[18px] bg-[var(--surface)] px-2 py-3.5 text-center" style={{ boxShadow: 'var(--shadow)' }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `var(--${x.tone}-soft)`, color: `var(--${x.tone})` }}>
                  <Icon size={20} />
                </span>
                <span className="text-[12px] font-semibold leading-tight">{x.t}</span>
              </button>
            )
          })}
        </div>
      </div>
      <Nav v={v} kind="floating" />
    </ScreenShell>
  )
}
