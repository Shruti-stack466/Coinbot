# CoinBot — Sort Smarter!

An AI-literacy game for Grade 4–5 students, modelled on Code.org's "AI for Oceans".
Children train a robot to **find coins** and then **sort them by value**, learning that an
AI learns from the examples people choose — including the mistakes.

The whole game is a single, self-contained `index.html` that runs **fully offline** in any
modern browser (fonts are embedded; all art, audio, and video are local files).

## Run it

Just open `index.html` in a browser (Chrome, Edge, Firefox). No server or build step needed.

## How it plays

1. **Home** → **Opening video** sets the scene (a mixed box of coins).
2. **Level 1 — Find coins:** label images as *Coin* / *Not Coin* to train the robot, then watch it test.
3. **Level 2 — Sort by value:** teach ₹1 / ₹2 / ₹5 / ₹10, then the robot sorts a test set;
   designs it hasn't seen go to the **Unsure** box for the child to inspect.
4. **Level 3 — Retrain:** add more varied designs and run a final sort.
5. A celebratory finale reveals each sorted coin (tap to enlarge and flip), then a closing screen.

## Project structure

```
index.html          The entire game (HTML + CSS + JS, embedded fonts)
Opening video.mp4    Intro clip
Visuals/             Backgrounds, seller/box art, and coins/ (real coin photos by denomination)
  coins/{1rs,2rs,5rs,10rs}/{obverse,reverse}/   Coin photo pairs + image_mapping.csv
Audio/               Sound-effect notes
tools/build-coin-manifest.js   Regenerates the REAL_COINS list in index.html from Visuals/coins/
```

## Updating the coin set

Add/replace photos under `Visuals/coins/.../` (matching filenames across `obverse`/`reverse`),
then run:

```
node tools/build-coin-manifest.js
```

This rewrites the machine-generated `REAL_COINS` array between the `/*RC-START*/ … /*RC-END*/`
markers in `index.html`. Do not hand-edit between those markers.

## Notes

- Coin metadata (series/year) shown in-game should be verified before public release.
- Raw source archives and local backups are intentionally excluded from the repo (see `.gitignore`).
