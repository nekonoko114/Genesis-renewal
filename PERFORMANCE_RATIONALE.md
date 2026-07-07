# Performance Rationale

**Issue:**
The original implementation attached a `scroll` event listener that updated DOM classes synchronously without any throttling. Scroll events can fire dozens of times per second (or more) when a user scrolls quickly. When the handler modifies DOM elements (adding/removing classes), it forces the browser to recalculate styles and layout. Doing this on every single scroll event can block the main thread and lead to scroll jank (frame drops).

**Optimization:**
1. **requestAnimationFrame Throttling:** I implemented a `ticking` variable and `requestAnimationFrame`. Instead of modifying the DOM on every scroll event, the code now schedules the DOM update to happen on the next screen repaint (usually 60 times a second max). If multiple scroll events fire between repaints, only one DOM update is scheduled. This significantly reduces unnecessary style recalculations and layout thrashing, keeping the main thread free.
2. **Passive Event Listener:** I added `{ passive: true }` to the `window.addEventListener('scroll', ...)` call. This signals to the browser that the event listener will not call `event.preventDefault()`. Knowing this, the browser can scroll the page immediately without waiting for the JavaScript event listener to finish executing, leading to much smoother scrolling, especially on mobile devices.

**Measured Improvement (Rationale):**
Because client-side scroll performance relies heavily on the user's browser, hardware, and specific scrolling speed, automated programmatic benchmarking of this fix is not feasible in a standard Node/CLI environment without a headless browser suite. However, the theoretical improvement is clear:
- **Baseline:** `N` scroll events -> `N` synchronous DOM updates/style calculations.
- **Improved:** `N` scroll events -> maximum `1` DOM update per animation frame (~16ms).
- **Result:** Decreased main thread blocking time and smoother scrolling experience, particularly on low-end devices and during fast scrolls.
