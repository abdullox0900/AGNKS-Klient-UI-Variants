import { useState, type CSSProperties, type ReactNode } from 'react'
import { clsx } from 'clsx'
import type { Variant } from './variants/themes'
import type { IconName } from './variants/icons'
import { MOCK, formatMoney } from './mock'

/**
 * The client webapp's Home screen, same elements as the real one (greeting + bell,
 * balance card with "pay with bonus", promo banner, "how it works", suggestion /
 * complaint tiles, bottom navigation) — only colours, backgrounds, icons and type
 * change per variant.
 */
export function HomeScreen({ v }: { v: Variant }) {
  const I = v.icons
  const [howOpen, setHowOpen] = useState(true)
  const [tab, setTab] = useState<IconName>('home')

  const style = { ...v.vars, fontFamily: v.font, background: v.pageBg, '--radius': `${v.radius}px` } as CSSProperties

  return (
    <div style={style} className="relative flex min-h-full flex-col text-[var(--ink)]">
      <div className="flex-1 px-4 pb-10 pt-4">
        {/* greeting + bell */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-[var(--ink-3)]">Xush kelibsiz</p>
            <p className="text-[19px] font-bold leading-tight">Salom, {MOCK.firstName} 👋</p>
          </div>
          <button className={clsx('relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--ink-2)]', cardClass(v))} style={cardStyle(v)}>
            <I.bell size={21} />
            {MOCK.hasUnreadNews && (
              <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)] bg-[var(--danger)]" />
            )}
          </button>
        </div>

        {/* balance */}
        <BalanceCard v={v} />

        {/* promo */}
        <div
          className="mt-3.5 flex items-center gap-3 rounded-[calc(var(--radius)-6px)] bg-[var(--accent-soft)] px-4 py-3"
          style={v.cards === 'glass' ? { backdropFilter: 'blur(18px)', border: '1px solid var(--border)' } : undefined}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white" style={v.dark ? { color: '#1a1406' } : undefined}>
            <I.sparkle size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-semibold text-[var(--accent)]">
              {MOCK.promo.label} · {MOCK.promo.percent}%
            </p>
            <p className="text-[12px] text-[var(--ink-2)]">Bugun {MOCK.promo.until} gacha · har chekdan</p>
          </div>
        </div>

        {/* how it works */}
        {howOpen && (
          <Card v={v} className="mt-3.5 p-4">
            <div className="flex items-start gap-3">
              <IconTile v={v}>
                <I.help size={21} />
              </IconTile>
              <div className="flex-1">
                <p className="text-[15px] font-semibold">Qanday ishlaydi?</p>
                <p className="text-[12.5px] text-[var(--ink-3)]">3 qadamda bonus yig'ing</p>
              </div>
              <button onClick={() => setHowOpen(false)} className="-mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-3)]">
                <I.close size={16} />
              </button>
            </div>
            <div className="mt-3.5 flex items-center gap-1 text-[12px] font-medium text-[var(--ink-2)]">
              {['Skanerlang', 'Bonus oling', "Kassada to'lang"].map((label, i) => (
                <span key={label} className="flex items-center gap-1">
                  {i > 0 && <I.chevron size={13} className="text-[var(--ink-3)]" />}
                  <span className="whitespace-nowrap rounded-lg bg-[var(--chip)] px-2 py-1">{label}</span>
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* feedback */}
        <p className="mb-2.5 mt-6 text-[15px] font-semibold">Fikringiz biz uchun muhim</p>
        <div className="grid grid-cols-2 gap-2.5">
          <FeedbackTile v={v} icon="idea" title="Taklif" hint="Yaxshilash g'oyasi" tone="primary" />
          <FeedbackTile v={v} icon="complaint" title="Shikoyat" hint="Muammo haqida yozing" tone="danger" />
        </div>
      </div>

      <BottomNav v={v} tab={tab} onTab={setTab} />
    </div>
  )
}

function BalanceCard({ v }: { v: Variant }) {
  const I = v.icons
  const gradient = v.hero === 'gradient'
  return (
    <div
      className={clsx('relative mt-5 overflow-hidden rounded-[var(--radius)] p-5', !gradient && cardClass(v))}
      style={
        gradient
          ? {
              background: v.heroBg,
              boxShadow: 'var(--shadow)',
              border: v.cards === 'outline' || v.cards === 'glass' ? '1px solid var(--border)' : undefined,
              backdropFilter: v.cards === 'glass' ? 'blur(22px)' : undefined,
            }
          : cardStyle(v)
      }
    >
      {gradient && (
        // soft decorative circles on coloured hero cards
        <>
          <span className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute -bottom-16 right-10 h-32 w-32 rounded-full bg-white/10" />
        </>
      )}
      <div className="relative">
        <p className={clsx('text-[13px] font-medium', gradient ? 'text-white/80' : 'text-[var(--ink-2)]', v.id === 3 && 'text-[var(--ink-2)]')}>
          Bonus balansi
        </p>
        <p className="tnum mt-1 text-[36px] font-extrabold leading-none tracking-tight text-[var(--money)]">{formatMoney(MOCK.balance)}</p>
        <p className={clsx('mt-2 text-[12.5px]', gradient && v.id !== 3 ? 'text-white/75' : 'text-[var(--ink-3)]')}>
          Har chekdan {MOCK.basePercent}% bonus · kamida {formatMoney(MOCK.spendMin)} bilan to'lash mumkin
        </p>
        <button
          className={clsx(
            'mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-[calc(var(--radius)-8px)] py-3.5 text-[15.5px] font-bold',
            v.heroButton === 'outline' && 'border border-[var(--primary)] text-[var(--primary)]',
            v.heroButton === 'white' && 'bg-white text-[var(--primary)]',
            v.heroButton === 'primary' && 'bg-[var(--primary)] text-[var(--primary-ink)]',
          )}
          style={v.id === 5 ? { color: 'var(--primary-ink)' } : undefined}
        >
          <I.wallet size={20} />
          Bonus bilan to'lash
        </button>
      </div>
    </div>
  )
}

function FeedbackTile({ v, icon, title, hint, tone }: { v: Variant; icon: IconName; title: string; hint: string; tone: 'primary' | 'danger' }) {
  const Icon = v.icons[icon]
  return (
    <Card v={v} className="p-4">
      <div className="flex items-center justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `var(--${tone}-soft)`, color: `var(--${tone})` }}
        >
          <Icon size={21} />
        </span>
        <v.icons.chevron size={17} className="text-[var(--ink-3)]" />
      </div>
      <p className="mt-3 text-[15px] font-semibold">{title}</p>
      <p className="mt-0.5 text-[12.5px] text-[var(--ink-3)]">{hint}</p>
    </Card>
  )
}

const TABS: { key: IconName; label: string }[] = [
  { key: 'home', label: 'Asosiy' },
  { key: 'history', label: 'Tarix' },
  { key: 'bonus', label: 'Bonus' },
  { key: 'profile', label: 'Profil' },
]

function BottomNav({ v, tab, onTab }: { v: Variant; tab: IconName; onTab: (t: IconName) => void }) {
  const I = v.icons
  const left = TABS.slice(0, 2)
  const right = TABS.slice(2)
  const item = (t: (typeof TABS)[number]) => {
    const Icon = I[t.key]
    const active = tab === t.key
    return (
      <button key={t.key} onClick={() => onTab(t.key)} className="relative flex flex-1 flex-col items-center justify-center gap-1">
        <span className={clsx('absolute top-0 h-[3px] w-6 rounded-b-full bg-[var(--primary)] transition-opacity', active ? 'opacity-100' : 'opacity-0')} />
        <Icon size={24} className={active ? 'text-[var(--primary)]' : 'text-[var(--ink-3)]'} />
        <span className={clsx('text-[11.5px] leading-none', active ? 'font-bold text-[var(--primary)]' : 'font-medium text-[var(--ink-3)]')}>{t.label}</span>
      </button>
    )
  }
  return (
    <nav
      // sticky, not fixed: pins to the bottom of the phone frame's scroll area and of the real viewport alike
      className="sticky bottom-0 z-10 border-t border-[var(--border)] bg-[var(--nav)] pb-4"
      style={{ backdropFilter: v.cards === 'glass' ? 'blur(24px)' : undefined, boxShadow: '0 -10px 30px -22px rgba(0,0,0,.35)' }}
    >
      <div className="flex h-[70px]">
        {left.map(item)}
        <div className="relative flex flex-1 justify-center">
          <div className="absolute -top-7 flex h-[72px] w-[72px] items-center justify-center rounded-full" style={{ background: v.cards === 'glass' ? 'transparent' : 'var(--nav)' }}>
            <button
              className="flex h-[54px] w-[54px] items-center justify-center rounded-full"
              style={{
                background: v.hero === 'gradient' && v.id !== 3 && v.id !== 5 ? v.heroBg : 'var(--primary)',
                color: v.id === 5 || v.id === 3 ? 'var(--primary-ink)' : '#fff',
                boxShadow: '0 10px 22px -8px rgba(0,0,0,.35)',
              }}
            >
              <I.scan size={25} />
            </button>
          </div>
          <span className="absolute bottom-[12px] text-[11.5px] font-medium leading-none text-[var(--ink-3)]">Skaner</span>
        </div>
        {right.map(item)}
      </div>
    </nav>
  )
}

function Card({ v, className, children }: { v: Variant; className?: string; children: ReactNode }) {
  return (
    <div className={clsx('rounded-[calc(var(--radius)-4px)]', cardClass(v), className)} style={cardStyle(v)}>
      {children}
    </div>
  )
}

function IconTile({ v, children }: { v: Variant; children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]" style={v.id === 5 ? { color: '#fff' } : undefined}>
      {children}
    </span>
  )
}

function cardClass(v: Variant): string {
  return clsx('bg-[var(--surface)]', (v.cards === 'outline' || v.cards === 'glass' || v.cards === 'soft') && 'border border-[var(--border)]')
}

function cardStyle(v: Variant): CSSProperties {
  return {
    boxShadow: v.cards === 'outline' ? undefined : 'var(--shadow)',
    backdropFilter: v.cards === 'glass' ? 'blur(18px)' : undefined,
    WebkitBackdropFilter: v.cards === 'glass' ? 'blur(18px)' : undefined,
  }
}
