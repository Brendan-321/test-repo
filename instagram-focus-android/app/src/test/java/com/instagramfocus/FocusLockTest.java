package com.instagramfocus;

import static com.instagramfocus.FocusLock.MINUTE;
import static com.instagramfocus.FocusLock.WINDOW_MS;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import com.instagramfocus.FocusLock.Phase;
import org.junit.Test;

public class FocusLockTest {
    private static final long WAIT = 30 * MINUTE;
    private static final long T0 = 1_700_000_000_000L; // wall clock at request
    private static final long U0 = 5 * MINUTE;         // uptime at request

    @Test public void phasesFollowTheWaitAndWindow() {
        assertEquals(Phase.OFF, FocusLock.phase(false, WAIT, 0, 0));
        assertEquals(Phase.LOCKED, FocusLock.phase(true, WAIT, 0, 0));
        assertEquals(Phase.WAITING, FocusLock.phase(true, WAIT, T0, 0));
        assertEquals(Phase.WAITING, FocusLock.phase(true, WAIT, T0, WAIT - 1));
        assertEquals(Phase.UNLOCKED, FocusLock.phase(true, WAIT, T0, WAIT));
        assertEquals(Phase.UNLOCKED, FocusLock.phase(true, WAIT, T0, WAIT + WINDOW_MS - 1));
        assertEquals(Phase.LOCKED, FocusLock.phase(true, WAIT, T0, WAIT + WINDOW_MS));
    }

    @Test public void onlyUnlockedOrNoLockAllowsTurningOff() {
        assertTrue(FocusLock.canTurnOff(Phase.OFF));
        assertTrue(FocusLock.canTurnOff(Phase.UNLOCKED));
        assertFalse(FocusLock.canTurnOff(Phase.LOCKED));
        assertFalse(FocusLock.canTurnOff(Phase.WAITING));
    }

    @Test public void movingTheClockForwardDoesNotSkipTheWait() {
        // 1 minute of real time passes, but the phone's clock is moved forward 2 hours.
        long elapsed = FocusLock.elapsedSinceRequest(T0, U0, 7, T0 + 120 * MINUTE, U0 + MINUTE, 7);
        assertEquals(MINUTE, elapsed);
        assertEquals(Phase.WAITING, FocusLock.phase(true, WAIT, T0, elapsed));
    }

    @Test public void movingTheClockBackDoesNotBreakAnything() {
        long elapsed = FocusLock.elapsedSinceRequest(T0, U0, 7, T0 - 120 * MINUTE, U0 + 10 * MINUTE, 7);
        assertEquals(10 * MINUTE, elapsed);
    }

    @Test public void afterARestartFallsBackToTheWallClock() {
        long elapsed = FocusLock.elapsedSinceRequest(T0, U0, 7, T0 + 40 * MINUTE, MINUTE, 8);
        assertEquals(40 * MINUTE, elapsed);
        // A wall clock set before the request never gives negative time.
        assertEquals(0, FocusLock.elapsedSinceRequest(T0, U0, 7, T0 - MINUTE, MINUTE, 8));
    }

    @Test public void remainingTimeAndFormatting() {
        assertEquals(WAIT - MINUTE, FocusLock.remainingMs(Phase.WAITING, WAIT, MINUTE));
        assertEquals(WINDOW_MS, FocusLock.remainingMs(Phase.UNLOCKED, WAIT, WAIT));
        assertEquals(0, FocusLock.remainingMs(Phase.LOCKED, WAIT, 0));
        assertEquals("29:00", FocusLock.formatRemaining(29 * MINUTE));
        assertEquals("0:01", FocusLock.formatRemaining(1));
        assertEquals("4:00:00", FocusLock.formatRemaining(240 * MINUTE));
        assertEquals("30 minutes", FocusLock.formatWait(30));
        assertEquals("1 hour", FocusLock.formatWait(60));
        assertEquals("4 hours", FocusLock.formatWait(240));
    }
}
