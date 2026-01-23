## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2026-05-21 - Inline Status Pattern
**Learning:** Lacking a global toast system, local `status` state with `role="status"` and auto-dismissal provides a lightweight, accessible alternative to `alert()`.
**Action:** Prefer local `status` state over new dependencies for feedback. Use `role="status"` for success.
