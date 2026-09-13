import { useEffect, type RefObject } from 'react';

// Expanded reading has one scroll owner. Keep the background still and keyboard
// navigation inside the expanded atlas; restore both on exit and on unmount.
export function useAtlasExpansion(
  expanded: boolean,
  atlas_ref: RefObject<HTMLElement | null>,
  expand_ref: RefObject<HTMLButtonElement | null>,
) {
  useEffect(() => {
    const atlas = atlas_ref.current;
    if (!expanded || !atlas) return;
    const expand_button = expand_ref.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const contain_focus = (event: FocusEvent) => {
      if (event.target instanceof Node && !atlas.contains(event.target))
        expand_button?.focus({ preventScroll: true });
    };
    const contain_tab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controls = [
        ...atlas.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, select, summary, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter(
        (element) =>
          element.getClientRects().length &&
          element.getAttribute('aria-hidden') !== 'true',
      );
      const first = controls[0],
        last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('focusin', contain_focus);
    atlas.addEventListener('keydown', contain_tab);
    return () => {
      document.removeEventListener('focusin', contain_focus);
      atlas.removeEventListener('keydown', contain_tab);
      document.body.style.overflow = previous;
      if (expand_button?.isConnected) {
        expand_button.focus({ preventScroll: true });
        expand_button.scrollIntoView({ block: 'nearest' });
      }
    };
  }, [expanded, atlas_ref, expand_ref]);
}
