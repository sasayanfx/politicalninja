import type React from "react"

interface ShurikenIconProps {
  className?: string
  size?: number
  color?: string
}

export const ShurikenIcon: React.FC<ShurikenIconProps> = ({ className = "", size = 24, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Center circle */}
      <circle cx="12" cy="12" r="2" fill={color} />

      {/* Four blades of the shuriken */}
      <path d="M12 2L14 10L12 12L10 10L12 2Z" fill={color} />
      <path d="M22 12L14 14L12 12L14 10L22 12Z" fill={color} />
      <path d="M12 22L10 14L12 12L14 14L12 22Z" fill={color} />
      <path d="M2 12L10 10L12 12L10 14L2 12Z" fill={color} />

      {/* Optional: Add shine/highlight effect */}
      <path d="M11 3L12 2L13 3" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
    </svg>
  )
}

// Rotating variant of the shuriken
export const SpinningShurikenIcon: React.FC<ShurikenIconProps> = (props) => {
  return (
    <div className="animate-spin-slow">
      <ShurikenIcon {...props} />
    </div>
  )
}
