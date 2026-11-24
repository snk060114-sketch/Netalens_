# NetaLens — Fresh Starter

A clean, responsive, multi-page public-accountability research prototype.

## Included pages
- `index.html` — overview and navigation
- `leaders.html` — searchable demo directory and saved profiles
- `leader-profile.html` — profile workspace and local research notes
- `performance.html` — demo indicator comparison
- `statements.html` — statement research tracker (browser-local storage)
- `transparency.html` — disclosure research framework
- `constituency.html` — civic issue log (browser-local storage)
- `parties.html` — party/group comparison framework
- `sources.html` — source directory and methodology

## Important data note
The sample profiles, names, labels and numbers are fictional illustrative data. They are not statements about real public figures and are not connected to live government data. Replace demo records only after checking original public records, dates and context.

## Run locally
Open `index.html` in a browser. No build tools or package installation are required.

## Publish with GitHub Pages
1. Create a new public GitHub repository.
2. Extract this ZIP on your computer.
3. Open the extracted `NetaLens-Fresh` folder.
4. Upload the **contents inside the folder** (not the ZIP itself) to the repository root.
5. Commit the upload.
6. In repository Settings → Pages, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
7. Wait for Pages to publish, then open the URL shown in Settings → Pages.

## Privacy and limitations
- Saved profiles, research notes, statement entries and issue logs use browser `localStorage`.
- These notes stay in the current browser profile on the current device; they are not synced to a server.
- External source links require an internet connection.
- No login, database, live data API or server-side submission is included.
