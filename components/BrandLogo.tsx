type BrandLogoProps = {
  className?: string
  compact?: boolean
}

export default function BrandLogo({ className = "h-10 w-auto", compact = false }: BrandLogoProps) {
  const viewBox = compact ? "0 0 96 96" : "0 0 360 96"

  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Digital Universe"
    >
      <image
        href="/digitals-universe-logo-v4-mark.png"
        x={compact ? "0" : "0"}
        y={compact ? "0" : "-2"}
        width={compact ? "96" : "96"}
        height={compact ? "96" : "96"}
        preserveAspectRatio="xMidYMid meet"
      />

      {!compact && (
        <g>
          <text x="104" y="40" fontFamily="Inter, system-ui, sans-serif" fontSize="24" fontWeight="900" fill="#ffffff">
            DIGITAL
          </text>
          <text x="104" y="67" fontFamily="Inter, system-ui, sans-serif" fontSize="24" fontWeight="800" fill="#8bbef0">
            UNIVERSE
          </text>
          <path d="M236 62H304" stroke="#37d0ae" strokeWidth="3" strokeLinecap="round" opacity="0.86" />
          <path d="M314 62H334" stroke="#f2c94c" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}
