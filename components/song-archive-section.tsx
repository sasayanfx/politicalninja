"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Share2, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function SongArchiveSection() {
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

  const songs = [
    {
      title: "You Are！ZAIMU＝SHOW",
      originalSong: "ウィーアー！",
      artist: "きただにひろし",
      releaseDate: "2025年8月",
      satireDegree: 4,
      description: "海外には大金バラまくのに財源がないと絶対に減税しない無能財務省に強烈パンチ！",
      youtubeUrl: "https://youtu.be/8JEl3vHmRz4",
      thumbnail: "/images/you-are-zaimu-show-thumbnail.jpg",
      isLatest: true,
    },
    {
      title: "あー開票中",
      originalSong: "あー夏休み",
      artist: "TUBE",
      releaseDate: "2025年8月",
      satireDegree: 4,
      description:
        "参院選の深夜の不信な票の動きを不正選挙と痛烈に風刺した大辛レベルの楽曲。選挙管理委員会への怒りを込めた一作。",
      youtubeUrl: "https://youtu.be/4QXUmQjvkvY",
      thumbnail: "/images/aa-kaihyouchuu-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "世界中の議員よりきっと",
      originalSong: "世界中の誰よりきっと",
      artist: "中山美穂&WANDS",
      releaseDate: "2025年8月",
      satireDegree: 4,
      description:
        "高すぎる議員報酬を貰いながら議会で昼寝する議員を痛烈に風刺した大辛レベルの楽曲。国会議員への怒りを込めた一作。",
      youtubeUrl: "https://youtu.be/pWRnYAaYJCI",
      thumbnail: "/images/sekaijuu-no-giin-yori-kitto-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "石破よGoodbye！",
      originalSong: "キン肉マンGoFight！",
      artist: "串田アキラ",
      releaseDate: "2025年7月",
      satireDegree: 4,
      description:
        "3連敗でも辞任しない石破首相へのレクイエムを痛烈に風刺した大辛レベルの楽曲。政府の税制政策への怒りを込めた一作。",
      youtubeUrl: "https://youtu.be/uKQFZwAokw0",
      thumbnail: "/images/ishiba-goodbye-kinnikuman-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "自民と財務省のマネーゲーム",
      originalSong: "男と女のラブゲーム",
      artist: "津々美洋",
      releaseDate: "2025年7月",
      satireDegree: 5,
      description:
        "増税一辺倒の財務省とその傀儡の自民党の現状を痛烈に風刺した激辛レベルの楽曲。政府の税制政策への怒りを込めた一作。",
      youtubeUrl: "https://youtu.be/6TtKe69qICA",
      thumbnail: "/images/jimin-zaimusho-money-game-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "増税ループ",
      originalSong: "オドループ",
      artist: "フレデリック",
      releaseDate: "2025年7月",
      satireDegree: 3,
      description:
        "増税の無限ループに陥った日本の現状を痛烈に風刺した中辛レベルの楽曲。政府の税制政策への怒りを込めた一作。",
      youtubeUrl: "https://youtu.be/f9oIlc3IjjA",
      thumbnail: "/images/zouzei-loop-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "無能総理誕生！",
      originalSong: "勇者王誕生！",
      artist: "遠藤正明",
      releaseDate: "2025年6月",
      satireDegree: 5,
      description: "総理の無能さを痛烈に風刺した激辛レベルの楽曲。現政権への怒りを込めた渾身の一作。",
      youtubeUrl: "https://youtu.be/dPy2YdzakgY",
      thumbnail: "/images/munou-souri-tanjou-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "米食う日まで",
      originalSong: "また逢う日まで",
      artist: "尾崎紀世彦",
      releaseDate: "2025年6月",
      satireDegree: 4,
      description: "令和の米騒動問題と政治の関係を歌った社会派楽曲。庶民の生活苦を代弁する。",
      youtubeUrl: "https://youtu.be/example2",
      thumbnail: "/images/kome-kuu-hi-made-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "俺ら国会さ行くだ",
      originalSong: "俺ら東京さ行くだ",
      artist: "吉幾三",
      releaseDate: "2025年6月",
      satireDegree: 5,
      description: "現在の政治的問題を提起し、政治参加の重要性を訴える楽曲。若者の政治離れに一石を投じる。",
      youtubeUrl: "https://youtu.be/example3",
      thumbnail: "/images/orera-kokkai-sa-ikuda-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "税のブルース",
      originalSong: "哀のブルース",
      artist: "吉幾三",
      releaseDate: "2025年6月",
      satireDegree: 3,
      description: "増税への不満を歌ったブルース調の楽曲。税制の矛盾を鋭く指摘。",
      youtubeUrl: "https://youtu.be/example4",
      thumbnail: "/images/zei-no-blues-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "増税信者",
      originalSong: "お祭り忍者",
      artist: "忍者",
      releaseDate: "2025年6月",
      satireDegree: 5,
      description: "とにかく税金が多岐に渡り、高すぎる問題を訴える風刺楽曲。政府の税制政策への痛烈な批判。",
      youtubeUrl: "https://youtu.be/example5",
      thumbnail: "/images/zouzei-shinja-thumbnail.jpg",
      isLatest: false,
    },
  ]

  return (
    <section id="archive" className="py-20 ninja-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            楽曲<span className="text-ninja-red">アーカイブ</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            政治忍者が手がけた替え歌の全楽曲をご覧いただけます。それぞれの楽曲に込められた政治的メッセージをお楽しみください。
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song, index) => (
              <Card
                key={index}
                className={`${song.isLatest ? "bg-gradient-to-r from-red-900/50 to-black/50 border-ninja-red" : "bg-ninja-blue-dark border-ninja-green"} transition-all duration-300 hover:scale-105`}
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
                    {song.isLatest && (
                      <div className="absolute top-2 right-2 bg-ninja-red text-white px-2 py-1 rounded text-xs font-bold">
                        最新
                      </div>
                    )}
                    {song.satireDegree === 5 && (
                      <div className="absolute top-2 left-2 flex space-x-1">
                        <span className="text-lg">🔥</span>
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
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < song.satireDegree ? "text-ninja-red" : "text-gray-600"}`}
                        >
                          🔥
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-bold text-ninja-red">
                      {song.satireDegree === 5
                        ? "激辛"
                        : song.satireDegree === 4
                          ? "大辛"
                          : song.satireDegree === 3
                            ? "中辛"
                            : "甘口"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">{song.description}</p>

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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
