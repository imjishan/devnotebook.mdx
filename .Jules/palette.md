## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.
## 2025-05-23 - Inline Status Messages
**Learning:** Replacing native `alert()` with inline, non-blocking status messages creates a much smoother editing flow and avoids interrupting the user's focus.
**Action:** Use a temporary `statusMessage` state with auto-dismissal for success messages, and persistent rendering for errors, always using `role="alert"`.
