# kolik-admin

Super admin web app for Kolik. Vite + React 18 + MUI 5, using kolik-fe's theme and components.

## Run

```bash
npm install
npm run dev
```

Opens on http://localhost:3100. Sign in with a Kolik account that has `is_super_admin = 1`. The first sign-in asks you to set up two-factor sign-in with an authenticator app; after that every sign-in needs a 6-digit code or a recovery code.

## API

The app talks to kolik-api's `/platform/*` routes (super admins with two-factor only). Set `VITE_API_BASE_URL` and `VITE_KOLIK_APP_URL` in `.env.development` (see `.env.example`); endpoint builders live in `src/constants/endpoints.ts`.

## Layout

- `src/utils/http` - same `http.get/post/put/patch/delete` helper as kolik-fe
- `src/services/<area>/<call>/index.ts` - one folder per API call, like kolik-fe
- `src/components/kolik` - components copied from kolik-fe (AppCard, PageHeader, AppModal, ...)
- `src/components/paginated-table` - `@xest-ui/data-table` with kolik-fe's table components
- `src/pages` - thin route pages; `src/sections` - page sections and `use-*` hooks
- `src/theme` - kolik-fe's MUI theme
- Charts use Recharts

## Scripts

`npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run format`
