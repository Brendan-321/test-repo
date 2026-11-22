# Instagram Focus – Home Feed Only

A browser extension that blocks Instagram's **Search/Explore** and **Reels** pages on instagram.com, so only your home feed is left.

## What it does
- Sends `/explore/...` (search and Explore) and `/reels/...` (the Reels tab) back to your home feed, whether you type the URL, follow a link, or click inside the app.
- Hides the Search, Explore and Reels buttons in the sidebar and the bottom bar.
- Optional (off by default): also blocks individual reels (`/reel/<id>`), including reels sent to you in DMs.

Click the extension's toolbar icon to change these settings.

## Install

**Chrome / Edge / Brave**
1. Go to `chrome://extensions` (or `edge://extensions`).
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select this `instagram-focus-extension` folder.

**Firefox (128+)**
1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…** and select `manifest.json`.
   (Temporary add-ons are removed when Firefox restarts. To keep it installed permanently, the extension has to be signed through addons.mozilla.org.)

## Limitations
- It only works on **instagram.com in a desktop browser**. It can't change the Instagram phone app. On a phone, you can use instagram.com in a browser that supports extensions (for example Firefox for Android or Kiwi) and remove the app.
- Hiding buttons depends on Instagram's English labels ("Search", "Reels"). If you use another language, or Instagram changes its layout, a button may show up again. The redirects work in every language, so those pages stay blocked.
