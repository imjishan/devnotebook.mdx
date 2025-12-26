## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2024-05-24 - Accessible Card Pattern
**Learning:** Using `div` with `onClick` for cards creates keyboard traps and poor screen reader experiences.
**Action:** Use the "stretched link" pattern: nest a `<button>` inside the card's heading with `before:absolute before:inset-0` to make the entire card clickable while maintaining semantic structure and keyboard navigation.
