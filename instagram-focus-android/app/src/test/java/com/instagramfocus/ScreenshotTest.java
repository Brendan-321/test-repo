package com.instagramfocus;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.provider.Settings;
import android.view.View;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.android.controller.ActivityController;
import org.robolectric.annotation.Config;
import org.robolectric.annotation.GraphicsMode;

import java.io.File;
import java.io.FileOutputStream;

/** Renders the settings screen and launcher icon to build/screenshots so the design can be checked. */
@RunWith(RobolectricTestRunner.class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = 34, qualifiers = "w411dp-h891dp-xxhdpi")
public class ScreenshotTest {
    private static final File OUT = new File("build/screenshots");

    @Test public void lightOff() throws Exception { capture("light-off", false); }
    @Test public void lightOn() throws Exception { capture("light-on", true); }
    @Test @Config(qualifiers = "+night") public void darkOff() throws Exception { capture("dark-off", false); }
    @Test @Config(qualifiers = "+night") public void darkOn() throws Exception { capture("dark-on", true); }

    @Test public void lightLocked() throws Exception {
        Prefs.setLockEnabled(RuntimeEnvironment.getApplication(), true);
        capture("light-locked", true);
    }

    @Test @Config(qualifiers = "+night") public void darkWaiting() throws Exception {
        Prefs.setLockEnabled(RuntimeEnvironment.getApplication(), true);
        Prefs.requestUnlock(RuntimeEnvironment.getApplication());
        capture("dark-waiting", true);
    }

    @Test public void lockedSwitchCannotBeTurnedOff() throws Exception {
        android.app.Application app = RuntimeEnvironment.getApplication();
        Prefs.setLockEnabled(app, true);
        MainActivity a = Robolectric.buildActivity(MainActivity.class).setup().get();
        java.util.List<android.widget.Switch> switches = new java.util.ArrayList<>();
        collectSwitches(a.getWindow().getDecorView(), switches);
        org.junit.Assert.assertEquals(2, switches.size());
        switches.get(1).setChecked(false);
        org.junit.Assert.assertTrue("switch should snap back on", switches.get(1).isChecked());
        org.junit.Assert.assertTrue("setting must stay on", Prefs.blockReels(app));

        // After removing the lock, turning it off works.
        Prefs.setLockEnabled(app, false);
        switches.get(1).setChecked(false);
        org.junit.Assert.assertFalse(Prefs.blockReels(app));
        // Turning it back on works even when locked.
        Prefs.setLockEnabled(app, true);
        switches.get(1).setChecked(true);
        org.junit.Assert.assertTrue(Prefs.blockReels(app));
    }

    private static void collectSwitches(android.view.View v, java.util.List<android.widget.Switch> out) {
        if (v instanceof android.widget.Switch) out.add((android.widget.Switch) v);
        if (v instanceof android.view.ViewGroup) {
            android.view.ViewGroup g = (android.view.ViewGroup) v;
            for (int i = 0; i < g.getChildCount(); i++) collectSwitches(g.getChildAt(i), out);
        }
    }

    @Test public void launcherIcon() throws Exception {
        Drawable icon = RuntimeEnvironment.getApplication().getDrawable(R.mipmap.ic_launcher);
        Bitmap bmp = Bitmap.createBitmap(432, 432, Bitmap.Config.ARGB_8888);
        icon.setBounds(0, 0, 432, 432);
        icon.draw(new Canvas(bmp));
        save("icon", bmp);
    }

    private void capture(String name, boolean serviceOn) throws Exception {
        if (serviceOn) {
            Settings.Secure.putString(RuntimeEnvironment.getApplication().getContentResolver(),
                    Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES,
                    "com.instagramfocus/com.instagramfocus.FocusService");
        }
        ActivityController<MainActivity> c = Robolectric.buildActivity(MainActivity.class).setup();
        View root = c.get().getWindow().getDecorView();
        Bitmap bmp = Bitmap.createBitmap(root.getWidth(), root.getHeight(), Bitmap.Config.ARGB_8888);
        root.draw(new Canvas(bmp));
        save(name, bmp);
    }

    private static void save(String name, Bitmap bmp) throws Exception {
        OUT.mkdirs();
        try (FileOutputStream out = new FileOutputStream(new File(OUT, name + ".png"))) {
            bmp.compress(Bitmap.CompressFormat.PNG, 100, out);
        }
    }
}
