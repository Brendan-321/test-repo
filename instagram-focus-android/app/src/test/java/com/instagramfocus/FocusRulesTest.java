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

    @Test public void respectsSettings() {
        assertTrue(FocusRules.isBlocked(Tab.SEARCH, true, true));
        assertTrue(FocusRules.isBlocked(Tab.REELS, true, true));
        assertFalse(FocusRules.isBlocked(Tab.HOME, true, true));
        assertFalse(FocusRules.isBlocked(Tab.REELS, true, false));
        assertFalse(FocusRules.isBlocked(Tab.SEARCH, false, true));
    }
}
