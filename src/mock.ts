/** Static demo data — this mockup never talks to the backend. */
export const MOCK = {
  firstName: 'Sardor',
  balance: 48_250,
  spendMin: 5_000,
  basePercent: 1,
  promo: { label: 'Hafta oxiri aksiyasi', percent: 3, until: '23:59' },
  hasUnreadNews: true,

  // extra, methane-themed demo figures used by variants 6–10
  month: {
    receipts: 14,
    bonusEarned: 32_400,
    /** cubic metres filled this month */
    volumeM3: 186,
    /** kg of CO₂ saved vs petrol (demo figure) */
    co2SavedKg: 42,
    savedVsPetrol: 612_000,
  },
  /** next reward level — the tank / gauge fills towards it */
  goal: 60_000,
  pricePerM3: 4_900,
  station: { name: 'AGNKS №4 — Chilonzor', distanceKm: 1.2, queue: 2, waitMin: 5, open: true },
  history: [
    { station: 'AGNKS №4 — Chilonzor', time: 'Bugun, 09:12', amount: 1_470 },
    { station: 'AGNKS №7 — Yunusobod', time: 'Kecha, 18:40', amount: 2_050 },
    { station: 'Kassada to\'lov', time: '25 sen, 13:05', amount: -12_000 },
  ],
}

export function formatMoney(sum: number): string {
  return `${Math.round(sum).toLocaleString('ru-RU').replace(/,/g, ' ')} so'm`
}

export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ')
}
