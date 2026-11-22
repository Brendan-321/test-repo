package com.instagramfocus;

import android.content.Context;
import android.content.SharedPreferences;

final class Prefs {
    static final String BLOCK_SEARCH = "block_search";
    static final String BLOCK_REELS = "block_reels";

    private Prefs() {}

    static SharedPreferences get(Context c) {
        return c.getSharedPreferences("focus", Context.MODE_PRIVATE);
    }

    static boolean blockSearch(Context c) { return get(c).getBoolean(BLOCK_SEARCH, true); }
    static boolean blockReels(Context c) { return get(c).getBoolean(BLOCK_REELS, true); }
}
