package com.instagramfocus;

import android.accessibilityservice.AccessibilityService;
import android.graphics.Rect;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;

import java.util.List;

/**
 * Watches the Instagram app (and only that app — see res/xml/focus_service.xml). When the
 * Search/Explore or Reels tab is opened, it taps the Home tab for you.
 */
public class FocusService extends AccessibilityService {
    private static final long CHECK_DELAY_MS = 150;
    private static final long REDIRECT_COOLDOWN_MS = 600;

    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable checkRunnable = this::checkCurrentTab;
    private boolean checkScheduled;
    private long lastRedirectAt;

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        try {
            handleEvent(event);
        } catch (RuntimeException e) {
            // Screen elements can go stale mid-lookup while Instagram redraws. Ignore and carry on
            // rather than crash; the next event re-checks the screen.
        }
    }

    private void handleEvent(AccessibilityEvent event) {
        if (event.getPackageName() == null
                || !FocusRules.IG_PACKAGE.contentEquals(event.getPackageName())) {
            return;
        }

        // Fast path: the user just tapped a blocked tab.
        if (event.getEventType() == AccessibilityEvent.TYPE_VIEW_CLICKED) {
            AccessibilityNodeInfo source = event.getSource();
            if (source != null) {
                FocusRules.Tab tapped = FocusRules.fromViewId(source.getViewIdResourceName());
                AccessibilityNodeInfo root = getRootInActiveWindow();
                if (tapped == FocusRules.Tab.OTHER && isInTabBar(source, root)) {
                    tapped = FocusRules.fromExactLabel(source.getContentDescription());
                }
                if (isBlocked(tapped)) {
                    goHome(root);
                    return;
                }
            }
        }

        // Otherwise (app opened, screen changed, etc.) check which tab is showing, throttled.
        if (!checkScheduled) {
            checkScheduled = true;
            handler.postDelayed(checkRunnable, CHECK_DELAY_MS);
        }
    }

    private void checkCurrentTab() {
        checkScheduled = false;
        try {
            AccessibilityNodeInfo root = getRootInActiveWindow();
            if (!isInstagram(root)) return;
            if (isBlocked(selectedTab(root))) goHome(root);
        } catch (RuntimeException e) {
            // Stale screen elements; the next event re-checks.
        }
    }

    /** Works out which bottom-bar tab is selected, by view ID first and by label as a fallback. */
    private FocusRules.Tab selectedTab(AccessibilityNodeInfo root) {
        for (String id : new String[] {FocusRules.SEARCH_ID, FocusRules.REELS_ID, FocusRules.HOME_ID}) {
            for (AccessibilityNodeInfo node : root.findAccessibilityNodeInfosByViewId(id)) {
                if (node.isSelected()) return FocusRules.fromViewId(id);
            }
        }
        for (AccessibilityNodeInfo bar : root.findAccessibilityNodeInfosByViewId(FocusRules.TAB_BAR_ID)) {
            for (int i = 0; i < bar.getChildCount(); i++) {
                AccessibilityNodeInfo child = bar.getChild(i);
                if (child != null && child.isSelected()) {
                    return FocusRules.fromTabLabel(child.getContentDescription());
                }
            }
        }
        for (String label : new String[] {"Search and explore", "Search", "Explore", "Reels"}) {
            for (AccessibilityNodeInfo node : root.findAccessibilityNodeInfosByText(label)) {
                FocusRules.Tab tab = FocusRules.fromExactLabel(node.getContentDescription());
                if (tab != FocusRules.Tab.OTHER && node.isSelected() && isInTabBar(node, root)) return tab;
            }
        }
        return FocusRules.Tab.OTHER;
    }

    private void goHome(AccessibilityNodeInfo root) {
        // Only ever act while Instagram is the app on screen.
        if (!isInstagram(root)) return;
        long now = SystemClock.uptimeMillis();
        if (now - lastRedirectAt < REDIRECT_COOLDOWN_MS) return;
        lastRedirectAt = now;

        if (clickHomeTab(root)) return;
        // Couldn't find the Home button: leave the blocked screen with Back instead.
        performGlobalAction(GLOBAL_ACTION_BACK);
    }

    private boolean clickHomeTab(AccessibilityNodeInfo root) {
        List<AccessibilityNodeInfo> homes = root.findAccessibilityNodeInfosByViewId(FocusRules.HOME_ID);
        for (AccessibilityNodeInfo home : homes) {
            if (clickSelfOrParent(home)) return true;
        }
        for (AccessibilityNodeInfo bar : root.findAccessibilityNodeInfosByViewId(FocusRules.TAB_BAR_ID)) {
            for (int i = 0; i < bar.getChildCount(); i++) {
                AccessibilityNodeInfo child = bar.getChild(i);
                if (child != null
                        && FocusRules.fromTabLabel(child.getContentDescription()) == FocusRules.Tab.HOME
                        && clickSelfOrParent(child)) {
                    return true;
                }
            }
        }
        for (AccessibilityNodeInfo node : root.findAccessibilityNodeInfosByText("Home")) {
            if (FocusRules.fromExactLabel(node.getContentDescription()) == FocusRules.Tab.HOME
                    && isInTabBar(node, root)
                    && clickSelfOrParent(node)) {
                return true;
            }
        }
        return false;
    }

    /** Only trust label matches for nodes inside the tab-bar strip (see FocusRules.isInTabBarRegion). */
    private static boolean isInTabBar(AccessibilityNodeInfo node, AccessibilityNodeInfo root) {
        if (node == null || root == null) return false;
        Rect n = new Rect();
        Rect w = new Rect();
        node.getBoundsInScreen(n);
        root.getBoundsInScreen(w);
        return FocusRules.isInTabBarRegion(n.top, n.bottom, w.top, w.bottom);
    }

    private static boolean clickSelfOrParent(AccessibilityNodeInfo node) {
        for (int depth = 0; node != null && depth < 3; depth++, node = node.getParent()) {
            if (node.isClickable()) return node.performAction(AccessibilityNodeInfo.ACTION_CLICK);
        }
        return false;
    }

    private static boolean isInstagram(AccessibilityNodeInfo root) {
        return root != null && root.getPackageName() != null
                && FocusRules.IG_PACKAGE.contentEquals(root.getPackageName());
    }

    private boolean isBlocked(FocusRules.Tab tab) {
        return FocusRules.isBlocked(tab, Prefs.blockSearch(this), Prefs.blockReels(this));
    }

    @Override
    public void onInterrupt() {}

    @Override
    public void onDestroy() {
        handler.removeCallbacks(checkRunnable);
        super.onDestroy();
    }
}
