"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Users, TrendingUp } from "lucide-react"
import { SpinningShurikenIcon } from "components/icons/shuriken-icon"

export default function GoalsSection() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  useEffect(() => {
    let interval1: NodeJS.Timeout | null = null
    let interval2: NodeJS.Timeout | null = null
    let interval3: NodeJS.Timeout | null = null

    // Use setTimeout to start the animations after component is mounted
    const timer = setTimeout(() => {
      interval1 = setInterval(() => {
        setCount1((prev) => {
          if (prev < 10) return prev + 1
          if (interval1) clearInterval(interval1)
          return prev
        })
      }, 200)

      interval2 = setInterval(() => {
        setCount2((prev) => {
          if (prev < 100000) return prev + 5000
          if (interval2) clearInterval(interval2)
          return prev
        })
      }, 100)

      interval3 = setInterval(() => {
        setCount3((prev) => {
          if (prev < 25) return prev + 1
          if (interval3) clearInterval(interval3)
          return prev
        })
      }, 150)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (interval1) clearInterval(interval1)
      if (interval2) clearInterval(interval2)
      if (interval3) clearInterval(interval3)
    }
  }, [])

  return (
    <section id="goals" className="py-20 ninja-gradient-green">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            今期の<span className="text-ninja-red">目標</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-ninja-blue-dark border-ninja-red">
            <CardContent className="p-6 text-center">
              <div className="bg-ninja-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <SpinningShurikenIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">若者の投票率向上</h3>
              <div className="text-5xl font-bold text-ninja-red mb-2">+{count1}%</div>
              <p className="text-gray-300">次の選挙での若者投票率の向上目標</p>
            </CardContent>
          </Card>

          <Card className="bg-ninja-blue-dark border-ninja-red">
            <CardContent className="p-6 text-center">
              <div className="bg-ninja-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">SNSフォロワー</h3>
              <div className="text-5xl font-bold text-ninja-red mb-2">+{count2.toLocaleString()}</div>
              <p className="text-gray-300">政治忍者のSNS総フォロワー目標</p>
            </CardContent>
          </Card>

          <Card className="bg-ninja-blue-dark border-ninja-red">
            <CardContent className="p-6 text-center">
              <div className="bg-ninja-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">政治替え歌制作</h3>
              <div className="text-5xl font-bold text-ninja-red mb-2">+{count3}</div>
              <p className="text-gray-300">年間の政治替え歌制作目標数</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">長期ビジョン</h3>
          <p className="text-lg mb-8">
            政治忍者は、<span className="text-ninja-red font-bold">2030年までに若者の投票率を20%向上</span>させ、
            政治とエンターテイメントを融合させた新しい政治参加の形を日本全国に広げることを目指しています。
          </p>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-ninja-red via-ninja-green to-ninja-blue w-1/3 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>2023年スタート</span>
            <span>現在地点</span>
            <span>2030年目標</span>
          </div>
        </div>
      </div>
    </section>
  )
}
