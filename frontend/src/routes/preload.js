// Downloads the Home page code in the background (browser idle time).
// Used on the Login/Register pages: by the time login succeeds, Home is
// already in the browser, so the redirect feels instant.
// Same file path as the lazy() import in AppRoutes, so it's the same chunk.
let preloaded = false;

export const preloadHome = () => {
  if (preloaded) return;
  preloaded = true;

  const load = () => import("../pages/Home.jsx").catch(() => {});

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(load, { timeout: 3000 });
  } else {
    setTimeout(load, 1500);
  }
};