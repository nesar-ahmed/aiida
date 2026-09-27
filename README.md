# AIIDA — Aveiro Islamic Mosque & Community

Official website of AIIDA (Associação Cultural e Beneficente AIIDA) — the mosque
and Muslim community of Aveiro, Portugal. Bilingual site (English / European
Portuguese) with localized routes (`/en/...`, `/pt/...`).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React Compiler, `next/root-params`)
- [next-intl](https://next-intl.dev) v4 — routing, middleware & translations
- Tailwind CSS v4 + shadcn-style components on [Base UI](https://base-ui.com)
- Prayer times from the [Aladhan API](https://aladhan.com/prayer-times-api)
  (Muslim World League method, Europe/Lisbon), cached via ISR

## Pages

Home, About, Prayer times (daily + monthly table), Services, Events,
Donate (bank transfer / MB WAY), Contact — all fully localized via the
message dictionaries in `messages/en.json` and `messages/pt.json`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /pt
npm run build
npm run lint
npm run typecheck
```

## Structure

```
src/
├── app/[locale]/       # localized routes (root layout lives here)
├── components/         # site + Base UI components
├── content/            # site config, events, team, services (en/pt objects)
├── i18n/               # routing, navigation, request config (next/root-params)
├── lib/                # prayer-times helpers
└── proxy.ts            # next-intl middleware (locale-prefix routing)
messages/               # en.json / pt.json translation dictionaries
```

## Before going live

- Replace placeholder data flagged with `TODO` in `src/content/`
  (address, phone, team members, event programme).
- **Verify the IBAN/SWIFT and MB WAY numbers used on the donate page.**
- Add an `opengraph-image` for social sharing (see `src/app/[locale]/layout.tsx`).
