package com.instagramfocus;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.provider.Settings;
import android.text.TextUtils;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Switch;
import android.widget.TextView;

/** The settings screen: shows whether blocking is on and lets you choose what to block. */
public class MainActivity extends Activity {
    private TextView status;
    private Button enableButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        int pad = dp(20);

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(pad, pad * 2, pad, pad);

        TextView title = new TextView(this);
        title.setText(R.string.app_name);
        title.setTextSize(24);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        layout.addView(title);

        TextView subtitle = text("Only your home feed stays. Search people on your laptop instead.", 14);
        subtitle.setPadding(0, dp(4), 0, dp(20));
        layout.addView(subtitle);

        status = text("", 16);
        status.setTypeface(Typeface.DEFAULT_BOLD);
        layout.addView(status);

        enableButton = new Button(this);
        enableButton.setText("Turn on in Accessibility settings");
        enableButton.setOnClickListener(v ->
                startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)));
        layout.addView(enableButton);

        layout.addView(toggle("Block Search & Explore", Prefs.BLOCK_SEARCH, Prefs.blockSearch(this)));
        layout.addView(toggle("Block Reels tab", Prefs.BLOCK_REELS, Prefs.blockReels(this)));

        TextView help = text(
                "Setup\n"
                + "1. Tap the button above, choose \"Instagram Focus\" and turn it on.\n"
                + "2. If Android says the setting is restricted: open Settings > Apps > "
                + "Instagram Focus, tap the ⋮ menu, choose \"Allow restricted settings\", "
                + "then try step 1 again.\n\n"
                + "This app only looks at the Instagram app. It doesn't collect or send any data.", 13);
        help.setPadding(0, dp(24), 0, 0);
        help.setTextColor(Color.GRAY);
        layout.addView(help);

        ScrollView scroll = new ScrollView(this);
        scroll.addView(layout);
        setContentView(scroll);
    }

    @Override
    protected void onResume() {
        super.onResume();
        boolean on = isServiceEnabled();
        status.setText(on ? "✅ Blocking is ON" : "⚠️ Blocking is OFF");
        status.setTextColor(on ? Color.rgb(0, 140, 60) : Color.rgb(200, 80, 0));
        enableButton.setText(on ? "Open Accessibility settings" : "Turn on in Accessibility settings");
    }

    private boolean isServiceEnabled() {
        String enabled = Settings.Secure.getString(
                getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        if (TextUtils.isEmpty(enabled)) return false;
        ComponentName me = new ComponentName(this, FocusService.class);
        for (String s : enabled.split(":")) {
            ComponentName c = ComponentName.unflattenFromString(s);
            if (me.equals(c)) return true;
        }
        return false;
    }

    private Switch toggle(String label, String key, boolean checked) {
        Switch sw = new Switch(this);
        sw.setText(label);
        sw.setTextSize(16);
        sw.setChecked(checked);
        sw.setPadding(0, dp(14), 0, dp(14));
        sw.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        sw.setOnCheckedChangeListener((b, isChecked) ->
                Prefs.get(this).edit().putBoolean(key, isChecked).apply());
        return sw;
    }

    private TextView text(String s, int sizeSp) {
        TextView t = new TextView(this);
        t.setText(s);
        t.setTextSize(sizeSp);
        return t;
    }

    private int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }
}
