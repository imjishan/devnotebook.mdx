## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2025-10-27 - Non-blocking Success Feedback
**Learning:** Native `alert()` dialogs for success states block user flow. Auto-dismissing inline messages feel smoother.
**Action:** Use a local `status` state with `role="status"` for success messages, and use a `useEffect` to clear the message after 3 seconds.

## 2025-10-28 - Feedback Before Navigation
**Learning:** When a success action triggers a view change (like closing a modal), inline messages can disappear too fast or be missed if the component unmounts immediately.
**Action:** Implement a delay (e.g., `setTimeout(() => onClose(), 2000)`) after setting the success status to ensure the user perceives the feedback.
