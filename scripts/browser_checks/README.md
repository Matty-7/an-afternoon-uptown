# Mortgage focus regression

`mortgage_focus.mjs` checks the rendered Mortgage Map, including both reader
focus and expansion effects. It is an opt-in browser check, not part of `npm
test` or GitHub CI. No additional browser package is required.

Follow the current `control-browser` skill and start the supported Sites preview.
In that skill's Node REPL, load `check_mortgage_focus` with its Node assertion
import and use the existing tab handle. If the browser runtime cannot access the
checkout, read the script through the executor and evaluate its function in that
same Node REPL; do not start a different browser. Keep the assertion import as
`const assert = (await import('node:assert/strict')).default` and omit `export`
when evaluating the function directly.

Open one of the existing `/__audit/mortgage_desktop`,
`/__audit/mortgage_mobile` or `/__audit/mortgage_short` routes on the supported
internal preview origin. Confirm the map has loaded and its search is ready,
then call `await check_mortgage_focus(tab, 'desktop')` (or `mobile` / `short`).
The check requires normal mode initially and resets the map to its overview.

It verifies retained reader content, settled expansion-button focus and restored
body overflow on exit; normal and expanded concept/history/section focus;
keyboard containment; and two-stage Escape. All actions use visible controls,
and DOM evaluation is read-only. Record the actual source revision and results
in the PR. These are Chrome CSS-viewport checks, not physical touch, Safari,
screen-reader or production-browser coverage.
