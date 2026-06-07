$file = 'd:\digitals\Digitals-Universe\app\globals.css'
$raw = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# ── locate the block start and end ──────────────────────────────────────────
$start = $raw.IndexOf('.du-premium-card,')
# end marker: the line AFTER ".du-service-card:hover::after { opacity: 0; }"
# we look for the unique trailing text of that block
$endMarker = '.du-services-section::before,'
$end = $raw.IndexOf($endMarker)

if ($start -lt 0 -or $end -lt 0) {
  Write-Error "Markers not found. start=$start end=$end"
  exit 1
}

$before = $raw.Substring(0, $start)
$after  = $raw.Substring($end)

$newBlock = @'
.du-premium-card,
.du-service-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.065) !important;
  -webkit-backdrop-filter: blur(24px) saturate(145%);
  backdrop-filter: blur(24px) saturate(145%);
  transform: translateY(0) scale(1);
  transition:
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 400ms ease;
  will-change: transform;
}

/* neon sweep line — top edge */
.du-premium-card::before,
.du-service-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent 0%, rgba(77,163,255,0.55) 28%, #4DA3FF 52%, rgba(100,210,255,0.9) 68%, transparent 100%);
  box-shadow: 0 0 6px 1px rgba(77,163,255,0.7), 0 0 18px 2px rgba(77,163,255,0.32);
  opacity: 0;
  transform: translateX(-100%);
  pointer-events: none;
  z-index: 2;
  transition: none;
}

/* light reflection sweep */
.du-premium-card::after,
.du-service-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(110deg, transparent 20%, rgba(77,163,255,0.05) 45%, rgba(120,220,255,0.035) 55%, transparent 75%);
  opacity: 0;
  transform: translateX(-60%) skewX(-12deg);
  transition: opacity 400ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 1;
}

.du-premium-card > *,
.du-service-card > * {
  position: relative;
  z-index: 3;
}

.du-premium-card:hover,
.du-service-card:hover {
  border-color: rgba(77, 163, 255, 0.36) !important;
  transform: translateY(-6px) scale(1.02);
  box-shadow:
    0 0 0 1px rgba(77,163,255,0.18),
    0 12px 40px rgba(0,0,0,0.36),
    0 0 32px rgba(77,163,255,0.12),
    0 0 64px rgba(77,163,255,0.06),
    inset 0 1px 0 rgba(255,255,255,0.09) !important;
}

.du-premium-card:hover::before,
.du-service-card:hover::before {
  opacity: 1;
  animation: du-neon-sweep 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.du-premium-card:hover::after,
.du-service-card:hover::after {
  opacity: 1;
  transform: translateX(60%) skewX(-12deg);
}

'@

$result = $before + $newBlock + $after
[System.IO.File]::WriteAllText($file, $result, [System.Text.Encoding]::UTF8)
Write-Output "Done. File written."
