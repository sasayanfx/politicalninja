"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Share2, Download, Flame, History } from "lucide-react"
import { ShurikenIcon } from "@/components/icons/shuriken-icon"
import { useState } from "react"

// 風刺度合いを表示するコンポーネント
const SatireLevel = ({ level }: { level: 1 | 2 | 3 | 4 | 5 }) => {
  const labels = {
    1: "ピリ辛",
    2: "辛め",
    3: "中辛",
    4: "大辛",
    5: "激辛",
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: level }).map((_, i) => (
          <Flame key={i} className="h-4 w-4 text-red-500 fill-red-500" />
        ))}
        {Array.from({ length: 5 - level }).map((_, i) => (
          <Flame key={i + level} className="h-4 w-4 text-gray-400" />
        ))}
      </div>
      <span className="text-xs ml-1">{labels[level]}</span>
    </div>
  )
}

export default function ParodySongsSection() {
  // タブの状態管理
  const [activeTab, setActiveTab] = useState<"latest" | "previous">("latest")

  // リリース予定曲のデータ
  const upcomingSongs = [
    { title: "増税ループ", type: "政治忍者替え歌", satireLevel: 4 },
    { title: "政治改革ジャパン", type: "政治忍者替え歌", satireLevel: 1 },
    { title: "おら国会さ行くだ", type: "政治忍者替え歌", satireLevel: 3 },
  ]

  // 過去の楽曲データ
  const previousSongs = [
    {
      title: "増税信者",
      type: "お祭り忍者の替え歌",
      satireLevel: 5,
      thumbnail: "/images/zouzei-shinja-thumbnail.jpg",
      youtubeUrl: "https://youtu.be/Fv9G-kPJ0eE",
      description: "政治忍者ファーストリリース曲",
    },
  ]

  return (
    <section id="parody-songs" className="py-20 ninja-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-ninja-red">政治忍者</span>の楽曲
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-ninja-blue-dark p-8 rounded-lg border-l-4 border-ninja-green relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-ninja-red opacity-10 rounded-full -mr-12 -mt-12"></div>

            <h3 className="text-2xl font-bold mb-6 text-ninja-green">音楽の力</h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
                <p>
                  <span className="text-ninja-red font-bold">記憶に残る</span> -
                  歌は言葉よりも記憶に残りやすく、政治的メッセージを伝えるのに効果的です。
                </p>
              </li>
              <li className="flex items-start">
                <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
                <p>
                  <span className="text-ninja-red font-bold">共感を生む</span> -
                  メロディに乗せることで、政治的なメッセージに親しみを持ってもらえます。
                </p>
              </li>
              <li className="flex items-start">
                <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
                <p>
                  <span className="text-ninja-red font-bold">拡散しやすい</span> -
                  SNSでシェアされやすく、若者の間で自然と広がります。
                </p>
              </li>
              <li className="flex items-start">
                <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
                <p>
                  <span className="text-ninja-red font-bold">難しい内容をわかりやすく</span> -
                  複雑な政治的課題を、歌詞を通じてシンプルに伝えることができます。
                </p>
              </li>
              <li className="flex items-start">
                <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
                <p>
                  <span className="text-ninja-red font-bold">社会のアンテナを高める</span> -
                  複雑な政治問題を分かりやすく伝え、広く社会の関心を集めることができます。若者を含む多くの人々が政治に興味を持つきっかけになります。
                </p>
              </li>
              <li className="flex items-start">
                <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
                <p>
                  <span className="text-ninja-red font-bold">批判精神の醸成</span> -
                  ユーモアを交えた風刺は、権力に対する健全な批判精神を育み、民主主義の基盤を強化します。固定観念を打ち破るパワーがあります。
                </p>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-ninja-green">最新の楽曲</h3>
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "latest" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("latest")}
                  className={activeTab === "latest" ? "bg-ninja-red hover:bg-ninja-red-dark" : ""}
                >
                  最新曲
                </Button>
                <Button
                  variant={activeTab === "previous" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("previous")}
                  className={activeTab === "previous" ? "bg-ninja-green hover:bg-ninja-green-dark" : ""}
                >
                  <History className="mr-1 h-4 w-4" /> 過去の曲
                </Button>
              </div>
            </div>

            {activeTab === "latest" ? (
              <Card className="bg-black border-ninja-red mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-gray-900 flex items-center justify-center">
                    <a
                      href="https://youtu.be/QwRxGfhfkkQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <Button size="icon" className="w-16 h-16 rounded-full bg-ninja-red hover:bg-ninja-red-light">
                        <Play className="h-8 w-8" />
                      </Button>
                    </a>
                    <img
                      src="/images/zei-no-blues-thumbnail.jpg"
                      alt="税のブルース - 政治忍者"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold">「税のブルース」</h4>
                      <SatireLevel level={4} />
                    </div>
                    <p className="text-gray-300 mb-4">政治忍者セカンドリリース曲</p>
                    <div className="flex space-x-3">
                      <a href="https://youtu.be/QwRxGfhfkkQ" target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-white"
                        >
                          <Download className="mr-2 h-4 w-4" /> YouTube
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-ninja-red text-ninja-red hover:bg-ninja-red hover:text-white"
                        onClick={() => {
                          navigator.clipboard.writeText("https://youtu.be/QwRxGfhfkkQ")
                          // You could add a toast notification here
                        }}
                      >
                        <Share2 className="mr-2 h-4 w-4" /> シェア
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black border-ninja-red mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-gray-900 flex items-center justify-center">
                    <a
                      href="https://youtu.be/Fv9G-kPJ0eE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <Button size="icon" className="w-16 h-16 rounded-full bg-ninja-red hover:bg-ninja-red-light">
                        <Play className="h-8 w-8" />
                      </Button>
                    </a>
                    <img
                      src="/images/zouzei-shinja-thumbnail.jpg"
                      alt="増税信者 - 政治忍者"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold">「増税信者」</h4>
                      <SatireLevel level={5} />
                    </div>
                    <p className="text-gray-300 mb-4">お祭り忍者の替え歌 - 政治忍者ファーストリリース曲</p>
                    <div className="flex space-x-3">
                      <a href="https://youtu.be/Fv9G-kPJ0eE" target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-white"
                        >
                          <Download className="mr-2 h-4 w-4" /> YouTube
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-ninja-red text-ninja-red hover:bg-ninja-red hover:text-white"
                        onClick={() => {
                          navigator.clipboard.writeText("https://youtu.be/Fv9G-kPJ0eE")
                        }}
                      >
                        <Share2 className="mr-2 h-4 w-4" /> シェア
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-ninja-green">リリース予定曲</h3>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-red-500 fill-red-500" />
                <span className="text-xs">風刺度合い</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {upcomingSongs.map((song, index) => (
                <Card key={index} className="bg-black border-ninja-green">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-bold">{song.title}</h5>
                      <SatireLevel level={song.satireLevel as 1 | 2 | 3 | 4 | 5} />
                    </div>
                    <p className="text-xs text-gray-400">{song.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
