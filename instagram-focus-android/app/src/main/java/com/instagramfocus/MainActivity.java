package com.instagramfocus;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.text.TextUtils;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Switch;
import android.widget.TextView;

/** The settings screen: shows whether blocking is on and lets you choose what to block. */
public class MainActivity extends Activity {
    private static final int GREEN_START = Color.rgb(16, 185, 129);
    private static final int GREEN_END = Color.rgb(5, 150, 105);
    private static final int ORANGE_START = Color.rgb(251, 146, 60);
    private static final int ORANGE_END = Color.rgb(234, 88, 12);

    private LinearLayout content;
    private FrameLayout statusCard;
    private TextView statusTitle;
    private TextView statusBody;
    private TextView statusButton;
    private View setupSection;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        drawBehindSystemBars();

        ScrollView scroll = new ScrollView(this);
        scroll.setClipToPadding(false);
        scroll.setFillViewport(true);

        content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);
        scroll.addView(content);

        // Keep everything clear of the status bar, camera cut-out and navigation bar.
        int side = dp(20);
        scroll.setOnApplyWindowInsetsListener((v, insets) -> {
            content.setPadding(side + insets.getSystemWindowInsetLeft(),
                    insets.getSystemWindowInsetTop() + dp(24),
                    side + insets.getSystemWindowInsetRight(),
                    insets.getSystemWindowInsetBottom() + dp(24));
            return insets;
        });
        content.setPadding(side, dp(48), side, dp(24));

        content.addView(header());
        content.addView(statusCard(), margins(0, dp(24), 0, 0));
        content.addView(sectionLabel("WHAT TO BLOCK"), margins(dp(4), dp(28), 0, dp(10)));
        content.addView(blockOptions());
        setupSection = setupSteps();
        content.addView(setupSection, margins(0, dp(28), 0, 0));
        content.addView(footer(), margins(0, dp(28), 0, 0));

        setContentView(scroll);
    }

    @Override
    protected void onResume() {
        super.onResume();
        boolean on = isServiceEnabled();
        statusCard.setBackground(gradient(on ? GREEN_START : ORANGE_START,
                on ? GREEN_END : ORANGE_END, dp(24)));
        statusTitle.setText(on ? "Blocking is on" : "Blocking is off");
        statusBody.setText(on
                ? "Search and Reels will send you straight back to your home feed."
                : "Turn it on so Search and Reels can't distract you.");
        statusButton.setText(on ? "Accessibility settings" : "Turn on");
        statusButton.setTextColor(on ? GREEN_END : ORANGE_END);
        setupSection.setVisibility(on ? View.GONE : View.VISIBLE);
    }

    // ---- Sections -------------------------------------------------------------------------

    private View header() {
        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);

        ImageView icon = new ImageView(this);
        icon.setImageResource(R.drawable.ic_launcher_foreground);
        GradientDrawable iconBg = new GradientDrawable(GradientDrawable.Orientation.BL_TR,
                new int[] {Color.rgb(79, 70, 229), Color.rgb(147, 51, 234), Color.rgb(236, 72, 153)});
        iconBg.setCornerRadius(dp(16));
        icon.setBackground(iconBg);
        icon.setScaleType(ImageView.ScaleType.CENTER_CROP);
        row.addView(icon, new LinearLayout.LayoutParams(dp(56), dp(56)));

        LinearLayout titles = new LinearLayout(this);
        titles.setOrientation(LinearLayout.VERTICAL);
        titles.setPadding(dp(14), 0, 0, 0);
        TextView title = text("Instagram Focus", 24, color(R.color.text_primary));
        title.setTypeface(Typeface.create("sans-serif-medium", Typeface.BOLD));
        titles.addView(title);
        titles.addView(text("Home feed only. Search on your laptop.", 14, color(R.color.text_secondary)));
        row.addView(titles, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
        return row;
    }

    private View statusCard() {
        statusCard = new FrameLayout(this);
        statusCard.setElevation(dp(4));

        LinearLayout inner = new LinearLayout(this);
        inner.setOrientation(LinearLayout.VERTICAL);
        inner.setPadding(dp(22), dp(22), dp(22), dp(22));

        statusTitle = text("", 24, Color.WHITE);
        statusTitle.setTypeface(Typeface.create("sans-serif-medium", Typeface.BOLD));
        inner.addView(statusTitle);

        statusBody = text("", 15, Color.argb(235, 255, 255, 255));
        statusBody.setLineSpacing(0, 1.15f);
        inner.addView(statusBody, margins(0, dp(6), 0, 0));

        statusButton = text("", 15, ORANGE_END);
        statusButton.setTypeface(Typeface.create("sans-serif-medium", Typeface.BOLD));
        statusButton.setGravity(Gravity.CENTER);
        statusButton.setPadding(dp(20), dp(12), dp(20), dp(12));
        statusButton.setBackground(pressable(rounded(Color.WHITE, dp(24)), dp(24)));
        statusButton.setOnClickListener(v ->
                startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)));
        LinearLayout.LayoutParams buttonParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        buttonParams.topMargin = dp(18);
        inner.addView(statusButton, buttonParams);

        statusCard.addView(inner);
        return statusCard;
    }

    private View blockOptions() {
        LinearLayout card = card();
        card.addView(optionRow(R.drawable.ic_search, "Search & Explore",
                "Can't look people up or browse Explore", Prefs.BLOCK_SEARCH, Prefs.blockSearch(this)));
        View divider = new View(this);
        divider.setBackgroundColor(color(R.color.divider));
        card.addView(divider, margins(dp(72), 0, 0, 0, dp(1)));
        card.addView(optionRow(R.drawable.ic_reels, "Reels tab",
                "No endless short videos", Prefs.BLOCK_REELS, Prefs.blockReels(this)));
        return card;
    }

    private View optionRow(int iconRes, String title, String subtitle, String key, boolean checked) {
        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setPadding(dp(16), dp(16), dp(12), dp(16));

        ImageView icon = new ImageView(this);
        icon.setImageResource(iconRes);
        icon.setImageTintList(ColorStateList.valueOf(color(R.color.accent)));
        icon.setPadding(dp(10), dp(10), dp(10), dp(10));
        icon.setBackground(oval(color(R.color.accent_soft)));
        row.addView(icon, new LinearLayout.LayoutParams(dp(44), dp(44)));

        LinearLayout texts = new LinearLayout(this);
        texts.setOrientation(LinearLayout.VERTICAL);
        texts.setPadding(dp(14), 0, dp(8), 0);
        TextView t = text(title, 16, color(R.color.text_primary));
        t.setTypeface(Typeface.create("sans-serif-medium", Typeface.NORMAL));
        texts.addView(t);
        texts.addView(text(subtitle, 13, color(R.color.text_secondary)), margins(0, dp(2), 0, 0));
        row.addView(texts, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));

        Switch sw = new Switch(this);
        sw.setChecked(checked);
        sw.setContentDescription(title);
        sw.setOnCheckedChangeListener((b, isChecked) ->
                Prefs.get(this).edit().putBoolean(key, isChecked).apply());
        row.addView(sw);

        row.setOnClickListener(v -> sw.toggle());
        row.setBackground(pressable(null, dp(20)));
        return row;
    }

    private View setupSteps() {
        LinearLayout section = new LinearLayout(this);
        section.setOrientation(LinearLayout.VERTICAL);
        section.addView(sectionLabel("HOW TO TURN IT ON"), margins(dp(4), 0, 0, dp(10)));

        LinearLayout card = card();
        card.setPadding(dp(16), dp(8), dp(16), dp(8));
        card.addView(step(1, "Tap Turn on above."));
        card.addView(step(2, "Find Instagram Focus in the list (it may be under Downloaded or Installed apps) and switch it on."));
        card.addView(step(3, "If it says the setting is restricted: go to Settings › Apps › Instagram Focus, tap ⋮ and choose Allow restricted settings. Then try again."));
        section.addView(card);
        return section;
    }

    private View step(int number, String body) {
        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setPadding(0, dp(10), 0, dp(10));

        TextView badge = text(String.valueOf(number), 13, color(R.color.accent));
        badge.setTypeface(Typeface.DEFAULT_BOLD);
        badge.setGravity(Gravity.CENTER);
        badge.setBackground(oval(color(R.color.accent_soft)));
        row.addView(badge, new LinearLayout.LayoutParams(dp(26), dp(26)));

        TextView t = text(body, 14, color(R.color.text_primary));
        t.setLineSpacing(0, 1.15f);
        t.setPadding(dp(12), dp(3), 0, 0);
        row.addView(t, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
        return row;
    }

    private View footer() {
        TextView t = text("🔒  Only looks at the Instagram app.\nNo data is collected or sent anywhere.",
                12, color(R.color.text_secondary));
        t.setGravity(Gravity.CENTER);
        t.setLineSpacing(0, 1.2f);
        return t;
    }

    // ---- Helpers --------------------------------------------------------------------------

    /** Draws the app edge to edge on every Android version, so the insets listener handles spacing. */
    @SuppressWarnings("deprecation")
    private void drawBehindSystemBars() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            getWindow().setDecorFitsSystemWindows(false);
        } else {
            View decor = getWindow().getDecorView();
            decor.setSystemUiVisibility(decor.getSystemUiVisibility()
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
        }
    }

    private boolean isServiceEnabled() {
        String enabled = Settings.Secure.getString(
                getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        if (TextUtils.isEmpty(enabled)) return false;
        ComponentName me = new ComponentName(this, FocusService.class);
        for (String s : enabled.split(":")) {
            if (me.equals(ComponentName.unflattenFromString(s))) return true;
        }
        return false;
    }

    private LinearLayout card() {
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setBackground(rounded(color(R.color.surface), dp(20)));
        card.setClipToOutline(true);
        card.setElevation(dp(1));
        return card;
    }

    private TextView sectionLabel(String s) {
        TextView t = text(s, 12, color(R.color.text_secondary));
        t.setTypeface(Typeface.create("sans-serif-medium", Typeface.BOLD));
        t.setLetterSpacing(0.08f);
        return t;
    }

    private TextView text(String s, int sizeSp, int color) {
        TextView t = new TextView(this);
        t.setText(s);
        t.setTextSize(sizeSp);
        t.setTextColor(color);
        return t;
    }

    private static GradientDrawable rounded(int color, float radius) {
        GradientDrawable d = new GradientDrawable();
        d.setColor(color);
        d.setCornerRadius(radius);
        return d;
    }

    private static GradientDrawable oval(int color) {
        GradientDrawable d = new GradientDrawable();
        d.setShape(GradientDrawable.OVAL);
        d.setColor(color);
        return d;
    }

    private static GradientDrawable gradient(int start, int end, float radius) {
        GradientDrawable d = new GradientDrawable(GradientDrawable.Orientation.TL_BR, new int[] {start, end});
        d.setCornerRadius(radius);
        return d;
    }

    private Drawable pressable(Drawable content, float radius) {
        return new RippleDrawable(ColorStateList.valueOf(Color.argb(40, 128, 128, 128)),
                content, rounded(Color.WHITE, radius));
    }

    private int color(int res) {
        return getColor(res);
    }

    private LinearLayout.LayoutParams margins(int l, int t, int r, int b) {
        return margins(l, t, r, b, ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    private LinearLayout.LayoutParams margins(int l, int t, int r, int b, int height) {
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, height);
        p.setMargins(l, t, r, b);
        return p;
    }

    private int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }
}
