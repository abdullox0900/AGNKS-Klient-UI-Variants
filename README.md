# AGNKS — mijoz ilovasi UI variantlari

Faqat ko'rsatish uchun: mijoz webapp'ining **Bosh sahifasi**, 10 xil dizaynda (1–5 ranglar, 6–10 yangi tuzilma + metan elementlari), mock ma'lumot bilan.
Backend / Telegram bilan ulanmagan, asosiy loyihaga (`AGNKS-Klient`) ta'sir qilmaydi.

- Variantlar: `src/variants/themes.ts` (ranglar, fon, shrift, karta uslubi), `src/variants/icons.tsx` (belgi uslubi)
- Ekran: `src/HomeScreen.tsx`
- Variantni havola orqali ochish: `?v=1` … `?v=10`

```bash
npm install
npm run dev      # lokal ko'rish
npm run build    # dist/ — istalgan statik hostingga (Vercel, nginx) joylash
```
