"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Share2, ExternalLink, Heart, TrendingUp, Vote, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import Image from "next/image"
import { submitSongVote, getSongVoteStats, getUserVotes } from "@/app/actions"
import { getUserId } from "@/lib/user-id"

interface Song {
  title: string
  originalSong: string
  artist: string
  releaseDate: string
  satireDegree: number
  description: string
  youtubeUrl: string
  thumbnail: string
  isLatest: boolean
}

interface VoteStats {
  song_title: string
  vote_count: number
  unique_voters: number
}

interface UserVote {
  song_title: string
  created_at: string
}

const VOTE_LIMIT = 3 // 一人あたりの投票上限

export default function SongArchiveSection() {
  const { toast } = useToast()
  const [voteStats, setVoteStats] = useState<VoteStats[]>([])
  const [userVotes, setUserVotes] = useState<UserVote[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState<string | null>(null)
  const [userId, setUserId] = useState<string>("")

  // Initialize user ID and load data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)

      // ユーザーIDを取得
      const id = getUserId()
      setUserId(id)

      // 投票統計と ユーザーの投票履歴を並行して取得
      const [statsResult, userVotesResult] = await Promise.all([getSongVoteStats(), getUserVotes(id)])

      if (statsResult.success) {
        setVoteStats(statsResult.stats)
      }

      if (userVotesResult.success) {
        setUserVotes(userVotesResult.votes)
      }

      setLoading(false)
    }

    initializeData()
  }, [])

  const handleVote = async (songTitle: string) => {
    if (!userId) {
      toast({
        title: "エラー",
        description: "ユーザーIDが取得できませんでした",
        variant: "destructive",
      })
      return
    }

    if (userVotes.some((vote) => vote.song_title === songTitle)) {
      toast({
        title: "既に投票済みです",
        description: "一つの楽曲には一度しか投票できません",
        variant: "destructive",
      })
      return
    }

    if (userVotes.length >= VOTE_LIMIT) {
      toast({
        title: "投票上限に達しました",
        description: `お一人様${VOTE_LIMIT}票までとなっております`,
        variant: "destructive",
      })
      return
    }

    setVoting(songTitle)

    try {
      const result = await submitSongVote(userId, songTitle)

      if (result.success) {
        // 投票成功時にローカル状態を更新
        setUserVotes((prev) => [...prev, { song_title: songTitle, created_at: new Date().toISOString() }])

        // 投票統計を再取得
        const statsResult = await getSongVoteStats()
        if (statsResult.success) {
          setVoteStats(statsResult.stats)
        }

        toast({
          title: "投票完了！",
          description: result.message,
        })
      } else {
        toast({
          title: "投票に失敗しました",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "投票処理中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setVoting(null)
    }
  }

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

  const songs: Song[] = [
    {
      title: "国売られて",
      originalSong: "魅せられて",
      artist: "ジュディ・オング",
      releaseDate: "2025年9月",
      satireDegree: 5,
      description: "海外バラマキ・移民断固反対！日本の国益を売り渡す政治への怒りを込めた激辛レベルの楽曲。",
      youtubeUrl: "https://youtu.be/0gZ-PDBvbQA",
      thumbnail: "/images/kuni-urarete-thumbnail.jpg",
      isLatest: true,
    },
    {
      title: "おどるキングボンビー",
      originalSong: "おどるポンポコリン",
      artist: "B.B.クィーンズ",
      releaseDate: "2025年9月",
      satireDegree: 4,
      description: "海外には湯水のように税金をバラまくのに、国内の減税は絶対に拒否する石破総理への痛烈な批判！",
      youtubeUrl: "https://youtu.be/Z07wUisPwKw",
      thumbnail: "/images/odoru-king-bomby-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "日本人",
      originalSong: "異邦人",
      artist: "久保田早紀",
      releaseDate: "2025年8月",
      satireDegree: 4,
      description: "日本の美しい自然を破壊するメガソーラー建設に断固反対！真の日本人として立ち上がる時が来た。",
      youtubeUrl: "https://youtu.be/d9dS0G0HQkI",
      thumbnail: "/images/nihonjin-thumbnail.jpg",
      isLatest: false,
    },
    {
      title: "You Are！ZAIMU＝SHOW",
      originalSong: "ウィーアー！",
      artist: "きただにひろし",
      releaseDate: "2025年8月",
      satireDegree: 4,
      description: "海外には大金バラまくのに財源がないと絶対に減税しない無能財務省に強烈パンチ！",
      youtubeUrl: "https://youtu.be/8JEl3vHmRz4",
      thumbnail: "/images/you-are-zaimu-show-updated-thumbnail.jpg",
      isLatest: false,
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

  // Create a map for easy vote count lookup
  const voteCountMap = voteStats.reduce(
    (acc, stat) => {
      acc[stat.song_title] = stat.vote_count
      return acc
    },
    {} as Record<string, number>,
  )

  // Sort songs by vote count for ranking
  const sortedSongs = [...songs].sort((a, b) => {
    const votesA = voteCountMap[a.title] || 0
    const votesB = voteCountMap[b.title] || 0
    return votesB - votesA
  })

  const totalVotes = voteStats.reduce((sum, stat) => sum + stat.vote_count, 0)
  const remainingVotes = VOTE_LIMIT - userVotes.length

  if (loading) {
    return (
      <section id="archive" className="py-20 ninja-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-ninja-green" />
            <p className="mt-4 text-gray-300">投票データを読み込み中...</p>
          </div>
        </div>
      </section>
    )
  }

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

          {/* Voting Status */}
          <div className="mt-8 mb-6">
            <div className="bg-ninja-blue-dark border border-ninja-green rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Vote className="h-5 w-5 text-ninja-green" />
                <span className="text-lg font-bold text-ninja-green">投票ステータス</span>
              </div>
              <p className="text-white">
                使用済み: <span className="text-ninja-red font-bold">{userVotes.length}</span> / {VOTE_LIMIT}票
              </p>
              {remainingVotes > 0 ? (
                <p className="text-ninja-green text-sm mt-1">
                  あと<span className="font-bold">{remainingVotes}票</span>投票できます
                </p>
              ) : (
                <p className="text-yellow-400 text-sm mt-1">投票完了！ありがとうございました</p>
              )}
            </div>
          </div>

          {/* Voting Controls */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setShowResults(!showResults)}
              variant="outline"
              className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-black"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              {showResults ? "通常表示" : "投票結果を見る"}
            </Button>
            {totalVotes > 0 && (
              <p className="text-sm text-gray-300">
                総投票数: <span className="text-ninja-green font-bold">{totalVotes}</span>票
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showResults ? sortedSongs : songs).map((song, index) => {
              const voteCount = voteCountMap[song.title] || 0
              const hasVoted = userVotes.some((vote) => vote.song_title === song.title)
              const votePercentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
              const canVote = !hasVoted && remainingVotes > 0
              const isVoting = voting === song.title

              return (
                <Card
                  key={song.title}
                  className={`${song.isLatest ? "bg-gradient-to-r from-red-900/50 to-black/50 border-ninja-red" : "bg-ninja-blue-dark border-ninja-green"} transition-all duration-300 hover:scale-105 relative`}
                >
                  <CardContent className="p-6">
                    {/* Ranking Badge */}
                    {showResults && index < 3 && voteCount > 0 && (
                      <div
                        className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-black"
                            : index === 1
                              ? "bg-gray-400 text-black"
                              : "bg-orange-600 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}

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
                        {[...Array(song.satireDegree)].map((_, i) => (
                          <span
                            key={i}
                            className="text-lg text-ninja-red"
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

                    {/* Vote Information */}
                    {voteCount > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-300">投票数: {voteCount}票</span>
                          <span className="text-ninja-green">{votePercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-ninja-green h-2 rounded-full transition-all duration-300"
                            style={{ width: `${votePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-gray-300 mb-4 line-clamp-3">{song.description}</p>

                    <div className="flex space-x-2 mb-3">
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

                    {/* Vote Button */}
                    <Button
                      onClick={() => handleVote(song.title)}
                      disabled={!canVote || isVoting}
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
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}