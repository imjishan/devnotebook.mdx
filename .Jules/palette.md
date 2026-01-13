## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2026-02-17 - Local Feedback Pattern
**Learning:** For components without global toast access, managing a local `status` state object `{ type: 'success' | 'error', message: string }` works well.
**Action:** Use `role="alert"` for errors and `role="status"` for success. Auto-dismiss success messages after 3s.
