import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ProfileSection() {
  return (
    <section id="profile" className="py-16 bg-ninja-blue-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ninja-red opacity-5 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-ninja-green opacity-5 transform -rotate-45"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-ninja-red">政治忍者</span>とは
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-ninja-red opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-ninja-green opacity-10 rounded-full"></div>
            <div className="relative z-10 rounded-lg overflow-hidden border-4 border-ninja-blue shadow-xl">
              <Image
                src="/images/seiji-ninja-card.png"
                alt="政治忍者キャラクター"
                width={500}
                height={500}
                className="w-full object-cover"
              />
            </div>
          </div>

          <div>
            <Card className="bg-ninja-blue border-none shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">政治忍者の使命</h3>
                <p className="mb-4 text-gray-200">
                  政治忍者は、若者の政治参加を促進するために活動するグループです。音楽とエンターテイメントの力を使って、政治的な無関心という「闇」に切り込みます。
                </p>
                <p className="mb-6 text-gray-200">
                  2025年に活動を開始し、政治替え歌を通じて政治的メッセージを発信。若者が政治に興味を持ち、自分の声を届けることの大切さを伝えています。
                </p>

                <Button className="w-full bg-ninja-red hover:bg-ninja-red-dark group">
                  <span>詳しい活動内容を見る</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
