import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VARIANTS } from './variants/themes'
import { HomeScreen } from './HomeScreen'

function initialVariant(): number {
  const n = Number(new URLSearchParams(window.location.search).get('v'))
  return n >= 1 && n <= VARIANTS.length ? n : 1
}

/**
 * UI-variant showcase for the client: pick one of five looks for the webapp's home
 * screen. Desktop shows the screen inside a phone frame with a variant picker;
 * on a phone the screen is full-size with a small floating switcher. The chosen
 * variant is kept in the URL (?v=3) so a specific one can be shared.
 */
export default function App() {
  const [id, setId] = useState(initialVariant)
  const v = VARIANTS[id - 1]

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('v', String(id))
    window.history.replaceState(null, '', url)
  }, [id])

  const step = (d: number) => setId((cur) => ((cur - 1 + d + VARIANTS.length) % VARIANTS.length) + 1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ---------- phone: full screen + floating switcher ---------- */}
      <div className="sm:hidden">
        <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(10px,env(safe-area-inset-top))]">
          <div className="flex items-center gap-1 rounded-full bg-black/75 p-1 text-white shadow-lg backdrop-blur">
            <button onClick={() => step(-1)} className="flex h-8 w-8 items-center justify-center rounded-full active:bg-white/15" aria-label="Oldingi">
              <ChevronLeft size={18} />
            </button>
            <span className="min-w-[118px] text-center text-[13px] font-semibold">
              {v.id}/{VARIANTS.length} · {v.name}
            </span>
            <button onClick={() => step(1)} className="flex h-8 w-8 items-center justify-center rounded-full active:bg-white/15" aria-label="Keyingi">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="min-h-dvh pt-[52px]" style={{ background: v.pageBg }}>
          <Screen v={v} />
        </div>
      </div>

      {/* ---------- desktop: picker + phone frame ---------- */}
      <div className="hidden min-h-dvh bg-[radial-gradient(120%_80%_at_50%_0%,#eef1f7_0%,#dfe4ee_100%)] px-6 py-10 sm:block">
        <div className="mx-auto max-w-[1100px]">
          <header className="mb-8 text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-500">AGNKS · Mijoz ilovasi</p>
            <h1 className="mt-2 text-[30px] font-bold text-slate-900">Dizayn variantlari</h1>
            <p className="mt-1.5 text-[15px] text-slate-600">Bosh sahifaning 10 xil ko'rinishi — ma'qul kelganini tanlang</p>
          </header>

          <div className="flex flex-wrap items-start justify-center gap-10">
            <div className="w-full max-w-[340px] space-y-2.5">
              {VARIANTS.map((item) => (
                <div key={item.id}>
                {(item.id === 1 || item.id === 6) && (
                  <p className="px-1 pb-1.5 pt-3 text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {item.id === 1 ? '1–5 · Ranglar (tuzilma bir xil)' : '6–10 · Yangi tuzilma + metan elementlari'}
                  </p>
                )}
                <button
                  key={item.id}
                  onClick={() => setId(item.id)}
                  className={clsx(
                    'flex w-full items-center gap-3.5 rounded-2xl border bg-white p-3.5 text-left transition',
                    item.id === id ? 'border-slate-900 shadow-lg ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-300 hover:shadow-md',
                  )}
                >
                  <span className="h-12 w-12 shrink-0 rounded-xl border border-black/5" style={{ background: item.cards === 'glass' ? item.pageBg : (item.heroBg ?? item.vars['--scan-bg'] ?? item.vars['--primary']) }}>
                    <span className="flex h-full w-full items-end justify-end p-1.5">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-white" style={{ background: item.vars['--primary'] }} />
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-slate-900">
                      {item.id}. {item.name}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-slate-500">{item.tagline}</span>
                  </span>
                </button>
                </div>
              ))}
              <p className="pt-2 text-center text-[12px] text-slate-400">← → tugmalari bilan ham almashtirish mumkin</p>
            </div>

            <div className="relative">
              <div className="rounded-[56px] bg-[#0b0d12] p-3 shadow-[0_40px_80px_-30px_rgba(15,23,42,.55)]">
                <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[44px]" style={{ background: v.pageBg }}>
                  <StatusBar dark={v.dark} />
                  <div className="no-scrollbar h-[calc(844px-44px)] overflow-y-auto">
                    <Screen v={v} />
                  </div>
                  <span className="pointer-events-none absolute left-1/2 top-2.5 h-[30px] w-[118px] -translate-x-1/2 rounded-full bg-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Screen({ v }: { v: (typeof VARIANTS)[number] }) {
  const Custom = v.screen
  return Custom ? <Custom key={v.id} v={v} /> : <HomeScreen key={v.id} v={v} />
}

function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div className={clsx('flex h-[44px] items-end justify-between px-8 pb-1.5 text-[14px] font-semibold', dark ? 'text-white' : 'text-black')}>
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" /><rect x="23" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".4" /></svg>
      </span>
    </div>
  )
}
