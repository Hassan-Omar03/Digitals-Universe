type BrandLogoProps = {
  className?: string
  compact?: boolean
}

export default function BrandLogo({ className = "h-10 w-auto", compact = false }: BrandLogoProps) {
  return (
    <img
      src="/logo-cropped.png"
      className={className}
      alt={compact ? "DU" : "Digital Universe"}
      loading="eager"
      decoding="async"
    />
  )
}
