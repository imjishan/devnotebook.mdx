## 2024-05-23 - Admin Login Accessibility
**Learning:** Replacing native `alert()` with inline error messages significantly improves perceived polish and accessibility.
**Action:** Always use `role="alert"` and `aria-describedby` when displaying form errors inline.

## 2026-01-01 - Accessible Card Pattern
**Learning:** Making entire cards clickable by adding `onClick` to container divs hurts accessibility.
**Action:** Use a semantic `<button>` inside the card's heading with `before:absolute before:inset-0` to cover the card. This preserves keyboard navigation and screen reader semantics.

## 2025-02-18 - Async Status Patterns
**Learning:** When replacing modal alerts with inline status messages, it is critical to explicitly clear the status state (setStatus(null)) before initiating new async actions. Failing to do so can leave stale error messages visible while the new action is processing.
**Action:** Always reset status state at the start of an action handler.
