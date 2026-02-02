## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2025-10-27 - Non-blocking Success Feedback
**Learning:** Native `alert()` dialogs for success states block user flow. Auto-dismissing inline messages feel smoother.
**Action:** Use a local `status` state with `role="status"` for success messages, and use a `useEffect` to clear the message after 3 seconds.

## 2026-10-28 - Delayed Navigation for Feedback
**Learning:** When replacing blocking alerts with inline feedback before a navigation action (like closing a modal), the user needs time to read the message before the component unmounts.
**Action:** Introduce a short delay (e.g., 2000ms) using `setTimeout` after setting the success state and before triggering the navigation/close callback.
