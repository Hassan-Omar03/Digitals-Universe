type BrandLogoProps = {
  className?: string
  compact?: boolean
}

const logoSrc = "/logo-transparent.png"

export default function BrandLogo({ className = "h-10 w-auto", compact = false }: BrandLogoProps) {
  return (
    <img
      src={logoSrc}
      className={className}
      alt={compact ? "DU" : "Digital Universe"}
      loading="eager"
      decoding="async"
    />
  )
}
