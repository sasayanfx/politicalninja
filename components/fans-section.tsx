"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { submitFanLetter, submitSongRequest, submitPoliticalInterest } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import ApprovedMessages from "./approved-messages"

export default function FansSection() {
  const { toast } = useToast()

  // 各フォームの送信状態を個別に管理
  const [isSubmittingLetter, setIsSubmittingLetter] = useState(false)
  const [isSubmittingSong, setIsSubmittingSong] = useState(false)
  const [isSubmittingPolitical, setIsSubmittingPolitical] = useState(false)

  // 各フォームのデータを個別に管理
  const [letterForm, setLetterForm] = useState({
    ninjaName: "",
    message: "",
  })

  const [songForm, setSongForm] = useState({
    songRequest: "",
  })

  const [politicalForm, setPoliticalForm] = useState({
    politicalTopic: "",
  })

  // ファンレターフォームの入力ハンドラ
  const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLetterForm((prev) => ({ ...prev, [name]: value }))
  }

  // 楽曲リクエストフォームの入力ハンドラ
  const handleSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSongForm((prev) => ({ ...prev, [name]: value }))
  }

  // 政治的関心事フォームの入力ハンドラ
  const handlePoliticalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPoliticalForm((prev) => ({ ...prev, [name]: value }))
  }

  // ファンレター送信ハンドラ
  const handleLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingLetter(true)

    try {
      const formData = new FormData()
      formData.append("ninjaName", letterForm.ninjaName)
      formData.append("message", letterForm.message)

      const result = await submitFanLetter(formData)

      if (result.success) {
        toast({
          title: "送信完了",
          description: result.message,
        })
        // フォームをリセット
        setLetterForm({ ninjaName: "", message: "" })
      } else {
        toast({
          title: "エラー",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "送信中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingLetter(false)
    }
  }

  // 楽曲リクエスト送信ハンドラ
  const handleSongSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingSong(true)

    try {
      const formData = new FormData()
      formData.append("songRequest", songForm.songRequest)

      const result = await submitSongRequest(formData)

      if (result.success) {
        toast({
          title: "送信完了",
          description: result.message,
        })
        // フォームをリセット
        setSongForm({ songRequest: "" })
      } else {
        toast({
          title: "エラー",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "送信中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingSong(false)
    }
  }

  // 政治的関心事送信ハンドラ
  const handlePoliticalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingPolitical(true)

    try {
      const formData = new FormData()
      formData.append("politicalTopic", politicalForm.politicalTopic)

      const result = await submitPoliticalInterest(formData)

      if (result.success) {
        toast({
          title: "送信完了",
          description: result.message,
        })
        // フォームをリセット
        setPoliticalForm({ politicalTopic: "" })
      } else {
        toast({
          title: "エラー",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "送信中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingPolitical(false)
    }
  }

  return (
    <section id="fans" className="py-20 ninja-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ファンレター・コメント<span className="text-ninja-red">募集</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ファンレター募集 */}
            <Card className="bg-ninja-blue-dark border-ninja-green">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-ninja-red">📝 ファンレター</h3>
                <p className="text-gray-200 text-sm mb-4">
                  政治忍者への応援メッセージ、感想、質問などお気軽にお送りください。
                </p>
                <form onSubmit={handleLetterSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="ninjaName" className="block text-sm font-medium mb-2">
                      忍者ネーム
                    </label>
                    <input
                      id="ninjaName"
                      name="ninjaName"
                      type="text"
                      value={letterForm.ninjaName}
                      onChange={handleLetterChange}
                      className="w-full p-3 rounded bg-ninja-blue border border-ninja-green focus:border-ninja-red outline-none"
                      placeholder="例：影丸、月光など"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      メッセージ
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={letterForm.message}
                      onChange={handleLetterChange}
                      className="w-full p-3 rounded bg-ninja-blue border border-ninja-green focus:border-ninja-red outline-none resize-none"
                      placeholder="応援メッセージ、感想、質問など..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-ninja-red hover:bg-ninja-red-dark"
                    disabled={isSubmittingLetter}
                  >
                    {isSubmittingLetter ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 送信中...
                      </>
                    ) : (
                      "送信 🥷"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* 楽曲リクエスト */}
            <Card className="bg-ninja-blue-dark border-ninja-green">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-ninja-green">🎵 楽曲リクエスト</h3>
                <p className="text-gray-200 text-sm mb-4">
                  政治的なテーマで替え歌にしてほしい楽曲があればリクエストしてください！
                </p>
                <form onSubmit={handleSongSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="songRequest" className="block text-sm font-medium mb-2">
                      楽曲名・アーティスト名
                    </label>
                    <input
                      id="songRequest"
                      name="songRequest"
                      type="text"
                      value={songForm.songRequest}
                      onChange={handleSongChange}
                      className="w-full p-3 rounded bg-ninja-blue border border-ninja-green focus:border-ninja-red outline-none"
                      placeholder="例：津軽海峡冬景色、津軽海峡春景色など"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-ninja-green hover:bg-green-600"
                    disabled={isSubmittingSong}
                  >
                    {isSubmittingSong ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 送信中...
                      </>
                    ) : (
                      "リクエスト送信 🎶"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* 政治的関心事 */}
            <Card className="bg-ninja-blue-dark border-ninja-green">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-ninja-blue">🗳️ 政治的関心事</h3>
                <p className="text-gray-200 text-sm mb-4">あなたが関心のある政治的なテーマや問題を教えてください。</p>
                <form onSubmit={handlePoliticalSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="politicalTopic" className="block text-sm font-medium mb-2">
                      関心のあるテーマ
                    </label>
                    <textarea
                      id="politicalTopic"
                      name="politicalTopic"
                      rows={4}
                      value={politicalForm.politicalTopic}
                      onChange={handlePoliticalChange}
                      className="w-full p-3 rounded bg-ninja-blue border border-ninja-green focus:border-ninja-red outline-none resize-none"
                      placeholder="例：選挙制度、税制、環境問題、社会保障など"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmittingPolitical}
                  >
                    {isSubmittingPolitical ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 送信中...
                      </>
                    ) : (
                      "意見を送信 📝"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* 承認済みメッセージの表示 */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <span className="text-ninja-green">忍者たち</span>からの声
            </h3>
            <ApprovedMessages />
          </div>

          {/* 募集要項 */}
          <div className="mt-12 bg-ninja-blue p-8 rounded-lg border-l-4 border-ninja-red">
            <h3 className="text-2xl font-bold mb-6">📋 募集要項・注意事項</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-bold mb-3 text-ninja-green">✅ 歓迎するコンテンツ</h4>
                <ul className="space-y-1 text-gray-200">
                  <li>• 政治忍者への応援メッセージ</li>
                  <li>• 替え歌や活動への感想</li>
                  <li>• 政治に関する建設的な意見</li>
                  <li>• 替え歌のリクエスト</li>
                  <li>• 政治参加への質問</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-ninja-red">❌ 禁止事項</h4>
                <ul className="space-y-1 text-gray-200">
                  <li>• 特定の政党・候補者への誹謗中傷</li>
                  <li>• 個人情報の記載</li>
                  <li>• 営利目的の投稿</li>
                  <li>• 差別的・攻撃的な内容</li>
                  <li>• 法律に反する内容</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              ※ 投稿いただいたメッセージは、政治忍者の活動改善のために使用させていただく場合があります。
              個人を特定できる情報は公開いたしません。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
