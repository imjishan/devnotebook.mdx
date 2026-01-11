## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2026-03-20 - Global Toast Notifications
**Learning:** Native `alert()` calls for success/failure feedback are disruptive and cannot be styled. A global toast system improves user flow.
**Action:** Implement a central `Toast` component in the app root (`App.tsx`) and pass a `showToast` function to children to display non-blocking feedback. Use `role="status"` and `aria-live="polite"` for accessibility.
