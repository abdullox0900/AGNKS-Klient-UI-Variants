import { useState } from 'react'
import { clsx } from 'clsx'
import type { Variant } from '../variants/themes'
import { MOCK, formatMoney, formatNumber } from '../mock'
import { Greeting, Nav, ScreenShell, SectionTitle } from './shared'

/** 7 · Metan Card — balance as a physical loyalty card, coupon-style promo, monthly stats. */
export function CardHome({ v }: { v: Variant }) {
  const I = v.icons
  const [open, setOpen] = useState(0)
  const steps = [
    { t: 'Chekni skanerlang', d: "Metan quygach, chekdagi QR kodni ilovada skanerlang." },
    { t: 'Bonus oling', d: `Chek summasining ${MOCK.basePercent}% bonus bo'lib hisobingizga tushadi.` },
    { t: "Kassada to'lang", d: `Balans ${formatNumber(MOCK.spendMin)} so'mdan oshsa, QR orqali bonus bilan to'lang.` },
  ]

  return (
    <ScreenShell v={v}>
      <div className="flex-1 px-4 pt-4">
        <Greeting v={v} subtitle="Metan Card egasi" />

        {/* the card */}
        <div className="relative mt-5 aspect-[1.6] overflow-hidden rounded-[22px] p-5 text-white" style={{ background: 'var(--card-bg)', boxShadow: '0 22px 40px -18px var(--card-shadow)' }}>
          <svg className="pointer-events-none absolute -right-8 -top-6 h-48 w-48 opacity-20" viewBox="0 0 100 100">
            <path d="M50 5c8 18 30 26 30 52a30 30 0 0 1-60 0c0-14 8-22 14-30 2 10 8 14 12 14-6-12 0-26 4-36z" fill="white" />
          </svg>
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <I.flame size={19} />
                </span>
                <span className="text-[14px] font-extrabold tracking-[0.12em]">AGNKS METAN</span>
              </div>
              <span className="h-7 w-10 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 opacity-90" />
            </div>
            <div>
              <p className="text-[12px] text-white/70">Bonus balansi</p>
              <p className="tnum text-[32px] font-extrabold leading-none tracking-tight">{formatMoney(MOCK.balance)}</p>
            </div>
            <div className="flex items-end justify-between text-[12.5px]">
              <span className="tnum tracking-[0.18em] text-white/85">AG26 •••• 7263</span>
              <span className="font-semibold uppercase tracking-wide text-white/85">Sardor A.</span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button className="flex h-12 items-center justify-center gap-2 rounded-2xl text-[15px] font-bold text-[var(--primary-ink)]" style={{ background: 'var(--scan-bg)' }}>
            <I.wallet size={19} /> To'lash
          </button>
          <button className="flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[var(--primary)] text-[15px] font-bold text-[var(--primary)]">
            <I.scan size={19} /> Skanerlash
          </button>
        </div>

        {/* monthly stats */}
        <SectionTitle>Bu oy</SectionTitle>
        <div className="grid grid-cols-3 divide-x divide-[var(--border)] rounded-[18px] bg-[var(--surface)] py-3.5" style={{ boxShadow: 'var(--shadow)' }}>
          {[
            { icon: 'receipt' as const, v: String(MOCK.month.receipts), l: 'chek' },
            { icon: 'bonus' as const, v: `+${formatNumber(MOCK.month.bonusEarned)}`, l: 'bonus' },
            { icon: 'fuel' as const, v: `${MOCK.month.volumeM3}`, l: 'm³ metan' },
          ].map((s) => {
            const Icon = I[s.icon]
            return (
              <div key={s.l} className="flex flex-col items-center gap-1">
                <Icon size={19} className="text-[var(--accent)]" />
                <span className="tnum text-[17px] font-extrabold">{s.v}</span>
                <span className="text-[11.5px] text-[var(--ink-3)]">{s.l}</span>
              </div>
            )
          })}
        </div>

        {/* coupon */}
        <div
          className="relative mt-4 flex overflow-hidden rounded-[18px] bg-[var(--accent-soft)]"
          style={{
            WebkitMaskImage: 'radial-gradient(circle 9px at 88px 0, transparent 98%, #000 100%), radial-gradient(circle 9px at 88px 100%, transparent 98%, #000 100%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        >
          <div className="flex w-[88px] flex-col items-center justify-center border-r-2 border-dashed border-[var(--accent)]/40 py-4 text-[var(--accent)]">
            <span className="text-[26px] font-black leading-none">{MOCK.promo.percent}%</span>
            <span className="text-[10.5px] font-bold uppercase tracking-wider">bonus</span>
          </div>
          <div className="flex-1 px-4 py-3.5">
            <p className="text-[14.5px] font-bold">{MOCK.promo.label}</p>
            <p className="text-[12px] text-[var(--ink-2)]">Har chekdan · bugun {MOCK.promo.until} gacha</p>
          </div>
          <span className="self-center pr-3 text-[var(--accent)]">
            <I.ticket size={22} />
          </span>
        </div>

        {/* how — accordion */}
        <SectionTitle>Qanday ishlaydi?</SectionTitle>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <button key={s.t} onClick={() => setOpen(i)} className="w-full rounded-2xl bg-[var(--surface)] px-4 py-3 text-left" style={{ boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center gap-3">
                <span className={clsx('flex h-7 w-7 items-center justify-center rounded-full text-[12.5px] font-bold', open === i ? 'text-[var(--primary-ink)]' : 'bg-[var(--chip)] text-[var(--ink-2)]')} style={open === i ? { background: 'var(--scan-bg)' } : undefined}>
                  {i + 1}
                </span>
                <span className="flex-1 text-[14.5px] font-semibold">{s.t}</span>
                <I.chevron size={16} className={clsx('text-[var(--ink-3)] transition-transform', open === i && 'rotate-90')} />
              </div>
              {open === i && <p className="mt-2 pl-10 text-[13px] leading-relaxed text-[var(--ink-2)]">{s.d}</p>}
            </button>
          ))}
        </div>

        <SectionTitle>Fikringiz biz uchun muhim</SectionTitle>
        <div className="flex gap-2.5 pb-6">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--primary-soft)] py-3 text-[14px] font-semibold text-[var(--primary)]">
            <I.idea size={18} /> Taklif
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--danger-soft)] py-3 text-[14px] font-semibold text-[var(--danger)]">
            <I.complaint size={18} /> Shikoyat
          </button>
        </div>
      </div>
      <Nav v={v} kind="square-fab" />
    </ScreenShell>
  )
}
