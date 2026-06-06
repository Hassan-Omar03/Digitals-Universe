$file = "app\globals.css"
$c = Get-Content -Raw $file

# ── Replacement 1: swap out old service-card hover block ──────────────────
$old1 = @'
.du-service-card {
  transition: border-color 220ms ease, box-shadow 220ms ease;
}

.du-service-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: none !important;
  transform: none;
}

.du-service-card:hover::before {
  opacity: 0.58;
  transform: none;
}

.du-service-card:hover::after {
  opacity: 0;
}
'@

$new1 = @'
/* ── Neon sweep keyframe ── */
@keyframes du-neon-sweep {
  0%   { transform: translateX(-110%); opacity: 0; }
  8%   { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(110%);  opacity: 0; }
}

/* ── Surface sheen keyframe ── */
@keyframes du-surface-sheen {
  0%   { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
  15%  { opacity: 1; }
  80%  { opacity: 0.6; }
  100% { transform: translateX(150%)  skewX(-18deg); opacity: 0; }
}

/* ── Service card hover: neon sweep + lift + glow ── */
.du-service-card {
  isolation: isolate;
  transition:
    border-color 300ms ease,
    box-shadow   300ms ease,
    transform    420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.du-service-card:hover {
  border-color: rgba(77, 163, 255, 0.48) !important;
  box-shadow:
    0 0 0 1px  rgba(77, 163, 255, 0.18),
    0 0 24px   rgba(77, 163, 255, 0.12),
    0 12px 40px rgba(0, 0, 0, 0.30) !important;
  transform: translateY(-6px) scale(1.02);
}

.du-service-card:hover::before {
  opacity: 0.72;
  transform: none;
}

/* Neon sweep line on top edge */
.du-service-card::after {
  content: "" !important;
  display: block !important;
  position: absolute;
  top: -1px;
  left: 0;
  width: 55%;
  height: 2px;
  border-radius: 999px;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(
    90deg,
    transparent               0%,
    rgba(77,  163, 255, 0.25) 18%,
    rgba(77,  210, 255, 0.88) 68%,
    rgba(140, 220, 255, 1.00) 86%,
    rgba(210, 245, 255, 0.85) 100%
  );
  box-shadow:
    0 0  3px 1px rgba(77,  163, 255, 0.85),
    0 0  9px 2px rgba(77,  210, 255, 0.55),
    0 0 20px 4px rgba(140, 220, 255, 0.28);
  animation: du-neon-sweep 1.0s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-play-state: paused;
}

.du-service-card:hover::after {
  animation-play-state: running;
}

/* Surface sheen overlay */
.du-service-card .du-svc-sheen {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.du-service-card .du-svc-sheen::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 48%;
  height: 100%;
  background: linear-gradient(
    108deg,
    transparent                 0%,
    rgba(255, 255, 255, 0.00)  28%,
    rgba(255, 255, 255, 0.055) 50%,
    rgba(255, 255, 255, 0.00)  72%,
    transparent               100%
  );
  opacity: 0;
  animation: du-surface-sheen 1.0s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-play-state: paused;
}

.du-service-card:hover .du-svc-sheen::after {
  animation-play-state: running;
}
'@

# ── Replacement 2: inject flow-card hover block before Blue accent line ───
$old2 = '/* -- Blue accent line -- */'
# We search for the actual comment text
$old2 = "/* `u{2500}`u{2500} Blue accent line `u{2500}`u{2500} */"

$new2 = @'
/* ── Flow card (Delivery Flow) hover: same neon sweep + lift + glow ── */
.du-flow-card {
  isolation: isolate;
  transition:
    border-color 320ms ease,
    box-shadow   320ms ease,
    transform    420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.du-flow-card:hover {
  border-color: rgba(77, 163, 255, 0.58) !important;
  box-shadow:
    0 0 0 1px  rgba(77, 163, 255, 0.22),
    0 0 32px   rgba(77, 163, 255, 0.15),
    0 18px 52px rgba(0, 0, 0, 0.34) !important;
  transform: translateY(-6px) scale(1.02);
}

.du-flow-card::after {
  content: "" !important;
  display: block !important;
  position: absolute;
  top: -1px;
  left: 0;
  width: 55%;
  height: 2px;
  border-radius: 999px;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(
    90deg,
    transparent               0%,
    rgba(77,  163, 255, 0.25) 18%,
    rgba(77,  210, 255, 0.88) 68%,
    rgba(140, 220, 255, 1.00) 86%,
    rgba(210, 245, 255, 0.85) 100%
  );
  box-shadow:
    0 0  3px 1px rgba(77,  163, 255, 0.85),
    0 0  9px 2px rgba(77,  210, 255, 0.55),
    0 0 20px 4px rgba(140, 220, 255, 0.28);
  animation: du-neon-sweep 1.0s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-play-state: paused;
}

.du-flow-card:hover::after {
  animation-play-state: running;
}

.du-flow-card .du-flow-sheen {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.du-flow-card .du-flow-sheen::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 48%;
  height: 100%;
  background: linear-gradient(
    108deg,
    transparent                 0%,
    rgba(255, 255, 255, 0.00)  28%,
    rgba(255, 255, 255, 0.060) 50%,
    rgba(255, 255, 255, 0.00)  72%,
    transparent               100%
  );
  opacity: 0;
  animation: du-surface-sheen 1.0s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-play-state: paused;
}

.du-flow-card:hover .du-flow-sheen::after {
  animation-play-state: running;
}

/* ── Blue accent line ── */
'@

$found1 = $c.Contains($old1)
$found2 = $c.Contains($old2)
Write-Host "old1 found: $found1"
Write-Host "old2 found: $found2"

if ($found1) { $c = $c.Replace($old1, $new1) }
if ($found2) { $c = $c.Replace($old2, $new2) }

if ($found1 -or $found2) {
    [System.IO.File]::WriteAllText((Resolve-Path $file), $c)
    Write-Host "Written OK"
} else {
    Write-Host "Nothing replaced - check strings"
}
