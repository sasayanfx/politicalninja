"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "components/ui/card"
import { Progress } from "components/ui/progress"

export default function CurrentStateSection() {
  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)
  const [progress3, setProgress3] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress1(30), 300)
    const timer2 = setTimeout(() => setProgress2(50), 600)
    const timer3 = setTimeout(() => setProgress3(70), 900)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <section id="current-state" className="py-20 bg-ninja-blue-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            若者の政治参画の<span className="text-ninja-red">現状</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-ninja-green">投票率の低下</h3>
              <p className="text-lg mb-6">
                若年層（20代）の投票率は全世代の中で最も低く、民主主義の危機とも言える状況です。
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>20代投票率</span>
                    <span className="text-ninja-red font-bold text-xl">36%</span>
                  </div>
                  <Progress value={progress1} className="h-4 bg-gray-700" indicatorClassName="bg-ninja-red" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>40代投票率</span>
                    <span className="text-ninja-green font-bold text-xl">50%</span>
                  </div>
                  <Progress value={progress2} className="h-4 bg-gray-700" indicatorClassName="bg-ninja-green" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>60代投票率</span>
                    <span className="text-white font-bold text-xl">70%</span>
                  </div>
                  <Progress value={progress3} className="h-4 bg-gray-700" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-ninja-green">政治的無関心の広がり</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-ninja-blue border-ninja-red">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-ninja-red mb-2">67%</div>
                  <p>政治に関心がない若者の割合</p>
                </CardContent>
              </Card>

              <Card className="bg-ninja-blue border-ninja-red">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-ninja-red mb-2">78%</div>
                  <p>政治は難しいと感じる若者の割合</p>
                </CardContent>
              </Card>

              <Card className="bg-ninja-blue border-ninja-red">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-ninja-red mb-2">54%</div>
                  <p>自分の一票は政治を変えられないと思う若者の割合</p>
                </CardContent>
              </Card>

              <Card className="bg-ninja-blue border-ninja-red">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-ninja-red mb-2">41%</div>
                  <p>政治家を信頼していない若者の割合</p>
                </CardContent>
              </Card>
            </div>

            <p className="mt-6 text-lg">
              これらの数字は、若者と政治の間に大きな溝があることを示しています。政治忍者は、この溝を埋めるために活動しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
