"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpinningShurikenIcon } from "@/components/icons/shuriken-icon"

const navItems = [
  { name: "理念", href: "#philosophy" },
  { name: "現状", href: "#current-state" },
  { name: "楽曲", href: "#parody-songs" },
  { name: "今期の目標", href: "#goals" },
  { name: "カレンダー", href: "#calendar" },
  { name: "ファン", href: "#fans" },
  { name: "グッズ", href: "#goods" },
  { name: "募集", href: "#recruitment" },
  { name: "お問い合わせ", href: "#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-ninja-blue sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden group-hover:bg-ninja-red transition-colors duration-300">
              <SpinningShurikenIcon className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-wider group-hover:text-ninja-red transition-colors duration-300">
              POLITICAL NINJA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-ninja-blue-light transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-ninja-blue-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
