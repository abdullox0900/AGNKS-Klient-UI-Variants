import type { ComponentType } from 'react'
import * as L from 'lucide-react'
import * as P from '@phosphor-icons/react'

/** Every icon the home screen uses — each variant supplies its own set/style. */
export type IconName =
  | 'bell'
  | 'wallet'
  | 'sparkle'
  | 'help'
  | 'idea'
  | 'complaint'
  | 'chevron'
  | 'close'
  | 'home'
  | 'history'
  | 'scan'
  | 'bonus'
  | 'profile'
  | 'flame'
  | 'gauge'
  | 'leaf'
  | 'pin'
  | 'car'
  | 'fuel'
  | 'receipt'
  | 'trophy'
  | 'ticket'
  | 'arrow'
  | 'clock'
  | 'card'

export type IconProps = { size?: number; className?: string }
export type IconSet = Record<IconName, ComponentType<IconProps>>

/** Lucide outline icons with a given stroke width. */
function lucideSet(strokeWidth: number): IconSet {
  const wrap =
    (Icon: L.LucideIcon): ComponentType<IconProps> =>
    ({ size = 22, className }) => <Icon size={size} strokeWidth={strokeWidth} className={className} />
  return {
    bell: wrap(L.Bell),
    wallet: wrap(L.Wallet),
    sparkle: wrap(L.Sparkles),
    help: wrap(L.CircleHelp),
    idea: wrap(L.Lightbulb),
    complaint: wrap(L.MessageSquareWarning),
    chevron: wrap(L.ChevronRight),
    close: wrap(L.X),
    home: wrap(L.House),
    history: wrap(L.History),
    scan: wrap(L.ScanLine),
    bonus: wrap(L.Gift),
    profile: wrap(L.UserRound),
    flame: wrap(L.Flame),
    gauge: wrap(L.Gauge),
    leaf: wrap(L.Leaf),
    pin: wrap(L.MapPin),
    car: wrap(L.Car),
    fuel: wrap(L.Fuel),
    receipt: wrap(L.Receipt),
    trophy: wrap(L.Trophy),
    ticket: wrap(L.Ticket),
    arrow: wrap(L.ArrowUpRight),
    clock: wrap(L.Clock),
    card: wrap(L.CreditCard),
  }
}

/** Phosphor icons in one weight (thin / light / bold / fill / duotone). */
function phosphorSet(weight: P.IconWeight): IconSet {
  const wrap =
    (Icon: P.Icon): ComponentType<IconProps> =>
    ({ size = 22, className }) => <Icon size={size} weight={weight} className={className} />
  return {
    bell: wrap(P.BellSimple),
    wallet: wrap(P.Wallet),
    sparkle: wrap(P.Sparkle),
    help: wrap(P.Question),
    idea: wrap(P.Lightbulb),
    complaint: wrap(P.ChatCircleText),
    chevron: wrap(P.CaretRight),
    // a filled X renders as a solid box — keep it a plain cross
    close: weight === 'fill' ? ({ size = 22, className }) => <P.X size={size} weight="bold" className={className} /> : wrap(P.X),
    home: wrap(P.House),
    history: wrap(P.ClockCounterClockwise),
    scan: wrap(P.Scan),
    bonus: wrap(P.Gift),
    profile: wrap(P.User),
    flame: wrap(P.Flame),
    gauge: wrap(P.Gauge),
    leaf: wrap(P.Leaf),
    pin: wrap(P.MapPin),
    car: wrap(P.Car),
    fuel: wrap(P.GasPump),
    receipt: wrap(P.Receipt),
    trophy: wrap(P.Trophy),
    ticket: wrap(P.Ticket),
    arrow: wrap(P.ArrowUpRight),
    clock: wrap(P.Clock),
    card: wrap(P.CreditCard),
  }
}

export const ICON_SETS = {
  lucide: lucideSet(1.9),
  fill: phosphorSet('fill'),
  light: phosphorSet('light'),
  bold: phosphorSet('bold'),
  duotone: phosphorSet('duotone'),
}
