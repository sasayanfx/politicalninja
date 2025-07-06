"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ExternalLink, Calendar, Music, User } from "lucide-react"
import Image from "next/image"

// 風刺度に応じたテキストを返す関数
const getSatireDegreeText = (degree: number): string => {
  switch (degree) {
    case 1:
      return "ピリ辛"
    case 2:
      return "辛口"
    case 3:
      return "中辛"
    case 4:
      return "大辛"
    case 5:
      return "激辛"
    default:
      return "不明"
  }
}

export default function ParodySongsSection() {
  const [activeTab, setActiveTab] = useState("latest")

  // 最新楽曲
  const latestSong = {
    id: "seiji-kaikaku-japan",
    title: "政治改革ジャパン",
    originalSong: "宇宙刑事ギャバン",
    originalArtist: "串田アキラ",
    satireDegree: 1,
    releaseDate: "2024年12月",
    youtubeUrl: "https://www.youtube.com/watch?v=OUWq0kXn7PE",
    thumbnail: "/images/seiji-kaikaku-japan-thumbnail.jpg",
    description: "政治改革への願いを込めた、宇宙刑事ギャバンの替え歌。正義のヒーローのように政治を変えていこう！",
    tags: ["政治改革", "正義", "ヒーロー", "変革"],
  }

  // 過去の楽曲
  const pastSongs = [
    {
      id: "munou-souri-tanjou",
      title: "無能総理誕生！",
      originalSong: "津軽海峡冬景色",
      originalArtist: "石川さゆり",
      satireDegree: 5,
      releaseDate: "2024年11月",
      youtubeUrl: "https://youtu.be/dPy2YdzakgY",
      thumbnail: "/images/munou-souri-tanjou-thumbnail.jpg",
      description: "政治の現状を痛烈に風刺した激辛楽曲。津軽海峡冬景色のメロディーに乗せて、政治への怒りを歌う。",
      tags: ["政治批判", "風刺", "激辛", "社会問題"],
    },
    {
      id: "zouzei-shinja",
      title: "増税真理教",
      originalSong: "津軽海峡冬景色",
      originalArtist: "石川さゆり",
      satireDegree: 5,
      releaseDate: "2024年10月",
      youtubeUrl: "https://youtu.be/example2",
      thumbnail: "/images/zouzei-shinja-thumbnail.jpg",
      description: "増税政策を宗教に例えた風刺楽曲。政治の闇を鋭く切り込む激辛の一曲。",
      tags: ["増税", "政治風刺", "社会批判", "激辛"],
    },
    {
      id: "kome-kuu-hi-made",
      title: "米食う日まで",
      originalSong: "津軽海峡冬景色",
      originalArtist: "石川さゆり",
      satireDegree: 4,
      releaseDate: "2024年9月",
      youtubeUrl: "https://youtu.be/example3",
      thumbnail: "/images/kome-kuu-hi-made-thumbnail.jpg",
      description: "庶民の生活の厳しさを歌った楽曲。日々の食事にも困る現実を風刺。",
      tags: ["庶民生活", "経済問題", "生活苦", "大辛"],
    },
    {
      id: "zei-no-blues",
      title: "税のブルース",
      originalSong: "津軽海峡冬景色",
      originalArtist: "石川さゆり",
      satireDegree: 4,
      releaseDate: "2024年8月",
      youtubeUrl: "https://youtu.be/example4",
      thumbnail: "/images/zei-no-blues-thumbnail.jpg",
      description: "税金の重さを嘆く庶民の心境を歌ったブルース調の楽曲。",
      tags: ["税金", "ブルース", "庶民", "大辛"],
    },
    {
      id: "orera-kokkai-sa-ikuda",
      title: "俺ら国会さ行くだ",
      originalSong: "津軽海峡冬景色",
      originalArtist: "石川さゆり",
      satireDegree: 3,
      releaseDate: "2024年7月",
      youtubeUrl: "https://youtu.be/example5",
      thumbnail: "/images/orera-kokkai-sa-ikuda-thumbnail.jpg",
      description: "政治参加への呼びかけを込めた楽曲。国民一人ひとりの政治への関心を促す。",
      tags: ["政治参加", "国会", "民主主義", "中辛"],
    },
  ]

  const SongCard = ({ song, isLatest = false }: { song: any; isLatest?: boolean }) => (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 ${isLatest ? "border-ninja-red shadow-ninja-red/20" : "hover:border-ninja-green/50"}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle
              className={`text-xl mb-2 group-hover:text-ninja-red transition-colors ${isLatest ? "text-ninja-red" : ""}`}
            >
              {song.title}
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Music className="w-4 h-4" />
              <span>原曲: {song.originalSong}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <User className="w-4 h-4" />
              <span>歌手: {song.originalArtist}</span>
            </div>
          </div>
          {isLatest && (
            <Badge variant="destructive" className="bg-ninja-red">
              最新
            </Badge>
          )}
        </div>

        {/* サムネイル画像 */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={song.thumbnail || "/placeholder.svg"}
            alt={`${song.title}のサムネイル`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white">
              <Calendar className="w-3 h-3 mr-1" />
              {song.releaseDate}
            </Badge>
          </div>
        </div>

        {/* 風刺度表示 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">風刺度:</span>
            <div className="flex space-x-1">
              {Array.from({ length: song.satireDegree }, (_, i) => (
                <span key={i} className="text-lg">
                  🔥
                </span>
              ))}
            </div>
            <span className="text-sm font-bold text-ninja-red">{getSatireDegreeText(song.satireDegree)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{song.description}</p>

        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {song.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* アクションボタン */}
        <div className="flex space-x-2">
          <Button
            className="flex-1 bg-ninja-red hover:bg-ninja-red-dark"
            onClick={() => window.open(song.youtubeUrl, "_blank")}
          >
            <Play className="w-4 h-4 mr-2" />
            視聴する
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-white bg-transparent"
            onClick={() => window.open(song.youtubeUrl, "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section id="parody-songs" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-ninja-blue">替え歌</span>
            <span className="text-ninja-red">楽曲</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            政治の現実を音楽で表現。誰もが知っている名曲に、現代社会への想いを込めて。
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="latest" className="text-lg py-3">
              🎵 最新楽曲
            </TabsTrigger>
            <TabsTrigger value="archive" className="text-lg py-3">
              📚 楽曲アーカイブ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <SongCard song={latestSong} isLatest={true} />
            </div>
          </TabsContent>

          <TabsContent value="archive" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
