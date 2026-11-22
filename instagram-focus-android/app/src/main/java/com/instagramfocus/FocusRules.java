package com.instagramfocus;

import java.util.Locale;

/** Pure logic for recognising Instagram's bottom-bar tabs. Kept free of Android types so it can be unit tested. */
final class FocusRules {
    enum Tab { HOME, SEARCH, REELS, OTHER }

    static final String IG_PACKAGE = "com.instagram.android";
    static final String ID_PREFIX = IG_PACKAGE + ":id/";
    static final String HOME_ID = ID_PREFIX + "feed_tab";
    static final String SEARCH_ID = ID_PREFIX + "search_tab";
    static final String REELS_ID = ID_PREFIX + "clips_tab";
    static final String TAB_BAR_ID = ID_PREFIX + "tab_bar";

    private FocusRules() {}

    /** Recognises a tab from its view ID (most reliable). */
    static Tab fromViewId(String viewId) {
        if (viewId == null) return Tab.OTHER;
        switch (viewId) {
            case HOME_ID: return Tab.HOME;
            case SEARCH_ID: return Tab.SEARCH;
            case REELS_ID: return Tab.REELS;
            default: return Tab.OTHER;
        }
    }

    /**
     * Fallback for when Instagram renames its view IDs: recognises a tab-bar button by its
     * accessibility label. Only use this on children of the bottom tab bar, never on feed content.
     */
    static Tab fromTabLabel(CharSequence label) {
        if (label == null) return Tab.OTHER;
        String s = label.toString().trim().toLowerCase(Locale.ROOT);
        if (s.startsWith("home")) return Tab.HOME;
        if (s.startsWith("search") || s.contains("explore")) return Tab.SEARCH;
        if (s.startsWith("reels")) return Tab.REELS;
        return Tab.OTHER;
    }

    /**
     * Stricter fallback for any node (not only tab-bar children): the label has to be exactly a
     * tab name, so captions or posts that merely mention "reels" don't count.
     */
    static Tab fromExactLabel(CharSequence label) {
        if (label == null) return Tab.OTHER;
        switch (label.toString().trim().toLowerCase(Locale.ROOT)) {
            case "home": return Tab.HOME;
            case "search": case "explore": case "search and explore": return Tab.SEARCH;
            case "reels": return Tab.REELS;
            default: return Tab.OTHER;
        }
    }

    static boolean isBlocked(Tab tab, boolean blockSearch, boolean blockReels) {
        return (tab == Tab.SEARCH && blockSearch) || (tab == Tab.REELS && blockReels);
    }
}
