## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2026-01-26 - Admin Editor Accessibility
**Learning:** Async actions (like publishing) should show a success state briefly before closing the modal, otherwise the user misses the feedback.
**Action:** Use a delayed closure (e.g., `setTimeout(onClose, 1500)`) after showing a success message for modal forms.
