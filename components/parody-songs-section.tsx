"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Share2, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ParodySongsSection() {
  const { toast } = useToast()

  const handleShare = async (title: string, url: string) => {
    const text = `🎵 ${title} - 政治忍者の替え歌をチェック！`

    if (navigator.share) {
      try {
        await navigator.share({ title: text, url })
      } catch (error) {
        // ユーザーがキャンセルした場合など
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`)
        toast({
          title: "リンクをコピーしました",
          description: "SNSでシェアしてください！",
        })
      } catch (error) {
        toast({
          title: "コピーに失敗しました",
          description: "手動でリンクをコピーしてください",
          variant: "destructive",
        })
      }
    }
  }

  const getSatireDegreeText = (degree: number) => {
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
        return "ピリ辛"
    }
  }

  const latestSong = {
    title: "増税ループ",
    originalSong: "オドループ",
    artist: "フレデリック",
    releaseDate: "2025年7月",
    satireDegree: 3,
    description:
      "増税の無限ループに陥った日本の現状を痛烈に風刺した中辛レベルの楽曲。政府の税制政策への怒りを込めた一作。",
    youtubeUrl: "https://youtu.be/f9oIlc3IjjA",
    thumbnail: "/images/zouzei-loop-thumbnail.jpg",
  }

  const SongCard = ({ song, isLatest = false }: { song: any; isLatest?: boolean }) => (
    <Card
      className={`${isLatest ? "bg-gradient-to-r from-red-900/50 to-black/50 border-ninja-red" : "bg-ninja-blue-dark border-ninja-green"} transition-all duration-300 hover:scale-105`}
    >
      <CardContent className="p-6">
        <div className="relative mb-4">
          <Image
            src={song.thumbnail || "/placeholder.svg"}
            alt={song.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
          {isLatest && (
            <div className="absolute top-2 right-2 bg-ninja-red text-white px-2 py-1 rounded text-xs font-bold">
              最新
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2">{song.title}</h3>

        <div className="text-sm text-gray-300 mb-3">
          <p>原曲: {song.originalSong}</p>
          <p>歌手: {song.artist}</p>
          <p>リリース: {song.releaseDate}</p>
        </div>

        <div className="flex items-center mb-3">
          <span className="text-sm font-medium mr-2">風刺度:</span>
          <div className="flex space-x-1">
            {Array.from({ length: song.satireDegree }, (_, i) => (
              <span key={i} className="text-lg text-ninja-red">
                🔥
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm font-bold text-ninja-red">{getSatireDegreeText(song.satireDegree)}</span>
        </div>

        <p className="text-sm text-gray-300 mb-4">{song.description}</p>

        <div className="flex space-x-2">
          <Button
            onClick={() => window.open(song.youtubeUrl, "_blank")}
            size="sm"
            className="bg-ninja-red hover:bg-ninja-red-dark flex-1"
          >
            <Play className="mr-1 h-4 w-4" />
            視聴
          </Button>
          <Button
            onClick={() => handleShare(song.title, song.youtubeUrl)}
            variant="outline"
            size="sm"
            className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-black"
          >
            <Share2 className="mr-1 h-4 w-4" />
            シェア
          </Button>
          <Button
            onClick={() => window.open(song.youtubeUrl, "_blank")}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section id="parody-songs" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            最新<span className="text-ninja-red">楽曲</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SongCard song={latestSong} isLatest={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
