# Weather UI Polish Plan: Compass, Location Transitions, and Mobile Navigation

## Summary

Refine the weather experience in three connected areas:

- simplify the wind compass into a cleaner iOS-minimal dial
- fix location-switch transitions so old content exits fully before new data appears
- add a mobile navigation path for locations with a slide-over drawer and swipe-based location switching on the main weather view

This plan is a standalone markdown file dedicated to this work, separate from the broader codebase review document.

## Key Changes

### 1. Clean, simple compass redesign

- Redesign the compass in the wind card as a restrained dial with:
  - one primary outer ring
  - one faint inner guide ring
  - cardinal labels only: `N`, `E`, `S`, `W`
  - a centered direction badge for the precise heading
  - one clear north/needle accent as the only saturated color
- Remove the extra circular overlays and visual clutter from the current compass.
- Keep the wind-unit toggle at the card level; the compass remains visual, not interactive.
- Extract the compass portion of the wind card into a dedicated presentational subcomponent so the dial styling and motion are isolated from the rest of the wind metric layout.

### 2. Fix location-switch transition sequencing

- Change the main weather rendering so a location change does not immediately replace the data inside the currently visible view.
- Introduce a two-phase transition model:
  - current weather content receives an exit animation
  - only after exit completes does the app commit the next location as the rendered weather view
- Maintain separate concepts for:
  - selected/target location
  - currently rendered location
- Use keyed motion containers or `AnimatePresence` with an explicit sequencing mode so the previous weather view leaves before the next one mounts.
- Ensure the animation state is driven by location identity, not by raw query result changes.
- Keep previous weather data visible during exit; avoid showing the next location’s numbers while the previous screen is still animating out.
- Preserve loading behavior so:
  - if next-location data is already available, the new screen enters immediately after exit
  - if next-location data is still loading, show a loading transition/skeleton only after the old screen has finished leaving

### 3. Mobile side menu access

- Add a mobile-only slide-over drawer for search and saved locations.
- Reuse the existing sidebar icon in the search/header area as the drawer trigger.
- Drawer behavior:
  - opens from the left
  - overlays the weather content with a dimmed backdrop
  - can close by backdrop tap, explicit close action, or selecting a location
  - traps focus appropriately while open
- Reuse the existing sidebar content structure where possible instead of creating a second mobile-only location management UI.
- Keep desktop behavior unchanged: persistent sidebar on `md+`, drawer on smaller screens only.

### 4. Swipe-based location switching on mobile

- Add horizontal swipe navigation on the main weather view for mobile only.
- Swiping left/right should move through an ordered location list:
  - current location first if available
  - then saved locations in the existing visible order
- The swipe gesture should update the target location and use the same exit-then-enter transition system as taps from the location list.
- Only trigger navigation after a clear threshold so ordinary scrolling/tapping does not accidentally change locations.
- Keep swipe-to-delete behavior inside the saved-location list separate from swipe-to-switch in the main content.
- Prevent gesture conflicts by limiting location-switch swipes to the main weather area, not the drawer list.

## Public Interfaces / State Changes

- Add a dedicated internal compass subcomponent that accepts only the heading degree and derived direction label.
- Introduce internal weather-view transition state, separating:
  - `displayedLocation` or equivalent rendered location
  - `pendingLocation` or equivalent next selection
- Add internal UI state for the mobile drawer open/closed status.
- Define a single derived ordered list of navigable locations for swipe navigation so taps and swipes share the same source of truth.

## Test Plan

- Compass:
  - verify `0`, `90`, `180`, `270`, and diagonal headings render correct rotation and direction labels
  - verify mobile and desktop sizes do not clip labels or center badge
- Location transitions:
  - switch between two saved locations and confirm the old content exits before the new content appears
  - switch between current location and saved locations and confirm no mixed-data frames appear during animation
  - verify behavior when the next location is still loading
- Mobile drawer:
  - open via sidebar button
  - close via backdrop tap
  - close after location selection
  - confirm desktop sidebar remains persistent and unchanged
- Mobile swipe navigation:
  - swipe left/right through current and saved locations in order
  - verify threshold prevents accidental switches
  - confirm swipe navigation uses the same transition sequence as list selection
  - confirm list swipe-to-delete still works independently inside the drawer/list area

## Assumptions

- Visual direction for the compass: iOS minimal.
- Compass interaction model: keep unit toggling on the full wind card; compass itself is not interactive.
- Compass labels: cardinals only.
- Mobile navigation pattern: slide-over drawer from the left.
- Mobile location switching pattern: horizontal swipe on the main weather view.
- This plan lives in its own dedicated file, not in `CODEBASE_REVIEW_PLAN.md`.
