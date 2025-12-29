## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2024-05-24 - Accessible Card Pattern
**Learning:** For clickable cards, wrapping the main heading text in a `<button>` with a `before:absolute before:inset-0` pseudo-element provides a fully clickable area while preserving semantic structure and text selectability.
**Action:** Avoid `div` with `onClick`. Use the semantic button-in-heading pattern for card-based navigation.
