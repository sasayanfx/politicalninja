"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Twitter, Instagram } from "lucide-react"
import { LineIcon } from "@/components/icons/line-icon"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0) // 0-2: individual lines, 3: all lines
  const [animationCount, setAnimationCount] = useState(0)
  const [showAlternateImage, setShowAlternateImage] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)

  const slogans = ["日本を救え！", "日本を守れ！", "政治にエンタメを！"]

  // 画像選択のロジックを別のuseEffectに分離し、初回レンダリング時のみ実行
  useEffect(() => {
    // 1/10の確率で別の画像を表示するフラグをセット
    const randomValue = Math.random()
    setShowAlternateImage(randomValue < 0.1)
  }, []) // 空の依存配列で初回レンダリング時のみ実行

  useEffect(() => {
    // Set loaded state after component mounts
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Handle scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Handle mouse move events
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth)
      setMouseY(e.clientY / window.innerHeight)
    }

    // Create particles
    const createParticles = () => {
      if (!particlesRef.current) return

      const container = particlesRef.current
      container.innerHTML = ""

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")

        // Randomize particle properties
        const size = Math.random() * 5 + 2
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        // Set particle styles
        particle.className = "absolute rounded-full"
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${x}%`
        particle.style.top = `${y}%`
        particle.style.opacity = "0"
        particle.style.background = Math.random() > 0.5 ? "rgba(255, 0, 51, 0.5)" : "rgba(0, 166, 80, 0.5)"

        // Set animation
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`

        container.appendChild(particle)
      }
    }

    // Text rotation timer
    const textRotationTimer = setInterval(() => {
      setAnimationCount((prev) => prev + 1)

      // After showing each line individually twice, show all lines together
      if (animationCount >= 5) {
        setAnimationPhase(3) // Show all lines
      } else {
        setAnimationPhase((prev) => (prev + 1) % 3) // Cycle through individual lines
      }
    }, 2000)

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    createParticles()

    return () => {
      clearTimeout(loadTimer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(textRotationTimer)
    }
  }, [animationCount]) // animationCountの依存関係はこちらのuseEffectにのみ残す

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Dynamic background with parallax effect */}
      <div
        className="absolute inset-0 bg-ninja-blue-dark overflow-hidden transition-transform duration-500"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        {/* Animated red light beams */}
        <div
          className="absolute top-1/4 left-1/4 w-full h-full bg-ninja-red opacity-20 blur-3xl transform -rotate-45 transition-all duration-1000"
          style={{
            transform: `rotate(-45deg) translate(${mouseX * 20}px, ${mouseY * 20}px)`,
            opacity: 0.2 + mouseY * 0.1,
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-full h-full bg-ninja-red opacity-10 blur-3xl transform rotate-45 transition-all duration-1000"
          style={{
            transform: `rotate(45deg) translate(${-mouseX * 20}px, ${-mouseY * 20}px)`,
            opacity: 0.1 + mouseX * 0.1,
          }}
        ></div>

        {/* Animated green effects */}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-ninja-green opacity-20 blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + mouseY * 0.2})`,
            opacity: 0.2 + (mouseX + mouseY) * 0.05,
          }}
        ></div>
      </div>

      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        {/* Particles will be created by JavaScript */}
      </div>

      {/* City silhouette with parallax */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-black opacity-70 transition-transform duration-500"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      ></div>

      {/* Ninja silhouette with animation */}
      <div
        className={`absolute right-0 bottom-0 w-[550px] h-[550px] md:w-[850px] md:h-[850px] lg:w-[1100px] lg:h-[1100px] transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
        }`}
        style={{
          transform: `translateX(${mouseX * -20}px) translateY(${mouseY * -10}px)`,
        }}
      >
        <div className="relative h-full flex items-end">
          {showAlternateImage ? (
            <Image
              src="/images/political-ninja-eyes.png"
              alt="政治忍者（特別バージョン）"
              width={1100}
              height={1100}
              className="object-contain"
              priority
            />
          ) : (
            <Image
              src="/images/political-ninja-mask.png"
              alt="政治忍者"
              width={1100}
              height={1100}
              className="object-contain"
              priority
            />
          )}
        </div>
      </div>

      {/* Content with animations */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="h-[200px] md:h-[250px] relative">
            {" "}
            {/* Added relative positioning */}
            {/* Individual lines animation (phases 0-2) */}
            {animationPhase < 3 &&
              slogans.map((slogan, index) => (
                <h1
                  key={`single-${index}`}
                  className={`text-4xl md:text-6xl font-bold mb-4 leading-tight absolute transition-all duration-700 ${
                    animationPhase === index ? "opacity-100 transform-none" : "opacity-0 -translate-x-10"
                  } ${index === 0 ? "text-ninja-red" : index === 1 ? "text-white" : "text-ninja-green"}`}
                >
                  {slogan}
                </h1>
              ))}
            {/* All lines together animation (phase 3) */}
            {animationPhase === 3 && (
              <div className="transition-all duration-1000 transform animate-slide-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-ninja-red">{slogans[0]}</h1>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white">{slogans[1]}</h1>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-ninja-green">{slogans[2]}</h1>
              </div>
            )}
          </div>

          <p
            className={`text-xl md:text-2xl text-gray-200 mb-8 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            無関心という闇を、エンタメの刃で切り裂く。
            <br />
            政治忍者、参上。
          </p>

          <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <a href="https://www.youtube.com/watch?v=OUWq0kXn7PE" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-ninja-red hover:bg-ninja-red-dark relative overflow-hidden group">
                <span className="relative z-10">最新曲「政治改革ジャパン」を聴く</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-white relative overflow-hidden group bg-transparent"
              onClick={() => window.open("https://line.me/R/ti/p/@470opewc", "_blank")}
            >
              <span className="relative z-10">活動に参加する</span>
              <span className="absolute inset-0 bg-ninja-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </div>

          {/* Social media icons with animations */}
          <div
            className={`mt-12 flex space-x-6 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="https://x.com/seijixninja"
              target="_blank"
              rel="noopener noreferrer"
              className={`transform transition-all duration-500 hover:rotate-45 hover:scale-110 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
              aria-label="X (Twitter)"
            >
              <div className="bg-blue-500 p-3 rounded-full">
                <Twitter className="h-6 w-6 text-white" />
              </div>
            </a>
            <a
              href="https://instagram.com/seijixninja"
              target="_blank"
              rel="noopener noreferrer"
              className={`transform transition-all duration-500 hover:rotate-45 hover:scale-110 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "600ms" }}
              aria-label="Instagram"
            >
              <div className="bg-red-500 p-3 rounded-full">
                <Instagram className="h-6 w-6 text-white" />
              </div>
            </a>
            <a
              href="https://line.me/R/ti/p/@470opewc"
              target="_blank"
              rel="noopener noreferrer"
              className={`transform transition-all duration-500 hover:rotate-45 hover:scale-110 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "700ms" }}
              aria-label="LINE"
            >
              <div className="bg-green-500 p-3 rounded-full">
                <LineIcon className="h-6 w-6 text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
