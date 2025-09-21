"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Play, Share2, ExternalLink, Heart, TrendingUp, Vote, Loader2 } from "lucide-react"
import { useToast } from "../hooks/use-toast"
import { useState, useEffect } from "react"
import Image from "next/image"
import { submitSongVote, getSongVoteStats, getUserVotes } from "../app/actions"
import { getUserId } from "../lib/user-id"

interface Song {
  title: string
  originalSong: string
  artist: string
  releaseDate: string
  satireDegree: number
  description: string
  youtubeUrl: string
  thumbnail: string
  category: string
  tags: string[]
  viewCount: number
  likeCount: number
  shareCount: number
}

const songs: Song[] = [
  // 無題１（1枚目）
  {
    title: "税のブルース",
    originalSong: "真のブルース",
    artist: "政治忍者",
    releaseDate: "2025-06-01",
    satireDegree: 6,
    description: "増税への不満を歌ったブルース調の楽曲。税制の矛盾を嘆く庶民の声。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-mask.png",
    category: "中辛",
    tags: ["税金", "ブルース", "増税", "庶民"],
    viewCount: 78000,
    likeCount: 4200,
    shareCount: 680
  },
  {
    title: "増税信者",
    originalSong: "お祭り忍者",
    artist: "政治忍者",
    releaseDate: "2025-06-01",
    satireDegree: 10,
    description: "とにかく税金を多く取り、高すぎる問題を訴える激辛楽曲。政府の税制政策への激辛な批判。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "激辛",
    tags: ["増税", "税制", "政府批判", "激辛"],
    viewCount: 95000,
    likeCount: 6800,
    shareCount: 1200
  },
  // 無題２（2枚目）
  {
    title: "国売られて",
    originalSong: "魅せられて",
    artist: "政治忍者",
    releaseDate: "2025-09-01",
    satireDegree: 10,
    description: "海外バラマキ・移民断固反対！日本の国益を売り渡す政治への怒りを込めた激辛レベルの楽曲。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "激辛",
    tags: ["海外バラマキ", "移民", "国益", "激辛"],
    viewCount: 125000,
    likeCount: 8900,
    shareCount: 1500
  },
  {
    title: "おどるキングボンビー",
    originalSong: "おどるポンポコリン",
    artist: "政治忍者",
    releaseDate: "2025-09-01",
    satireDegree: 8,
    description: "海外には湯水のように税金をバラまくのに、国内の深刻は絶対に拒否する日本政府への激辛な批判！",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "大辛",
    tags: ["海外バラマキ", "税金", "政府批判", "大辛"],
    viewCount: 87000,
    likeCount: 5900,
    shareCount: 980
  },
  {
    title: "日本人",
    originalSong: "異邦人",
    artist: "政治忍者",
    releaseDate: "2025-08-01",
    satireDegree: 8,
    description: "日本の美しい自然を破壊するメガソーラー建設に断固反対！真の日本人として立ち上がる時が来た。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-mask.png",
    category: "大辛",
    tags: ["メガソーラー", "環境破壊", "日本人", "大辛"],
    viewCount: 102000,
    likeCount: 7300,
    shareCount: 1400
  },
  {
    title: "You Are！ZAIMU=SHOW",
    originalSong: "ウィーアー！",
    artist: "政治忍者",
    releaseDate: "2025-08-01",
    satireDegree: 8,
    description: "海外には大金をバラまくのに財政が厳しいと嘘ついて増税しまくる無能財務省への怒りをパンチ！",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "大辛",
    tags: ["財務省", "海外バラマキ", "増税", "大辛"],
    viewCount: 93000,
    likeCount: 6500,
    shareCount: 1150
  },
  {
    title: "あー開票中",
    originalSong: "あー夏休み",
    artist: "政治忍者",
    releaseDate: "2025-08-01",
    satireDegree: 8,
    description: "参院選の深夜の不正な集計を不正義と警告に痛烈に批判した大辛レベルの楽曲。選挙管理委員会への怒りを込めた一作。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-mask.png",
    category: "大辛",
    tags: ["選挙", "不正", "開票", "大辛"],
    viewCount: 84000,
    likeCount: 5700,
    shareCount: 920
  },
  {
    title: "世界中の議員よりきっと",
    originalSong: "世界中の誰よりきっと",
    artist: "政治忍者",
    releaseDate: "2025-08-01",
    satireDegree: 8,
    description: "高すぎる議員報酬を買いながら議会で居眠りする議員を痛烈に批判した大辛レベルの楽曲。国会議員への怒りをぶつけた一作。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "大辛",
    tags: ["議員報酬", "居眠り", "国会", "大辛"],
    viewCount: 91000,
    likeCount: 6200,
    shareCount: 1100
  },
  // 無題３（3枚目）
  {
    title: "石破よGoodbye！",
    originalSong: "キン肉マンGoFight！",
    artist: "政治忍者",
    releaseDate: "2025-07-01",
    satireDegree: 8,
    description: "3選攻めでも許されている石破茂首相へのレクイエムを痛烈に風刺した大辛レベルの楽曲。政府の政治政策への怒りを込めた一作。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "大辛",
    tags: ["石破茂", "政権批判", "レクイエム", "大辛"],
    viewCount: 76000,
    likeCount: 4900,
    shareCount: 850
  },
  {
    title: "自民と財務省のマネーゲーム",
    originalSong: "男と女のラブゲーム",
    artist: "政治忍者",
    releaseDate: "2025-07-01",
    satireDegree: 10,
    description: "増税一辺倒の財務省とそのイベント自民党の現状を痛烈に風刺した激辛レベルの楽曲。政府の政治政策への怒りを込めた一作。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "激辛",
    tags: ["自民党", "財務省", "マネーゲーム", "激辛"],
    viewCount: 108000,
    likeCount: 7800,
    shareCount: 1350
  },
  {
    title: "増税ループ",
    originalSong: "オトループ",
    artist: "政治忍者",
    releaseDate: "2025-07-01",
    satireDegree: 6,
    description: "増税の無限ループに陥った日本の現状を痛烈に風刺した中辛レベルの楽曲。政府の政治政策への怒りを込めた一作。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-mask.png",
    category: "中辛",
    tags: ["増税", "無限ループ", "政府批判", "中辛"],
    viewCount: 69000,
    likeCount: 4100,
    shareCount: 720
  },
  {
    title: "無能総理誕生！",
    originalSong: "勇者王誕生！",
    artist: "政治忍者",
    releaseDate: "2025-06-01",
    satireDegree: 10,
    description: "経理の無能さを痛烈に風刺した激辛レベルの楽曲。政府への怒りを込めた一作品。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "激辛",
    tags: ["無能", "総理", "政府批判", "激辛"],
    viewCount: 112000,
    likeCount: 8200,
    shareCount: 1480
  },
  {
    title: "米食う日まで",
    originalSong: "また君に恋してる",
    artist: "政治忍者",
    releaseDate: "2025-06-01",
    satireDegree: 8,
    description: "今和の米価格問題と政治の関係を歌った社会派楽曲。庶民の生活を代弁する。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "大辛",
    tags: ["米価格", "生活", "庶民", "大辛"],
    viewCount: 73000,
    likeCount: 4600,
    shareCount: 810
  },
  {
    title: "俺ら国会さ行くだ",
    originalSong: "俺ら東京さ行くだ",
    artist: "政治忍者",
    releaseDate: "2025-06-01",
    satireDegree: 10,
    description: "現在の政治問題を痛烈に、政治参加の重要性を訴える楽曲。若者の政治離れに石を投じる。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "激辛",
    tags: ["政治参加", "若者", "国会", "激辛"],
    viewCount: 89000,
    likeCount: 5800,
    shareCount: 1050
  },
  {
    title: "乾杯（増税に）",
    originalSong: "乾杯",
    artist: "政治忍者",
    releaseDate: "2024-05-12",
    satireDegree: 9,
    description: "長渕剛の名曲を増税問題に。「増税に乾杯」として国民の怒りを代弁した風刺歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-mask.png",
    category: "ロック風刺",
    tags: ["長渕剛", "増税", "国民", "怒り"],
    viewCount: 89000,
    likeCount: 6200,
    shareCount: 1200
  },
  {
    title: "心の旅（政治の旅）",
    originalSong: "心の旅",
    artist: "政治忍者",
    releaseDate: "2024-06-18",
    satireDegree: 7,
    description: "チューリップの名曲を政治の世界に。政治家の心の変遷を旅に例えて歌った替え歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "フォーク風刺",
    tags: ["チューリップ", "政治家", "心境", "変化"],
    viewCount: 41000,
    likeCount: 2600,
    shareCount: 380
  },
  {
    title: "青春（政治家の青春）",
    originalSong: "青春",
    artist: "政治忍者",
    releaseDate: "2024-07-25",
    satireDegree: 8,
    description: "毛皮のマリーズの名曲を政治家の過去に。若き日の理想と現在のギャップを歌った風刺歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "ロック風刺",
    tags: ["毛皮のマリーズ", "理想", "現実", "ギャップ"],
    viewCount: 73000,
    likeCount: 4800,
    shareCount: 920
  },
  {
    title: "川の流れのように（政治の流れのように）",
    originalSong: "川の流れのように",
    artist: "政治忍者",
    releaseDate: "2024-08-30",
    satireDegree: 6,
    description: "美空ひばりの名曲を政治の世界に。時代と共に変わる政治の流れを川に例えて歌った替え歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-mask.png",
    category: "演歌風刺",
    tags: ["美空ひばり", "時代", "政治", "変化"],
    viewCount: 95000,
    likeCount: 6500,
    shareCount: 1100
  },
  {
    title: "夜空ノムコウ（国会ノムコウ）",
    originalSong: "夜空ノムコウ",
    artist: "政治忍者",
    releaseDate: "2024-09-15",
    satireDegree: 8,
    description: "SMAPの名曲を政治の世界に。国会の向こうに見える理想の政治を歌った替え歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "ポップス風刺",
    tags: ["SMAP", "国会", "理想", "政治"],
    viewCount: 62000,
    likeCount: 3900,
    shareCount: 750
  },
  {
    title: "津軽じょんがら節（政治じょんがら節）",
    originalSong: "津軽じょんがら節",
    artist: "政治忍者",
    releaseDate: "2024-10-20",
    satireDegree: 9,
    description: "津軽民謡を政治風刺に。政治家の嘘つきぶりを津軽弁で痛烈に批判した替え歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "民謡風刺",
    tags: ["津軽民謡", "嘘つき", "批判", "津軽弁"],
    viewCount: 34000,
    likeCount: 2200,
    shareCount: 420
  },
  {
    title: "長崎の夜はむらさき（国会の夜はまっくら）",
    originalSong: "長崎の夜はむらさき",
    artist: "政治忍者",
    releaseDate: "2024-11-12",
    satireDegree: 8,
    description: "フランク永井の名曲を政治風刺に。国会の暗闇で行われる密室政治を歌った替え歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/political-ninja-mask.png",
    category: "歌謡風刺",
    tags: ["フランク永井", "密室", "政治", "暗闇"],
    viewCount: 48000,
    likeCount: 3100,
    shareCount: 580
  },
  {
    title: "異邦人（政治の異邦人）",
    originalSong: "異邦人",
    artist: "政治忍者",
    releaseDate: "2024-12-05",
    satireDegree: 7,
    description: "久保田早紀の名曲を政治家に。国民から見た政治家の異邦人ぶりを歌った替え歌です。",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "ポップス風刺",
    tags: ["久保田早紀", "異邦人", "政治家", "国民"],
    viewCount: 71000,
    likeCount: 4600,
    shareCount: 860
  }
]

