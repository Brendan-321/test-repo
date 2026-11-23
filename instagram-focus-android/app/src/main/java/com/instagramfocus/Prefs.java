package com.instagramfocus;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.SystemClock;
import android.provider.Settings;

final class Prefs {
    static final String BLOCK_SEARCH = "block_search";
    static final String BLOCK_REELS = "block_reels";

    private static final String LOCK_ENABLED = "lock_enabled";
    private static final String LOCK_WAIT_MIN = "lock_wait_min";
    private static final String UNLOCK_WALL = "unlock_req_wall";
    private static final String UNLOCK_UPTIME = "unlock_req_uptime";
    private static final String UNLOCK_BOOT = "unlock_req_boot";

    private Prefs() {}

    static SharedPreferences get(Context c) {
        return c.getSharedPreferences("focus", Context.MODE_PRIVATE);
    }

    static boolean blockSearch(Context c) { return get(c).getBoolean(BLOCK_SEARCH, true); }
    static boolean blockReels(Context c) { return get(c).getBoolean(BLOCK_REELS, true); }

    // ---- Settings lock ----

    static int lockWaitMinutes(Context c) {
        return get(c).getInt(LOCK_WAIT_MIN, FocusLock.DEFAULT_WAIT_MIN);
    }

    static void setLockWaitMinutes(Context c, int minutes) {
        get(c).edit().putInt(LOCK_WAIT_MIN, minutes).apply();
    }

    static void setLockEnabled(Context c, boolean enabled) {
        get(c).edit().putBoolean(LOCK_ENABLED, enabled).remove(UNLOCK_WALL).remove(UNLOCK_UPTIME)
                .remove(UNLOCK_BOOT).apply();
    }

    static void requestUnlock(Context c) {
        get(c).edit()
                .putLong(UNLOCK_WALL, System.currentTimeMillis())
                .putLong(UNLOCK_UPTIME, SystemClock.elapsedRealtime())
                .putInt(UNLOCK_BOOT, bootCount(c))
                .apply();
    }

    static void clearUnlockRequest(Context c) {
        get(c).edit().remove(UNLOCK_WALL).remove(UNLOCK_UPTIME).remove(UNLOCK_BOOT).apply();
    }

    /** Current lock phase, plus how much time is left in it. */
    static final class LockStatus {
        final FocusLock.Phase phase;
        final long remainingMs;
        LockStatus(FocusLock.Phase phase, long remainingMs) {
            this.phase = phase;
            this.remainingMs = remainingMs;
        }
    }

    static LockStatus lockStatus(Context c) {
        SharedPreferences p = get(c);
        long waitMs = lockWaitMinutes(c) * FocusLock.MINUTE;
        long requestWall = p.getLong(UNLOCK_WALL, 0);
        long elapsed = requestWall == 0 ? 0 : FocusLock.elapsedSinceRequest(
                requestWall, p.getLong(UNLOCK_UPTIME, 0), p.getInt(UNLOCK_BOOT, -1),
                System.currentTimeMillis(), SystemClock.elapsedRealtime(), bootCount(c));
        FocusLock.Phase phase = FocusLock.phase(p.getBoolean(LOCK_ENABLED, false), waitMs, requestWall, elapsed);
        if (phase == FocusLock.Phase.LOCKED && requestWall != 0) clearUnlockRequest(c); // window ran out
        return new LockStatus(phase, FocusLock.remainingMs(phase, waitMs, elapsed));
    }

    private static int bootCount(Context c) {
        return Settings.Global.getInt(c.getContentResolver(), Settings.Global.BOOT_COUNT, -1);
    }
}
