import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Share2 } from "lucide-react"

const fanMessages = [
  {
    name: "影丸",
    message: "政治忍者のおかげで初めて選挙に行きました！替え歌が頭から離れなくて、投票所まで口ずさんでました。",
    avatar: "/anime-ninja-avatar-1.png",
    date: "3日前",
  },
  {
    name: "月光",
    message: "友達と「選挙に行こう」を歌いながら投票に行きました。政治が楽しくなるなんて思ってもみませんでした！",
    avatar: "/anime-ninja-avatar-2.png",
    date: "1週間前",
  },
  {
    name: "風魂",
    message: "替え歌のおかげで、消費税の仕組みがやっと理解できました。難しい政治の話も歌にするとわかりやすい！",
    avatar: "/anime-ninja-avatar-3.png",
    date: "2週間前",
  },
  {
    name: "雷斬",
    message: "政治忍者のライブに参加して、同世代の政治に興味ある仲間ができました。これからも活動応援してます！",
    avatar: "/anime-ninja-avatar-4.png",
    date: "3週間前",
  },
]

export default function FansSection() {
  return (
    <section id="fans" className="py-20 ninja-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ファンの<span className="text-ninja-red">広場</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fanMessages.map((fan, index) => (
              <Card key={index} className="bg-ninja-blue-dark border-ninja-green">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={fan.avatar || "/placeholder.svg"}
                        alt={fan.name}
                        className="w-12 h-12 rounded-full border-2 border-ninja-red"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">{fan.name}</h4>
                        <span className="text-xs text-gray-400">{fan.date}</span>
                      </div>
                      <p className="text-gray-200 mb-4">{fan.message}</p>
                      <div className="flex space-x-4">
                        <button className="text-gray-400 hover:text-ninja-red flex items-center text-sm">
                          <Heart className="h-4 w-4 mr-1" /> いいね
                        </button>
                        <button className="text-gray-400 hover:text-ninja-green flex items-center text-sm">
                          <MessageSquare className="h-4 w-4 mr-1" /> 返信
                        </button>
                        <button className="text-gray-400 hover:text-ninja-red flex items-center text-sm">
                          <Share2 className="h-4 w-4 mr-1" /> シェア
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-ninja-blue p-8 rounded-lg border-l-4 border-ninja-red">
            <h3 className="text-2xl font-bold mb-6">あなたも忍者隊になろう！</h3>
            <p className="mb-6">
              政治忍者のファンコミュニティに参加して、あなたの声を届けましょう。
              忍者ネームを作って、メッセージを投稿したり、活動に参加したりできます。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-ninja-red hover:bg-ninja-red-dark">忍者登録する</Button>
              <Button
                variant="outline"
                className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-white"
              >
                ファンアート投稿
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
