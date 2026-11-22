const api = globalThis.browser ?? globalThis.chrome;
const DEFAULTS = { blockSearch: true, blockReels: true, blockSingleReels: false };

api.storage.sync.get(DEFAULTS).then((settings) => {
  for (const key of Object.keys(DEFAULTS)) {
    const box = document.getElementById(key);
    box.checked = settings[key];
    box.addEventListener("change", () => api.storage.sync.set({ [key]: box.checked }));
  }
});
