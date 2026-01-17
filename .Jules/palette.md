## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2026-10-27 - Local Status vs Global Toasts
**Learning:** For small admin panels, a full global toast provider is often overkill. A local `status` state object (`{ type: 'success', message: '...' }`) with `role="status"` and a 3-second auto-dismiss is sufficient, lighter, and easier to verify.
**Action:** Use the local status pattern for simple form feedbacks instead of installing new libraries or building complex context providers.
