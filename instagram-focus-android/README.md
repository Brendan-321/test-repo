# Instagram Focus for Android

A small Android app that keeps the **Instagram app** on your home feed. If the **Search/Explore** or **Reels** tab opens, it taps Home for you straight away. Your laptop isn't affected, so search for people there.

<p>
  <img src="screenshots/icon.png" width="96" alt="App icon" />&nbsp;
  <img src="screenshots/dark-off.png" width="240" alt="Dark mode, blocking off" />&nbsp;
  <img src="screenshots/light-on.png" width="240" alt="Light mode, blocking on" />
</p>

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
It uses Android's accessibility feature, which lets an app see what's on screen. It's set up so it can only see the Instagram app (`res/xml/focus_service.xml`). The only things it ever does are tap Instagram's Home tab or press Back.

## Security
Accessibility access is powerful, so the app is locked down:
- **No permissions at all.** In particular it has no internet permission, so it can't send anything off your phone. The manifest also strips network permissions if a library ever tries to add them.
- **Only sees Instagram.** Events are limited to `com.instagram.android`, and the service checks that Instagram is on screen before every action. It doesn't ask to see other apps' windows.
- **Nothing stored but two on/off switches.** These are kept in private app storage and excluded from cloud backups and device transfers.
- **Nothing other apps can talk to.** The blocking service isn't exported and only Android itself can connect to it. The settings screen accepts no input from other apps.
- **Release build.** Not debuggable, code shrunk and obfuscated, signed with a private release key.
- **Pinned build tool.** The Gradle download is verified against its SHA-256 checksum.

The biggest risk to watch for is a **fake copy**. Only install `InstagramFocus.apk` from this repo, and only grant Accessibility access to an app you trust.

## Limitations
- **Reels outside the Reels tab still play.** That includes reels in your home feed and reels friends send in DMs. Only the tab is blocked.
- **Instagram updates could break it.** The app finds the tabs by Instagram's internal names, with backups that use their English labels. If an update changes both, blocking stops working until the app is updated.
- **You can turn it off.** Switching off the accessibility setting disables it. There's no lock.
- **Updates may need a reinstall.** If a new version won't install over the old one, uninstall the old one first. (Version 1.2 is the first with the release key, so going from 1.0 or 1.1 to 1.2 needs one uninstall.)

## Signing key
Release builds are signed with a private key that is **not** in this repo. To build a release that installs as an update over your current app, put the key file and a `keystore.properties` next to this README:
```
storeFile=/path/to/instagram-focus-release.jks
storePassword=...
keyAlias=instagramfocus
keyPassword=...
```
Both are already in `.gitignore`; never commit them. If the key is lost, uninstall the app before installing a build signed with a new key.

## Building it yourself
```
./gradlew testDebugUnitTest assembleRelease
```
This needs the Android SDK (`sdk.dir` in `local.properties`) and the signing key above. The APK is written to `app/build/outputs/apk/release/app-release.apk`.

The unit tests include `ScreenshotTest`, which uses Robolectric to render the settings screen (light and dark, blocking on and off) and the launcher icon to `app/build/screenshots/`.
