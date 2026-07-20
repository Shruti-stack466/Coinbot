FRUIT STALL COIN SORTER — VISUAL ASSET MANIFEST
================================================
Drop PNG files into this Visuals/ folder using EXACTLY these names.
The game shows built-in placeholders for any file that is missing,
and automatically uses your art the moment the file exists.

All PNGs: transparent background. Coins ~512x512, same angle,
denomination side visible and readable. Backgrounds 1920x1200 JPG or PNG.

ROBOT (9)
  robot-neutral.png       idle
  robot-talking.png       mouth open (used for talk animation)
  robot-learning.png      HEAD OPEN with slot on top (cards fly in)
  robot-scanning.png      scan-line eyes
  robot-happy.png         green-tinted smile
  robot-unsure.png        amber tint, tilted head
  robot-concerned.png     red tint, worried
  robot-celebrating.png   arms up, stars
  robot-thinking.png      optional

CHARACTERS (2-3)
  seller-worried.png      fruit seller, distressed (opening)
  seller-happy.png        fruit seller, pleased (closing)
  seller-talking.png      optional

BACKGROUNDS (4)
  bg-fruit-stall.png      stall counter scene  [ALREADY PROVIDED]
  bg-sorting-room.png     training room; keep right-of-center clear for robot
  bg-testing-area.png     conveyor / sorting zone; keep middle quiet, bottom third clear
  bg-gallery.png          shelf wall for coin gallery

PROPS (8)
  coin-box-mixed.png      overflowing mixed box (opening)
  coin-box-sorted.png     tidy box (closing)
  tray-1.png tray-2.png tray-5.png tray-10.png    four denomination trays
  box-unsure.png          amber "?" box (friendly, not a reject bin)
  badge-complete.png      completion badge

COINS (24) — pattern: coin-{denom}r-{design}-{condition}.png
  designs: a = current design, b = second recent design,
           c = older design series, d = another/older series
  conditions: clear, faded, worn
  For EACH of 1r, 2r, 5r, 10r provide these 6:
    coin-1r-a-clear.png
    coin-1r-b-clear.png
    coin-1r-c-clear.png
    coin-1r-a-faded.png
    coin-1r-b-worn.png
    coin-1r-d-clear.png
  (repeat with 2r, 5r, 10r)
  PLUS one single coin for the Coin/Not-Coin level only:
    coin-20r-a-clear.png   (₹20, 12-sided)
  NOTE: if faded/worn photography is hard, send clear versions and tell
  Claude to generate the faded/worn look in code.

NOT-COIN OBJECTS (8)
  obj-toy-coin.png
  obj-game-token.png
  obj-plastic-token.png
  obj-arcade-token.png
  obj-chocolate-coin.png
  obj-button.png
  obj-washer.png
  obj-bottle-cap.png

METADATA (for the Coin Gallery)
  Provide a sheet (CSV/Excel) with one row per coin image:
    file, denomination, year_printed, design_series, condition, verified(y/n)
  Current gallery shows "sample — replace" placeholders until this arrives.
  Per spec: only verified year/series claims go in the gallery.
