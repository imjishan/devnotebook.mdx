## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2025-05-24 - Inline Status Feedback
**Learning:** For simple dashboards without a global toast system, a local `status` state with an auto-dismiss `useEffect` is a lightweight alternative to `alert()`.
**Action:** Replace `alert()` success messages with a temporary inline banner using `role="status"` to maintain accessibility without blocking the user.
