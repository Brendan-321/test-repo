# Instagram Focus for Android

A small Android app that keeps the **Instagram app** on your home feed. If the **Search/Explore** or **Reels** tab opens, it taps Home for you straight away. Your laptop isn't affected, so search for people there.

## Install
1. On your phone, download [`InstagramFocus.apk`](InstagramFocus.apk) (open it on GitHub and tap the download button).
2. Open the downloaded file. If Android asks, allow your browser or file app to **install unknown apps**, then tap **Install**.
3. Open **Instagram Focus** and tap **Turn on in Accessibility settings**.
4. Find **Instagram Focus** in the list (it may be under "Installed apps" or "Downloaded apps") and turn it on.
   - If Android says the setting is **restricted** (Android 13 and newer does this for downloaded apps): go to **Settings → Apps → Instagram Focus**, tap the **⋮** menu at the top right, choose **Allow restricted settings**, then go back and turn it on.
5. Open the app again. It should say **✅ Blocking is ON**.

## Settings
The app has two switches, both on by default:
- **Block Search & Explore**
- **Block Reels tab**

## How it works
It uses Android's accessibility feature, which lets an app see what's on screen. It's set up so it can only see the Instagram app (`res/xml/focus_service.xml`). It doesn't collect or send any data and has no internet permission.

## Limitations
- **Reels outside the Reels tab still play.** That includes reels in your home feed and reels friends send in DMs. Only the tab is blocked.
- **Instagram updates could break it.** The app finds the tabs by Instagram's internal names, with backups that use their English labels. If an update changes both, blocking stops working until the app is updated.
- **You can turn it off.** Switching off the accessibility setting disables it. There's no lock.
- **Updates may need a reinstall.** If a new version won't install over the old one, uninstall the old one first.

## Building it yourself
```
./gradlew testDebugUnitTest assembleDebug
```
This needs the Android SDK (`sdk.dir` in `local.properties`). The APK is written to `app/build/outputs/apk/debug/app-debug.apk`.
