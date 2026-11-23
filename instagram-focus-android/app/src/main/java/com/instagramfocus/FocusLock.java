package com.instagramfocus;

/**
 * The settings lock: once locked, blocks can always be turned on, but turning one off needs an
 * unlock request followed by a waiting period. After the wait there's a short window to make
 * changes, then it locks again by itself.
 *
 * Pure logic (no Android types) so it can be unit tested.
 */
final class FocusLock {
    enum Phase { OFF, LOCKED, WAITING, UNLOCKED }

    static final long MINUTE = 60_000L;
    /** How long you get to make changes once the wait is over. */
    static final long WINDOW_MS = 5 * MINUTE;
    static final int[] WAIT_CHOICES_MIN = {15, 30, 60, 240};
    static final int DEFAULT_WAIT_MIN = 30;

    private FocusLock() {}

    /**
     * Time since the unlock was requested. Uses the time since the phone started, which can't be
     * changed by moving the phone's clock forward. Only if the phone has restarted since the
     * request does it fall back to the wall clock. Never negative.
     *
     * If the phone's boot count isn't available, a restart can make this read lower than the real
     * time (never higher), so the wait can only get longer, not shorter.
     */
    static long elapsedSinceRequest(long requestWall, long requestUptime, int requestBoot,
                                    long nowWall, long nowUptime, int nowBoot) {
        if (nowBoot == requestBoot && nowUptime >= requestUptime) return nowUptime - requestUptime;
        return Math.max(0, nowWall - requestWall);
    }

    /** {@code requestWall == 0} means no unlock has been requested. */
    static Phase phase(boolean lockEnabled, long waitMs, long requestWall, long elapsed) {
        if (!lockEnabled) return Phase.OFF;
        if (requestWall == 0) return Phase.LOCKED;
        if (elapsed < waitMs) return Phase.WAITING;
        if (elapsed < waitMs + WINDOW_MS) return Phase.UNLOCKED;
        return Phase.LOCKED; // the unlock window has run out
    }

    /** Milliseconds left in the current phase (wait or unlock window); 0 for OFF and LOCKED. */
    static long remainingMs(Phase phase, long waitMs, long elapsed) {
        switch (phase) {
            case WAITING: return waitMs - elapsed;
            case UNLOCKED: return waitMs + WINDOW_MS - elapsed;
            default: return 0;
        }
    }

    /** Turning a block off is only allowed with no lock, or during the unlock window. */
    static boolean canTurnOff(Phase phase) {
        return phase == Phase.OFF || phase == Phase.UNLOCKED;
    }

    /** "4:05", or "1:02:03" for an hour or more. Rounds up so it never shows 0:00 early. */
    static String formatRemaining(long ms) {
        long totalSec = Math.max(0, (ms + 999) / 1000);
        long h = totalSec / 3600, m = (totalSec % 3600) / 60, s = totalSec % 60;
        return h > 0 ? String.format(java.util.Locale.ROOT, "%d:%02d:%02d", h, m, s)
                     : String.format(java.util.Locale.ROOT, "%d:%02d", m, s);
    }

    static String formatWait(int minutes) {
        if (minutes % 60 == 0) {
            int h = minutes / 60;
            return h == 1 ? "1 hour" : h + " hours";
        }
        return minutes + " minutes";
    }
}
