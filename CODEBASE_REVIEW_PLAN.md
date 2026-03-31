# Weather App Codebase Review Plan

## Overall assessment

The codebase is workable and the UI composition is better than a lot of first-pass React apps, but it is not yet aligned with how strong production Next.js apps are usually structured.

The biggest gaps are:

- Too much of the app is forced into the client when Next.js could handle more on the server.
- Zustand stores currently own UI state, persistence, geolocation, and network orchestration all at once.
- Some components duplicate server/query state into local component state with `useEffect`, which adds unnecessary indirection.
- External API access is happening from the browser with `NEXT_PUBLIC_*` keys, which is usually not the right boundary for a Next.js app.

## What professional teams would usually change

### 1. Redraw the client/server boundary

Priority: High

Goals:

- Keep `app/layout.tsx` and `app/page.tsx` server-first by default.
- Move only the geolocation-dependent shell into a dedicated client entry component such as `src/features/weather/components/weather-app-client.tsx`.
- Use route handlers or server-only modules for weather/search/geocoding requests where possible.

Tasks:

- Convert `src/app/page.tsx` into a small server component that renders a client shell.
- Create a focused client component for browser-only behavior.
- Replace client imports of server actions with route handlers or server-side fetchers.
- Audit which components actually need `"use client"` and remove it anywhere it is inherited unnecessarily.

### 2. Split store responsibilities

Priority: High

Goals:

- Keep Zustand for UI state only, or at least for clearly scoped client state.
- Remove fetch logic, persistence, and browser API orchestration from the stores.

Tasks:

- Extract localStorage access into a persistence helper or repository module.
- Extract geolocation and reverse-geocoding into a dedicated service or hook.
- Extract search request logic out of `search-store.ts`.
- Keep the stores focused on selected location, search input visibility, modal state, and lightweight app UI state.

Suggested target shape:

- `src/features/weather/state/*`
- `src/features/weather/api/*`
- `src/features/weather/lib/*`
- `src/features/weather/components/*`

### 3. Stop mirroring query state into local component state

Priority: High

Goals:

- Render directly from React Query results instead of copying `data` into `useState`.

Tasks:

- Remove `weatherData` state from `src/components/main/weather.tsx`.
- Remove `weatherData` state from `src/components/weatherModal.tsx`.
- Replace `isSuccess + useEffect + setState` with derived values computed during render.
- Introduce small presentational states for loading, empty, and error views.

### 4. Replace server actions for reads with clearer data-access patterns

Priority: High

Goals:

- Use server actions primarily for mutations triggered by forms or explicit actions.
- Use route handlers, server components, or server-only fetch utilities for read-heavy data loading.

Tasks:

- Move `getWeather` into a server-only fetch module.
- Add route handlers if the browser still needs to trigger reads after geolocation/search selection.
- Centralize response validation and error normalization.

### 5. Fix secret and API-boundary strategy

Priority: High

Goals:

- Avoid exposing provider keys in the browser unless the provider explicitly expects public browser use.
- Keep weather/geocoding aggregation behind your own server boundary.

Tasks:

- Review every `NEXT_PUBLIC_*` API key.
- Move OpenWeather and OpenCage access behind server-only code.
- Decide whether Mapbox search should remain client-side or be proxied through your app.
- Add request throttling/debouncing for search.

### 6. Move to feature-based folders

Priority: Medium

Goals:

- Group by domain and behavior, not just by visual area.

Current issues:

- `main`, `shared`, and `aside` are UI-oriented buckets, but state and data concerns cut across them.
- Naming is inconsistent (`locationlist.tsx` vs `location-list-btn.tsx`, `Providers.tsx` capitalized like a class).

Suggested structure:

```text
src/
  app/
  features/
    weather/
      api/
      components/
      hooks/
      lib/
      state/
      types/
    search/
      api/
      components/
      hooks/
      state/
      types/
  components/
    ui/
  lib/
```

Tasks:

- Rename inconsistent files to kebab-case.
- Co-locate hooks, types, and components by feature.
- Keep `src/components` only for truly reusable UI primitives.

### 7. Tighten type modeling

Priority: Medium

Goals:

- Remove repeated unions and runtime `"city" in value` checks where the shape should already be known.

Tasks:

- Separate domain types more clearly: current location, saved location, search result, weather response, weather error.
- Normalize coordinates as numbers internally unless a string is required at the API edge.
- Avoid broad casts like `as LocationSaved` and `as Location`.
- Prefer discriminated unions for API success/error results.

### 8. Make components either presentational or stateful, not both

Priority: Medium

Goals:

- Keep most components simple and prop-driven.
- Push orchestration into a small number of container components/hooks.

Tasks:

- Turn weather cards into pure presentational components.
- Keep animation state local only where it is truly visual.
- Move business logic out of components like `WeatherModal`, `CurrentLocation`, and `SearchResults`.

### 9. Improve UX/data flow robustness

Priority: Medium

Tasks:

- Debounce search requests.
- Add explicit empty/error states for weather and search instead of `"Weather data is undefined"`.
- Prevent duplicate saved locations with a stable ID check before insertion.
- Add optimistic/local feedback for saved/deleted locations.
- Make modal behavior keyboard-complete and focus-managed.

### 10. Add guardrails for maintainability

Priority: Medium

Tasks:

- Add unit tests for data transforms and store behavior.
- Add component tests for search and saved-location flows.
- Add schema validation for external API responses.
- Add an architecture note explaining server/client boundaries and where data should live.

## Recommended implementation order

### Phase 1

- Redraw the client/server boundary.
- Remove browser-side API access where possible.
- Stop copying query data into local component state.

### Phase 2

- Split Zustand stores into UI state vs data/services.
- Reorganize files into feature folders.
- Improve type modeling and naming consistency.

### Phase 3

- Add tests, response validation, and stronger UX states.
- Refine modal, accessibility, and interaction details.

## Short answer

This is a solid learning project and not a bad codebase, but it is not yet how most experienced React/Next.js teams would structure a production feature. The main thing to change is not “smaller components” in isolation. It is moving responsibilities to the right layers so components render, hooks orchestrate, stores hold minimal client state, and the server handles data access.