export default function SongArchiveSection() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [userVotes, setUserVotes] = useState<string[]>([])
  const [voteStats, setVoteStats] = useState<Record<string, number>>({})
  const [isVoting, setIsVoting] = useState(false)
  const [voteMessage, setVoteMessage] = useState("")

  useEffect(() => {
    setIsVisible(true)
    loadUserVotes()
    loadVoteStats()
  }, [])

  // ローカルストレージから投票履歴を読み込み
  const loadUserVotes = () => {
    try {
      const saved = localStorage.getItem('political-ninja-votes')
      if (saved) {
        setUserVotes(JSON.parse(saved))
      }
    } catch (error) {
      console.error('投票履歴の読み込みエラー:', error)
    }
  }

  // ローカルストレージから投票統計を読み込み
  const loadVoteStats = () => {
    try {
      const saved = localStorage.getItem('political-ninja-vote-stats')
      if (saved) {
        setVoteStats(JSON.parse(saved))
      }
    } catch (error) {
      console.error('投票統計の読み込みエラー:', error)
    }
  }

  // 投票統計をローカルストレージに保存
  const saveVoteStats = (newStats: Record<string, number>) => {
    try {
      localStorage.setItem('political-ninja-vote-stats', JSON.stringify(newStats))
      setVoteStats(newStats)
    } catch (error) {
      console.error('投票統計の保存エラー:', error)
    }
  }

  // ユーザー投票をローカルストレージに保存
  const saveUserVotes = (votes: string[]) => {
    try {
      localStorage.setItem('political-ninja-votes', JSON.stringify(votes))
      setUserVotes(votes)
    } catch (error) {
      console.error('投票履歴の保存エラー:', error)
    }
  }

  const handleVote = async (songTitle: string) => {
    if (userVotes.length >= 3) {
      alert('投票は3曲までです！')
      return
    }

    if (userVotes.includes(songTitle)) {
      alert('この楽曲には既に投票済みです！')
      return
    }

    setIsVoting(true)

    try {
      // 投票処理をシミュレート（実際のAPI呼び出しの代わり）
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 新しい投票を追加
      const newVotes = [...userVotes, songTitle]
      saveUserVotes(newVotes)

      // 投票統計を更新
      const newStats = { ...voteStats }
      newStats[songTitle] = (newStats[songTitle] || 0) + 1
      saveVoteStats(newStats)

      setVoteMessage(`${songTitle}に投票しました！`)
      setTimeout(() => setVoteMessage(""), 3000)

    } catch (error) {
      console.error('投票エラー:', error)
      alert('投票に失敗しました。もう一度お試しください。')
    } finally {
      setIsVoting(false)
    }
  }

  const handlePlay = (song: Song) => {
    setSelectedSong(song)
    window.open(song.youtubeUrl, '_blank')
  }

  const handleShare = (song: Song) => {
    if (navigator.share) {
      navigator.share({
        title: song.title,
        text: song.description,
        url: song.youtubeUrl,
      })
    } else {
      navigator.clipboard.writeText(song.youtubeUrl)
      alert('URLをクリップボードにコピーしました！')
    }
  }

  const remainingVotes = 3 - userVotes.length
  const canVote = remainingVotes > 0

  return (
    <section
      id="parody-songs"
      className={`py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            楽曲アーカイブ
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            政治忍者が制作した替え歌のコレクション
            <br />
            お気に入りの3曲に投票してください！
          </p>
              </div>

        {/* 投票状況表示 */}
        {voteMessage && (
          <div className="text-center mb-8 p-4 bg-green-600/20 border border-green-600/50 rounded-lg">
            <p className="text-green-400 font-semibold">{voteMessage}</p>
          </div>
        )}

        <div className="text-center mb-8 p-4 bg-blue-600/20 border border-blue-600/50 rounded-lg">
          <p className="text-blue-400 font-semibold">
            残り投票数: {remainingVotes}曲 / 3曲まで投票可能
          </p>
          {userVotes.length > 0 && (
            <p className="text-gray-300 text-sm mt-2">
              投票済み: {userVotes.join(', ')}
              </p>
            )}
        </div>

        {/* 楽曲グリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {songs.map((song, index) => {
            const hasVoted = userVotes.includes(song.title)
            const voteCount = voteStats[song.title] || 0

              return (
                <Card
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 backdrop-blur-sm hover:from-gray-700/60 hover:to-gray-800/60 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                  {/* サムネイル */}
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={song.thumbnail}
                      alt={song.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => handlePlay(song)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    </div>

                  {/* 楽曲情報 */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {song.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        原曲: {song.originalSong}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-ninja-red/20 text-ninja-red text-xs rounded-full">
                        {song.category}
                          </span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        風刺度: {song.satireDegree}/10
                      </span>
                      {voteCount > 0 && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          {voteCount}票
                        </span>
                      )}
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {song.description}
                    </p>

                    {/* 統計情報 */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-gray-700">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{song.viewCount.toLocaleString()}回再生</span>
                        </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{song.likeCount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 投票ボタン */}
                    <Button
                      onClick={() => handleVote(song.title)}
                      disabled={!canVote || isVoting || hasVoted}
                      variant={hasVoted ? "secondary" : canVote ? "default" : "outline"}
                      size="sm"
                      className={`w-full ${
                        hasVoted
                          ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                          : canVote
                            ? "bg-ninja-green hover:bg-ninja-green-dark text-black"
                            : "border-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isVoting ? (
                        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <Heart className={`mr-1 h-4 w-4 ${hasVoted ? "fill-current" : ""}`} />
                      )}
                      {isVoting
                        ? "投票中..."
                        : hasVoted
                          ? "投票済み"
                          : remainingVotes > 0
                            ? "お気に入りに投票"
                            : "投票上限に達しました"}
                    </Button>

                    {/* アクションボタン */}
                    <div className="flex gap-2 pt-3">
                      <Button
                        onClick={() => handlePlay(song)}
                        className="flex-1 bg-ninja-red hover:bg-ninja-red-dark text-white"
                        size="sm"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        再生
                      </Button>
                      <Button
                        onClick={() => handleShare(song)}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        size="sm"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => window.open(song.youtubeUrl, '_blank')}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

        {/* 投票結果表示 */}
        {userVotes.length > 0 && (
          <div className="text-center bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg p-8 border border-gray-700 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              あなたの投票結果
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {userVotes.map((songTitle, index) => (
                <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-ninja-green font-semibold">
                    {index + 1}. {songTitle}
                  </p>
                  <p className="text-gray-400 text-sm">
                    現在の得票数: {voteStats[songTitle] || 0}票
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* フッターメッセージ */}
        <div className="text-center">
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            政治忍者は今後も新しい楽曲をリリース予定！
            <br />
            <span className="text-yellow-400 font-semibold">
              チャンネル登録をお忘れなく！
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}