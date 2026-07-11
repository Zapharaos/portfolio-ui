# Analytics (umami)

Privacy-friendly, **cookieless** analytics via [umami](https://umami.is) — no
consent banner required, no personal data collected. Analytics is entirely
**optional and configurable**: leave it unset and the site ships with zero
tracking; fill in two values and it lights up.

Everything is driven from a single config file:
[`src/config/analytics.ts`](../src/config/analytics.ts).

## How it's wired

| Piece | Role |
|-------|------|
| [`src/config/analytics.ts`](../src/config/analytics.ts) | Single source of truth. Resolves the config from `VITE_UMAMI_*` env vars. |
| [`src/composables/useAnalytics.ts`](../src/composables/useAnalytics.ts) | Injects the umami `<script>` once, exposes `track()` / `trackOutbound()`. |
| [`src/App.vue`](../src/App.vue) | Calls `initAnalytics()` on mount (browser-only; no-op if disabled). |

Because the injector no-ops when analytics is disabled or unconfigured, `track()`
can be called anywhere without a guard — it simply does nothing until the tracker
is present.

## Enable it

1. Stand up an umami instance (self-hosted — see `../umami` — or
   [umami cloud](https://cloud.umami.is)).
2. In the umami dashboard: **Settings → Websites → Add** your domain, then copy
   its **Website ID** (a UUID).
3. Set the env vars (`.env` for local, your host's build env for production):

   ```dotenv
   VITE_UMAMI_HOST=https://analytics.example.com
   VITE_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   VITE_UMAMI_SCRIPT_NAME=script.js   # must match umami's TRACKER_SCRIPT_NAME
   ```

That's it — page views start flowing. To **turn analytics off** without removing
the ids, set `VITE_UMAMI_ENABLED=false` (or just clear `VITE_UMAMI_HOST` /
`VITE_UMAMI_WEBSITE_ID`).

| env var | meaning | default |
|---------|---------|---------|
| `VITE_UMAMI_ENABLED` | master switch (`false` disables everything) | `true` |
| `VITE_UMAMI_HOST` | where the tracker `<script src>` loads from | *(empty = off)* |
| `VITE_UMAMI_WEBSITE_ID` | the site's UUID from the umami dashboard | *(empty = off)* |
| `VITE_UMAMI_SCRIPT_NAME` | script filename (must match `TRACKER_SCRIPT_NAME`) | `script.js` |
| `VITE_UMAMI_HOST_URL` | first-party only: `data-host-url` (where events are posted) | *(empty = direct)* |

## Two deployment modes

### A) Direct — simplest
The browser talks straight to the umami host.

```dotenv
VITE_UMAMI_HOST=https://analytics.example.com
VITE_UMAMI_SCRIPT_NAME=script.js
VITE_UMAMI_HOST_URL=                       # empty = direct
```

⚠️ `VITE_UMAMI_SCRIPT_NAME` **must match** umami's `TRACKER_SCRIPT_NAME`
(`t` → `t.js`). A mismatch is a 404 = no tracking. Renaming the script (e.g.
`stats.js`) also helps dodge ad-blockers.

### B) First-party (recommended) — dodges ad-blockers
The browser only talks to *your* domain; your reverse proxy forwards `/script.js`
and `/api/send` to umami. This makes the tracker first-party, so ad-blockers that
rely on third-party host lists don't block it.

```dotenv
VITE_UMAMI_HOST=https://your-domain.com
VITE_UMAMI_SCRIPT_NAME=stats.js
VITE_UMAMI_HOST_URL=https://your-domain.com
```

Requires two proxy locations on your site's server (see `../umami` for the nginx
recipe): `location = /stats.js` and `location = /api/send`, both proxying to the
umami container.

## Custom events

Beyond automatic page views, high-signal interactions are tracked via
`track()` / `trackOutbound()`. All outbound clicks share the single `outbound`
event name and are told apart by their `context` (plus `label` / `section` for
projects and experiences):

| event | when | data | source |
|-------|------|------|--------|
| `nav` | a header link is clicked | `{ to: 'work' \| 'about' \| 'contact' }` | [`HeaderComponent.vue`](../src/components/HeaderComponent.vue) |
| `experience-open` | an experience card is expanded (opens only, not collapses) | `{ label, section }` | [`ExperienceContainer.vue`](../src/components/ExperienceContainer.vue) |
| `email-copy` | the visitor copies your email (click-to-copy) | — | [`FooterComponent.vue`](../src/components/FooterComponent.vue) |
| `email-click` | the "Email me" link is clicked | — | `FooterComponent.vue` |
| `outbound` | a social link / resume is opened | `{ context: 'social' \| 'resume', url, host }` | `FooterComponent.vue` |
| `outbound` | a project link is opened | `{ context: 'project', label, section, url, host }` | [`ProjectCard.vue`](../src/components/ProjectCard.vue) |
| `outbound` | an experience link is opened | `{ context: 'experience', label, section, url, host }` | [`ExperienceCard.vue`](../src/components/ExperienceCard.vue) |

`section` is the enclosing block's title straight from your backend config (e.g.
`"Projects"`, `"Experience"`, `"Education"`), so you can slice work vs education
outbound clicks in the dashboard without hard-coding anything. `label` is the
individual item's title.

To add your own, import the helpers and call them — they no-op when analytics is
off, so no guard is needed:

```ts
import { track, trackOutbound } from '@/composables/useAnalytics'

track('cta-click', { section: 'hero' })
trackOutbound(project.url, 'project', { label: project.title, section })
```

## Verify

```sh
# the tracker script must return 200 (direct or first-party host)
curl -sI https://analytics.example.com/script.js     # 200

# a POST to the collect endpoint → 200/204 (a 400 "Website not found" = wrong UUID)
```

Then open the umami dashboard → **Realtime** to see live hits, and **Events** for
the custom events above.
