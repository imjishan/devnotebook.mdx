## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2024-05-24 - Password Visibility Toggle
**Learning:** Users, especially on mobile, often struggle with complex passwords. Adding a toggle visibility button reduces frustration and typing errors.
**Action:** Always include a show/hide password toggle for password inputs, ensuring the button is keyboard accessible and has proper ARIA labels.
