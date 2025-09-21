"use client"

import Link from "next/link"
import { Twitter, Instagram } from "lucide-react"
import { LineIcon } from "./icons/line-icon"
// VisitCounterのインポートが正しいことを確認
import VisitCounter from "./visit-counter"

export default function Footer() {
  return (
    <footer className="bg-ninja-blue py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">政治忍者</h3>
            <p className="text-gray-300 mb-4">日本を救え！日本を守れ！政治にエンタメを！</p>
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://x.com/seijixninja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/seijixninja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://line.me/R/ti/p/@470opewc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-500 transition-colors"
                aria-label="LINE"
              >
                <LineIcon className="h-6 w-6" />
              </Link>
            </div>
            <VisitCounter />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">サイトマップ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#philosophy" className="text-gray-300 hover:text-white transition-colors">
                  活動理念
                </Link>
              </li>
              <li>
                <Link href="#current-state" className="text-gray-300 hover:text-white transition-colors">
                  若者の政治参画
                </Link>
              </li>
              <li>
                <Link href="#parody-songs" className="text-gray-300 hover:text-white transition-colors">
                  政治忍者の楽曲
                </Link>
              </li>
              <li>
                <Link href="#goals" className="text-gray-300 hover:text-white transition-colors">
                  目標
                </Link>
              </li>
              <li>
                <Link href="#fans" className="text-gray-300 hover:text-white transition-colors">
                  ファンの広場
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
            <a
              href="#contact"
              className="inline-block bg-ninja-red hover:bg-ninja-red-dark text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={(e) => {
                e.preventDefault()
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              お問い合わせはこちらから
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} 政治忍者 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
