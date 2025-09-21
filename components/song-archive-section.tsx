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
  {
    title: "政治忍者参上！",
    originalSong: "忍者参上",
    artist: "政治忍者",
    releaseDate: "2024-01-15",
    satireDegree: 9,
    description: "政治忍者としての決意を込めたデビュー曲。日本の政治を変えるという強い意志を込めた替え歌です。",
    youtubeUrl: "https://youtube.com/watch?v=example1",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "デビュー",
    tags: ["政治", "忍者", "デビュー", "決意"],
    viewCount: 150000,
    likeCount: 8500,
    shareCount: 1200
  },
  {
    title: "国会で踊る",
    originalSong: "ダンシング・ヒーロー",
    artist: "政治忍者",
    releaseDate: "2024-02-20",
    satireDegree: 8,
    description: "国会の混乱ぶりを風刺したダンスナンバー。議事堂で踊る政治家たちを皮肉った替え歌です。",
    youtubeUrl: "https://youtube.com/watch?v=example2",
    thumbnail: "/images/political-ninja-mask.png",
    category: "風刺",
    tags: ["国会", "ダンス", "風刺", "混乱"],
    viewCount: 98000,
    likeCount: 6200,
    shareCount: 890
  },
  {
    title: "選挙の夜に",
    originalSong: "愛の夜",
    artist: "政治忍者",
    releaseDate: "2024-03-10",
    satireDegree: 7,
    description: "選挙結果への想いを込めたバラード。有権者の声が届かない政治への嘆きを歌っています。",
    youtubeUrl: "https://youtube.com/watch?v=example3",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "バラード",
    tags: ["選挙", "バラード", "政治", "有権者"],
    viewCount: 75000,
    likeCount: 4800,
    shareCount: 650
  },
  {
    title: "政治改革ラップ",
    originalSong: "改革ラップ",
    artist: "政治忍者",
    releaseDate: "2024-04-05",
    satireDegree: 8,
    description: "政治改革の必要性をラップで表現。若者の政治参加を促すエネルギッシュな楽曲です。",
    youtubeUrl: "https://youtube.com/watch?v=example4",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "ラップ",
    tags: ["改革", "ラップ", "若者", "政治参加"],
    viewCount: 120000,
    likeCount: 7200,
    shareCount: 1100
  },
  {
    title: "政治家の本音",
    originalSong: "心の声",
    artist: "政治忍者",
    releaseDate: "2024-05-12",
    satireDegree: 9,
    description: "政治家の本音を代弁した風刺歌。表向きの言葉と本音のギャップを歌っています。",
    youtubeUrl: "https://youtube.com/watch?v=example5",
    thumbnail: "/images/political-ninja-mask.png",
    category: "風刺",
    tags: ["政治家", "本音", "風刺", "ギャップ"],
    viewCount: 89000,
    likeCount: 5600,
    shareCount: 780
  },
  {
    title: "税金の行方",
    originalSong: "旅立ちの歌",
    artist: "政治忍者",
    releaseDate: "2024-06-18",
    satireDegree: 7,
    description: "税金の無駄遣いを風刺した楽曲。国民の血税がどこに行くのかを問いかけています。",
    youtubeUrl: "https://youtube.com/watch?v=example6",
    thumbnail: "/images/seiji-ninja-card.png",
    category: "風刺",
    tags: ["税金", "無駄遣い", "風刺", "血税"],
    viewCount: 95000,
    likeCount: 6100,
    shareCount: 920
  },
  {
    title: "民主主義の歌",
    originalSong: "自由の歌",
    artist: "政治忍者",
    releaseDate: "2024-07-25",
    satireDegree: 6,
    description: "民主主義の大切さを歌った楽曲。市民一人ひとりの声が政治を動かす力を表現しています。",
    youtubeUrl: "https://youtube.com/watch?v=example7",
    thumbnail: "/images/political-ninja-eyes.png",
    category: "ポップス",
    tags: ["民主主義", "市民", "政治参加", "希望"],
    viewCount: 78000,
    likeCount: 4900,
    shareCount: 680
  },
  {
    title: "政治とメディア",
    originalSong: "情報戦争",
    artist: "政治忍者",
    releaseDate: "2024-08-30",
    satireDegree: 8,
    description: "政治とメディアの関係を風刺した楽曲。情報操作の現実を鋭く指摘しています。",
    youtubeUrl: "https://youtube.com/watch?v=example8",
    thumbnail: "/images/political-ninja-mask.png",
    category: "風刺",
    tags: ["メディア", "情報操作", "風刺", "現実"],
    viewCount: 110000,
    likeCount: 6800,
    shareCount: 1050
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