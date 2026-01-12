## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2026-10-24 - Inline Success Feedback
**Learning:** Replacing `alert("Success")` with temporary inline state changes (e.g., button text changing to "Saved!") provides a smoother, non-blocking experience.
**Action:** Use a temporary status state (e.g., `'idle' | 'saved'`) and `setTimeout` to revert it, rather than blocking the user with native dialogs.
