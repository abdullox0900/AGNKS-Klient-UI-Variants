import type { Variant } from '../variants/themes'
import { MOCK, formatMoney, formatNumber } from '../mock'
import { Nav, ScreenShell } from './shared'

/** 9 · Bento — everything as tiles in one grid: balance, scan, today's price, stats. */
export function BentoHome({ v }: { v: Variant }) {
  const I = v.icons
  const tile = 'rounded-[22px] p-4'
  const shadow = { boxShadow: 'var(--shadow)' }

  return (
    <ScreenShell v={v}>
      <div className="flex-1 px-4 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-[var(--ink-3)]">Dushanba, 28 sentyabr</p>
            <h1 className="mt-0.5 text-[28px] font-extrabold leading-tight tracking-tight">Salom, Sardor</h1>
          </div>
          <button className="relative mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--ink)]" style={shadow}>
            <I.bell size={21} />
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)] bg-[var(--danger)]" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* balance */}
          <div className={`${tile} col-span-2 bg-[var(--tile-dark)] text-white`} style={shadow}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white/65">Bonus balansi</span>
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11.5px] font-semibold">
                <I.flame size={13} className="text-[var(--accent)]" /> Metan bonus
              </span>
            </div>
            <p className="tnum mt-2 text-[34px] font-extrabold leading-none tracking-tight">{formatMoney(MOCK.balance)}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[12px] text-white/55">Kassada QR orqali to'lang</span>
              <button className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13.5px] font-bold text-[var(--tile-dark)]">
                To'lash <I.arrow size={15} />
              </button>
            </div>
          </div>

          {/* scan — tall */}
          <button className={`${tile} row-span-2 flex flex-col justify-between text-left text-[var(--primary-ink)]`} style={{ background: 'var(--scan-bg)', ...shadow }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <I.scan size={26} />
            </span>
            <span>
              <span className="block text-[20px] font-extrabold leading-tight">Chekni skanerlash</span>
              <span className="mt-1 block text-[12px] opacity-80">Har chekdan {MOCK.basePercent}% bonus</span>
            </span>
          </button>

          {/* price */}
          <div className={`${tile} bg-[var(--surface)]`} style={shadow}>
            <I.fuel size={21} className="text-[var(--accent)]" />
            <p className="mt-2 text-[11.5px] text-[var(--ink-3)]">Metan narxi</p>
            <p className="tnum text-[18px] font-extrabold leading-tight">
              {formatNumber(MOCK.pricePerM3)}
              <span className="text-[11.5px] font-semibold text-[var(--ink-3)]"> so'm/m³</span>
            </p>
          </div>

          {/* receipts */}
          <div className={`${tile} bg-[var(--surface)]`} style={shadow}>
            <I.receipt size={21} className="text-[var(--primary)]" />
            <p className="mt-2 text-[11.5px] text-[var(--ink-3)]">Bu oy</p>
            <p className="tnum text-[18px] font-extrabold leading-tight">
              {MOCK.month.receipts} <span className="text-[11.5px] font-semibold text-[var(--ink-3)]">chek</span>
            </p>
          </div>

          {/* promo */}
          <div
            className={`${tile} col-span-2 flex items-center gap-3`}
            style={{ background: 'repeating-linear-gradient(135deg, var(--accent-soft) 0 14px, var(--accent-soft-2) 14px 28px)', ...shadow }}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
              <I.sparkle size={22} />
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-extrabold">{MOCK.promo.percent}% bonus — {MOCK.promo.label.toLowerCase()}</p>
              <p className="text-[12px] text-[var(--ink-2)]">Bugun {MOCK.promo.until} gacha, har chekdan</p>
            </div>
          </div>

          {/* how */}
          <div className={`${tile} col-span-2 bg-[var(--surface)]`} style={shadow}>
            <div className="flex items-center gap-2">
              <I.help size={20} className="text-[var(--primary)]" />
              <p className="text-[14.5px] font-bold">Qanday ishlaydi?</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11.5px] font-semibold text-[var(--ink-2)]">
              {[
                { i: 'scan' as const, t: 'Skanerlang' },
                { i: 'bonus' as const, t: 'Bonus oling' },
                { i: 'wallet' as const, t: "To'lang" },
              ].map((s) => {
                const Icon = I[s.i]
                return (
                  <div key={s.t} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[var(--chip)] py-3">
                    <Icon size={20} />
                    {s.t}
                  </div>
                )
              })}
            </div>
          </div>

          {/* feedback */}
          <button className={`${tile} flex items-center gap-2.5 bg-[var(--surface)] text-left`} style={shadow}>
            <I.idea size={22} className="text-[var(--primary)]" />
            <span className="text-[14px] font-bold">Taklif</span>
          </button>
          <button className={`${tile} flex items-center gap-2.5 bg-[var(--surface)] text-left`} style={shadow}>
            <I.complaint size={22} className="text-[var(--danger)]" />
            <span className="text-[14px] font-bold">Shikoyat</span>
          </button>
        </div>
      </div>
      <Nav v={v} kind="dock" />
    </ScreenShell>
  )
}
