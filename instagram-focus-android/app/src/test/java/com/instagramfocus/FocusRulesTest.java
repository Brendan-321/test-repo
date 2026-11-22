package com.instagramfocus;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import com.instagramfocus.FocusRules.Tab;
import org.junit.Test;

public class FocusRulesTest {
    @Test public void recognisesTabsByViewId() {
        assertEquals(Tab.HOME, FocusRules.fromViewId("com.instagram.android:id/feed_tab"));
        assertEquals(Tab.SEARCH, FocusRules.fromViewId("com.instagram.android:id/search_tab"));
        assertEquals(Tab.REELS, FocusRules.fromViewId("com.instagram.android:id/clips_tab"));
        assertEquals(Tab.OTHER, FocusRules.fromViewId("com.instagram.android:id/profile_tab"));
        assertEquals(Tab.OTHER, FocusRules.fromViewId("com.other.app:id/clips_tab"));
        assertEquals(Tab.OTHER, FocusRules.fromViewId(null));
    }

    @Test public void recognisesTabsByLabel() {
        assertEquals(Tab.HOME, FocusRules.fromTabLabel("Home"));
        assertEquals(Tab.SEARCH, FocusRules.fromTabLabel("Search and explore"));
        assertEquals(Tab.SEARCH, FocusRules.fromTabLabel("Explore"));
        assertEquals(Tab.REELS, FocusRules.fromTabLabel("Reels"));
        assertEquals(Tab.OTHER, FocusRules.fromTabLabel("Profile"));
        assertEquals(Tab.OTHER, FocusRules.fromTabLabel(null));
    }

    @Test public void exactLabelIgnoresCaptionsMentioningReels() {
        assertEquals(Tab.REELS, FocusRules.fromExactLabel("Reels"));
        assertEquals(Tab.SEARCH, FocusRules.fromExactLabel("Search and explore"));
        assertEquals(Tab.HOME, FocusRules.fromExactLabel(" Home "));
        assertEquals(Tab.OTHER, FocusRules.fromExactLabel("Reels by a friend"));
        assertEquals(Tab.OTHER, FocusRules.fromExactLabel("Home workout tips"));
    }

    @Test public void onlyTrustsLabelsInTheTabBarStrip() {
        // Window from y=0 to y=2400; tab bar sits at the bottom (~2250-2400).
        assertTrue(FocusRules.isInTabBarRegion(2260, 2390, 0, 2400));
        // A post in the feed whose alt text says "Reels" or "Home" must not count.
        assertFalse(FocusRules.isInTabBarRegion(800, 1600, 0, 2400));
        // A tall element that merely reaches into the strip doesn't count either.
        assertFalse(FocusRules.isInTabBarRegion(1900, 2400, 0, 2400));
        // Nonsense bounds are rejected.
        assertFalse(FocusRules.isInTabBarRegion(2300, 2300, 0, 2400));
        assertFalse(FocusRules.isInTabBarRegion(2300, 2390, 0, 0));
    }

    @Test public void respectsSettings() {
        assertTrue(FocusRules.isBlocked(Tab.SEARCH, true, true));
        assertTrue(FocusRules.isBlocked(Tab.REELS, true, true));
        assertFalse(FocusRules.isBlocked(Tab.HOME, true, true));
        assertFalse(FocusRules.isBlocked(Tab.REELS, true, false));
        assertFalse(FocusRules.isBlocked(Tab.SEARCH, false, true));
    }
}
