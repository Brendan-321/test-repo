// Keeps the network-level redirect rules in sync with the user's settings.
const api = globalThis.browser ?? globalThis.chrome;

const DEFAULTS = { blockSearch: true, blockReels: true, blockSingleReels: false };
const RULESETS = {
  blockSearch: "block_search",
  blockReels: "block_reels",
  blockSingleReels: "block_single_reels",
};

async function syncRulesets() {
  const settings = { ...DEFAULTS, ...(await api.storage.sync.get(DEFAULTS)) };
  const enableRulesetIds = [];
  const disableRulesetIds = [];
  for (const [key, id] of Object.entries(RULESETS)) {
    (settings[key] ? enableRulesetIds : disableRulesetIds).push(id);
  }
  await api.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds, disableRulesetIds });
}

api.runtime.onInstalled.addListener(syncRulesets);
api.runtime.onStartup.addListener(syncRulesets);
api.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") syncRulesets();
});
