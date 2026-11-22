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
