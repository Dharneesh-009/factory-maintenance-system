# Factory Maintenance System - Frontend Changelog

## Milestone 1: Design system, shell and dashboard

### Step 1: Design system and global CSS
- `src/index.css`: replaced the Vite template styles with design tokens (colors, radii, shadows, sidebar and header sizes, fonts), a base reset, and the shared `.form-group` / `.error-message` / `.success-message` primitives that module modals use. Removed the unused legacy auth block, the `#root` 1126px width and centering, and the dark-mode variable overrides.
- `src/styles/ui.css` (new): shared `ui-*` components (buttons, cards, stat cards, page header, badges, progress bars, empty states, toasts, confirmation modal).
- Page stylesheets are scoped to their page root so rules cannot leak across pages:
  - `machines.css` -> `.machines-page`, `maintenance.css` -> `.maintenance-page`, `breakdowns.css` -> `.breakdowns-page`, `spareParts.css` -> `.spare-parts-page`, `notifications.css` -> `.notifications-page`, `AuthPages.css` -> `.auth-shell`, `Home.css` -> `.factory-home`.
  - Global resets (`*`, `html`, `body`, `#root`, `:root`) were removed from `Home.css`. The Inter font import moved to `index.css`.
- `src/styles/dashboard.css`: rewritten for the light theme, scoped to `.dashboard-page`.

### Step 2: Application shell
- `components/layout/Sidebar.jsx`: dark navy sidebar, fixed on desktop, off-canvas drawer below 1024px. Emoji icons replaced with lucide-react icons. Product name updated. Logout behaviour unchanged.
- `components/layout/Header.jsx`: sticky header with a product name, a mobile menu button, a notifications link (now links to `/notifications`), and the signed-in role.
- `components/layout/MainLayout.jsx`: manages the mobile drawer state. Closes on navigation.
- `styles/layout.css`: rewritten with `app-*` class names, full-width content, and responsive breakpoints at 1024px and 640px.

### Step 3: Reusable components
- `components/ui/`: `Button`, `Card`, `StatCard`, `IconTile`, `PageHeader`, `StatusBadge`, `ProgressBar`, `EmptyState`.
- `components/feedback/ToastProvider.jsx`: `useToast()` with `success`, `error`, `info`. Auto-dismiss, `role="alert"` for errors, and a live region.
- `components/feedback/ConfirmProvider.jsx`: `useConfirm()` returns a promise resolving to `true` or `false`. Escape and backdrop cancel. Confirm and cancel buttons, with focus on Cancel.
- `App.jsx` wraps the app in `ToastProvider` and `ConfirmProvider`. Routes are unchanged.

### Step 4: Dashboard
- `pages/Dashboard.jsx`: rebuilt on the same four endpoints (`/api/reports/machines`, `/maintenance`, `/breakdowns`, `/spare-parts`), with the same `Promise.all` loading. It shows four key figures, machine status, maintenance workload, breakdown overview, spare-parts stock, and one Quick Actions section.
- Removed: the duplicated Quick Actions block, the Machine Status list (already in Machine status), and the Maintenance Status list (already in Maintenance workload). Removed an unused `useAuth` import.
- Missing API values show "—" rather than 0. Percentages are computed safely when a total is 0.
- Added a Retry button on the error state, which re-runs the same requests.

### Step 5: Dialogs, branding and configuration
- Replaced all `window.alert` and `window.confirm` calls in Machines, Maintenance, Breakdowns, Spare Parts and Notifications with toasts and confirmation modals. Each action still runs the same API call and the same guard logic. Only the dialog mechanism changed.
- Product name is "Factory Maintenance System" in the landing page, login and registration screens, sidebar, header and page title. Replaced "ForgeOps", "FactoryFlow" and "Factory care".
- `services/api.js`: base URL now comes from `VITE_API_BASE_URL`, falling back to `http://localhost:8080` so local development works without any config.
- `.env.example` (new) documents the variable.
- `index.html` title updated.
- `package.json`: added `lucide-react` `^0.468.0`.

## Unchanged (by design)
- All services and API endpoints, request and response handling, JWT storage, `AuthContext`, `ProtectedRoute`, and role logic.
- Route paths, page logic and form behaviour in Machines, Maintenance, Breakdowns, Spare Parts and Notifications (only the dialog calls changed).
- The backend.

## Setup after extracting
1. Run `npm install`. This updates `package-lock.json` to include `lucide-react`. Use `npm install` rather than `npm ci` until the lockfile is updated.
2. Optional: copy `.env.example` to `.env.local` to change the API URL. Without it, the app uses `http://localhost:8080`.
3. Run `npm run dev` and `npm run build`.

## Known limitations and follow-up items
- Module pages (Machines, Maintenance, Breakdowns, Spare Parts, Notifications) keep their existing internal layouts and colors. They now sit inside the new shell and use the shared dialogs, but their tables and modals still need a visual pass in Milestone 2.
- The landing page keeps its marketing preview block, which contains illustrative numbers. It is not part of the authenticated application and does not call any API. Consider replacing it before launch.
- Not changed, to be discussed first: JWT has no expiry check and no 401 handler; `ProtectedRoute` only checks that a token exists; the sidebar shows every module to every role (backend enforcement only).
- `StatusBadge` is built but not yet used. It is ready for Milestone 2 status columns.
- Recent activity on the dashboard is not implemented, because no dashboard API provides it. The notifications endpoints could supply it later.
- Debug `console.log` statements remain in Machines and Notifications (for example "CURRENT USER ROLE"). They were left in place to keep this change focused. Remove them before production.
- `dist/` is not included because it is a generated build and is gitignored.
