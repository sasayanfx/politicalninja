import type React from "react"

interface LineIconProps {
  className?: string
  size?: number
}

export const LineIcon: React.FC<LineIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22 10.6c0-4.1-4.1-7.4-9.2-7.4S3.6 6.5 3.6 10.6c0 3.7 3.2 6.7 7.6 7.3.3.1.7.2.8.5.1.3.1.6 0 .8 0 0-.1.6-.1.7 0 .2-.2.8.7.4.9-.4 4.8-2.8 6.5-4.8 1.2-1.3 1.9-2.7 1.9-4.9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
