# Telugu Wedding Invitation Website

A responsive, traditional Telugu wedding invitation website built with plain HTML, CSS, and JavaScript.

## Files
- `index.html` — page content and sections
- `style.css` — colors, layout, responsive styles, and animations
- `script.js` — couple details, countdown, mobile navigation, and share button
- `images/` — place your own wedding photographs here

## Run in VS Code
1. Extract the ZIP file.
2. Open VS Code → **File → Open Folder** → choose `telugu_wedding_website`.
3. Open `index.html`.
4. For a quick preview, double-click `index.html` in File Explorer. Recommended: install the **Live Server** extension in VS Code, right-click `index.html`, and select **Open with Live Server**.
5. Your browser will open the site. Save changes and refresh if needed.

## Personalize it
Open `script.js` and edit the `WEDDING` object near the top:
- `brideName`
- `groomName`
- `weddingDate`
- `venueName`
- `venueAddress`
- `mapUrl`

Example date format (example only): `2027-02-14T10:30:00+05:30`
Keep `weddingDate: ""` if the date is not confirmed. The countdown will show placeholders until a date is supplied. The date is interpreted with the timezone offset you enter.

Replace the sample event names and timings directly in `index.html`. The current events are examples, not confirmed details.

## Add real photos
1. Copy photos into the `images` folder, e.g. `couple-1.jpg`, `engagement.jpg`, `decor.jpg`.
2. In `index.html`, replace a sample image URL like:
   `https://images.unsplash.com/...`
   with a local path such as:
   `images/couple-1.jpg`
3. Update the image's `alt` text to describe the photo.
The current gallery photos are remote sample images, so an internet connection is needed to load them until you replace them with local files. Google Fonts also uses the internet; system fonts will be used if the connection is unavailable.

## Add the real Google Maps location
Open the venue in Google Maps, choose **Share → Copy link**, and paste the copied URL into `mapUrl` in `script.js`. Update the venue name and full address too.

## Publish free with GitHub Pages
1. Create or sign in to a GitHub account.
2. Create a new public repository, e.g. `sister-wedding`.
3. Upload `index.html`, `style.css`, `script.js`, and the `images` folder (if used) to the repository root.
4. In the repository, open **Settings → Pages**.
5. Under build/deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
6. Wait for the deployment to finish. GitHub will show the published URL in Pages settings.
7. Open that URL on your phone to test it, then share the link on WhatsApp.

Before sharing publicly, check names, spelling, dates, timings, venue address, map link, photos, and family privacy. Anyone with the public URL may be able to view the invitation.
