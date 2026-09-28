import { useState, type CSSProperties, type ReactNode } from 'react'
import { clsx } from 'clsx'
import type { Variant } from '../variants/themes'
import type { IconName } from '../variants/icons'

/** Applies a variant's colours / font / background to a screen. */
export function ScreenShell({ v, children }: { v: Variant; children: ReactNode }) {
  const style = { ...v.vars, fontFamily: v.font, background: v.pageBg, '--radius': `${v.radius}px` } as CSSProperties
  return (
    <div style={style} className="relative flex min-h-full flex-col text-[var(--ink)]">
      {children}
    </div>
  )
}

const TABS: { key: IconName; label: string }[] = [
  { key: 'home', label: 'Asosiy' },
  { key: 'history', label: 'Tarix' },
  { key: 'bonus', label: 'Bonus' },
  { key: 'profile', label: 'Profil' },
]

type NavStyle = 'floating' | 'dock' | 'wide-scan' | 'square-fab'

/**
 * Bottom navigation in four shapes:
 *  floating   — rounded pill hovering above the content, scan in the middle
 *  dock       — compact dark dock, icons only, scan as a highlighted slot
 *  wide-scan  — a full-width "scan" button above a thin tab row
 *  square-fab — classic tab bar with a rounded-square scan button
 */
export function Nav({ v, kind }: { v: Variant; kind: NavStyle }) {
  const I = v.icons
  const [tab, setTab] = useState<IconName>('home')
  const Tab = ({ t, showLabel = true }: { t: (typeof TABS)[number]; showLabel?: boolean }) => {
    const Icon = I[t.key]
    const active = tab === t.key
    return (
      <button onClick={() => setTab(t.key)} className="flex flex-1 flex-col items-center justify-center gap-1">
        <Icon size={23} className={active ? 'text-[var(--nav-active)]' : 'text-[var(--nav-idle)]'} />
        {showLabel && (
          <span className={clsx('text-[11px] leading-none', active ? 'font-bold text-[var(--nav-active)]' : 'font-medium text-[var(--nav-idle)]')}>
            {t.label}
          </span>
        )}
      </button>
    )
  }

  if (kind === 'wide-scan') {
    return (
      <div className="sticky bottom-0 z-10 bg-[var(--nav)] px-4 pb-4 pt-3" style={{ boxShadow: '0 -12px 30px -20px rgba(0,0,0,.5)' }}>
        <button
          className="mb-3 flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl text-[16px] font-bold text-[var(--primary-ink)]"
          style={{ background: 'var(--scan-bg)' }}
        >
          <I.scan size={24} /> Chekni skanerlash
        </button>
        <div className="flex h-11">
          {TABS.map((t) => (
            <Tab key={t.key} t={t} />
          ))}
        </div>
      </div>
    )
  }

  if (kind === 'dock') {
    return (
      <div className="sticky bottom-0 z-10 flex justify-center px-4 pb-5 pt-2">
        <div className="flex h-16 w-full items-center gap-1 rounded-[22px] bg-[var(--nav)] px-2" style={{ boxShadow: '0 18px 40px -16px rgba(0,0,0,.55)' }}>
          {TABS.slice(0, 2).map((t) => (
            <Tab key={t.key} t={t} showLabel={false} />
          ))}
          <button className="flex h-12 w-16 items-center justify-center rounded-2xl text-[var(--primary-ink)]" style={{ background: 'var(--scan-bg)' }}>
            <I.scan size={24} />
          </button>
          {TABS.slice(2).map((t) => (
            <Tab key={t.key} t={t} showLabel={false} />
          ))}
        </div>
      </div>
    )
  }

  if (kind === 'floating') {
    return (
      <div className="sticky bottom-0 z-10 px-4 pb-5 pt-6">
        <div className="relative flex h-[66px] items-center rounded-full bg-[var(--nav)] px-2" style={{ boxShadow: '0 16px 36px -16px rgba(0,0,0,.45)' }}>
          {TABS.slice(0, 2).map((t) => (
            <Tab key={t.key} t={t} />
          ))}
          <div className="relative flex w-[76px] justify-center">
            <button
              className="absolute -top-9 flex h-[62px] w-[62px] items-center justify-center rounded-full border-4 text-[var(--primary-ink)]"
              style={{ background: 'var(--scan-bg)', borderColor: 'var(--page-edge)' }}
            >
              <I.scan size={26} />
            </button>
          </div>
          {TABS.slice(2).map((t) => (
            <Tab key={t.key} t={t} />
          ))}
        </div>
      </div>
    )
  }

  // square-fab
  return (
    <div className="sticky bottom-0 z-10 border-t border-[var(--border)] bg-[var(--nav)] pb-4">
      <div className="flex h-[66px] items-center">
        {TABS.slice(0, 2).map((t) => (
          <Tab key={t.key} t={t} />
        ))}
        <div className="flex w-[80px] justify-center">
          <button className="-mt-8 flex h-[58px] w-[58px] rotate-0 items-center justify-center rounded-[18px] text-[var(--primary-ink)]" style={{ background: 'var(--scan-bg)', boxShadow: '0 12px 24px -10px var(--primary)' }}>
            <I.scan size={26} />
          </button>
        </div>
        {TABS.slice(2).map((t) => (
          <Tab key={t.key} t={t} />
        ))}
      </div>
    </div>
  )
}

/** Greeting row shared by several layouts. */
export function Greeting({ v, subtitle = 'Xush kelibsiz' }: { v: Variant; subtitle?: string }) {
  const I = v.icons
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[15px] font-bold text-[var(--primary)]">S</span>
        <div>
          <p className="text-[12.5px] text-[var(--ink-3)]">{subtitle}</p>
          <p className="text-[17px] font-bold leading-tight">Sardor Aliyev</p>
        </div>
      </div>
      <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--ink-2)]" style={{ boxShadow: 'var(--shadow)' }}>
        <I.bell size={21} />
        <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)] bg-[var(--danger)]" />
      </button>
    </div>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: string }) {
  return (
    <div className="mb-2.5 mt-6 flex items-center justify-between">
      <p className="text-[15px] font-bold">{children}</p>
      {action && <span className="text-[13px] font-semibold text-[var(--primary)]">{action}</span>}
    </div>
  )
}
