// Instagram is a single-page app: clicking "Reels" or "Explore" changes the URL
// without a full page load, so the network rules alone can't catch it. This
// script watches the URL, bounces blocked pages back to the home feed, and
// tags <html> with classes that content.css uses to hide the nav buttons.
(() => {
  const api = globalThis.browser ?? globalThis.chrome;
  const DEFAULTS = { blockSearch: true, blockReels: true, blockSingleReels: false };
  let settings = { ...DEFAULTS };

  const isBlocked = (path) =>
    (settings.blockSearch && /^\/explore(\/|$)/.test(path)) ||
    (settings.blockReels && /^\/reels(\/|$)/.test(path)) ||
    (settings.blockSingleReels && /^\/([^/]+\/)?reels?\/[^/]+/.test(path));

  function applyClasses() {
    const root = document.documentElement;
    if (!root) return;
    root.classList.toggle("igf-block-search", settings.blockSearch);
    root.classList.toggle("igf-block-reels", settings.blockReels);
  }

  function check() {
    applyClasses();
    if (isBlocked(location.pathname)) location.replace("/");
  }

  // Hide nav buttons right away using defaults (avoids a flash), but only redirect
  // once the saved settings are loaded. Full page loads are already covered by
  // the network rules in rules/.
  applyClasses();
  api.storage.sync.get(DEFAULTS).then((saved) => {
    settings = { ...DEFAULTS, ...saved };
    check();
  });
  api.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key in DEFAULTS) settings[key] = newValue ?? DEFAULTS[key];
    }
    check();
  });

  // Catch in-app navigation.
  let lastPath = location.pathname;
  const onMaybeNavigated = () => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      check();
    }
  };
  setInterval(onMaybeNavigated, 250);
  window.addEventListener("popstate", onMaybeNavigated);
  globalThis.navigation?.addEventListener?.("navigatesuccess", onMaybeNavigated);
})();
