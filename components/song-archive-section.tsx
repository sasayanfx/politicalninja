"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Share2, Download, Flame } from "lucide-react"
import { ShurikenIcon } from "@/components/icons/shuriken-icon"

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

// 楽曲アーカイブセクション
export default function SongArchiveSection() {
  // 過去の楽曲データ
  const releasedSongs = [
    {
      title: "税のブルース",
      type: "政治忍者オリジナル",
      satireLevel: 4,
      thumbnail: "/images/zei-no-blues-thumbnail.jpg",
      youtubeUrl: "https://youtu.be/QwRxGfhfkkQ",
      description: "政治忍者セカンドリリース曲",
      releaseDate: "2023年6月",
    },
    {
      title: "増税信者",
      type: "お祭り忍者の替え歌",
      satireLevel: 5,
      thumbnail: "/images/zouzei-shinja-thumbnail.jpg",
      youtubeUrl: "https://youtu.be/Fv9G-kPJ0eE",
      description: "政治忍者ファーストリリース曲",
      releaseDate: "2023年5月",
    },
  ]

  return (
    <section id="song-archive" className="py-20 bg-ninja-blue-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            楽曲<span className="text-ninja-red">アーカイブ</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
          <p className="mt-4 text-lg">政治忍者がこれまでにリリースした楽曲の一覧です</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {releasedSongs.map((song, index) => (
            <Card key={index} className="bg-black border-ninja-green overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video relative bg-gray-900 flex items-center justify-center">
                  <a
                    href={song.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <Button size="icon" className="w-16 h-16 rounded-full bg-ninja-red hover:bg-ninja-red-light">
                      <Play className="h-8 w-8" />
                    </Button>
                  </a>
                  <img
                    src={song.thumbnail || "/placeholder.svg"}
                    alt={`${song.title} - 政治忍者`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-bold">「{song.title}」</h4>
                    <SatireLevel level={song.satireLevel as 1 | 2 | 3 | 4 | 5} />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-300">{song.description}</p>
                    <span className="text-xs text-gray-400">{song.releaseDate}</span>
                  </div>
                  <div className="flex space-x-3">
                    <a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer">
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
                        navigator.clipboard.writeText(song.youtubeUrl)
                        // You could add a toast notification here
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" /> シェア
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6">
            <ShurikenIcon className="inline-block text-ninja-red mr-2" size={20} />
            政治忍者の楽曲は随時追加されます。お楽しみに！
            <ShurikenIcon className="inline-block text-ninja-red ml-2" size={20} />
          </p>
          <Button className="bg-ninja-red hover:bg-ninja-red-dark">
            <Play className="mr-2 h-4 w-4" /> YouTubeチャンネルを見る
          </Button>
        </div>
      </div>
    </section>
  )
}
