# Princess's Mood — GitHub Pages Site

This repository contains a single‑page site with a 7‑position mood slider and a princess icon that moves along the chart. Live updates are supported.

## Live updates via GitHub Realtime (experimental)
If your repository or organization has access to the **GitHub Next — Realtime GitHub** prototype, the page will attempt to connect using `window.RTGH.openChannel('princess-mood')`. When available, all visitors see each other's slider changes instantly.

If it isn't available for your repo, the page automatically falls back to the **BroadcastChannel API** (syncs across tabs in the same browser). To enable cross‑device realtime without the prototype, connect a small relay (e.g., Pusher, Ably, Supabase Realtime).

## Deploy on GitHub Pages
1. Push these files to a GitHub repository.
2. In **Settings → Pages**, choose **Deploy from branch**, pick the `main` branch and `/ (root)` folder.
3. Your site will be live at `https://<your-username>.github.io/<repo>/`.

## Assets
- `assets/princess.png`: Transparent PNG generated from your upload (no shadow).
- `assets/mood.png`: The mood chart you provided.
