"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Mail, Send, ExternalLink } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function FansSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [debugInfo, setDebugInfo] = useState<string>("")

  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setDebugInfo("送信を開始しています...")

    try {
      // バリデーション
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("すべてのフィールドを入力してください")
      }

      // メールアドレスの簡単なバリデーション
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("有効なメールアドレスを入力してください")
      }

      setDebugInfo("Formspreeに送信中...")

      const response = await fetch("https://formspree.io/f/xkgrzakz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `政治忍者ファンサイトからのメッセージ - ${formData.name}`,
        }),
      })

      setDebugInfo(`レスポンス受信: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        const errorText = await response.text()
        setDebugInfo(`エラー詳細: ${errorText}`)
        throw new Error(`送信に失敗しました (${response.status}): ${response.statusText}`)
      }

      const responseData = await response.json()
      setDebugInfo(`送信成功: ${JSON.stringify(responseData)}`)

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })

      toast({
        title: "メッセージを送信しました！",
        description: "政治忍者からの返信をお待ちください。",
      })
    } catch (error) {
      console.error("送信エラー:", error)
      setSubmitStatus("error")
      setDebugInfo(`エラー: ${error instanceof Error ? error.message : "不明なエラー"}`)

      toast({
        title: "送信に失敗しました",
        description: error instanceof Error ? error.message : "不明なエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailClient = () => {
    const subject = encodeURIComponent("政治忍者への応援メッセージ")
    const body = encodeURIComponent(`
お名前: ${formData.name}
メールアドレス: ${formData.email}

メッセージ:
${formData.message}

---
政治忍者ファンサイトより
    `)
    window.open(`mailto:seijixninja@gmail.com?subject=${subject}&body=${body}`)
  }

  return (
    <section id="fans" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ファン<span className="text-ninja-red">メッセージ</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            政治忍者への応援メッセージ、楽曲リクエスト、政治への想いなど、お気軽にお送りください。
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* メッセージフォーム */}
            <Card className="bg-ninja-blue-dark border-ninja-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ninja-green">
                  <Mail className="h-5 w-5" />
                  メッセージを送る
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      お名前 *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-black border-gray-600 text-white focus:border-ninja-green"
                      placeholder="山田太郎"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      メールアドレス *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-black border-gray-600 text-white focus:border-ninja-green"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      メッセージ *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-black border-gray-600 text-white focus:border-ninja-green resize-none"
                      placeholder="政治忍者への応援メッセージ、楽曲リクエスト、政治への想いなどをお聞かせください..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-ninja-red hover:bg-ninja-red-dark flex-1"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "送信中..." : "メッセージを送る"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleEmailClient}
                      className="border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-black bg-transparent"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      メールクライアントで送信
                    </Button>
                  </div>

                  {/* デバッグ情報表示 */}
                  {debugInfo && (
                    <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-300">デバッグ情報:</p>
                      <p className="text-xs text-gray-400 font-mono">{debugInfo}</p>
                    </div>
                  )}

                  {/* 送信状態表示 */}
                  {submitStatus === "success" && (
                    <div className="mt-4 p-3 bg-green-900/50 border border-green-500 rounded-lg">
                      <p className="text-green-300 text-sm">✅ メッセージが正常に送信されました！</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                      <p className="text-red-300 text-sm">❌ 送信に失敗しました。再度お試しください。</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* サイドバー情報 */}
            <div className="space-y-6">
              <Card className="bg-ninja-blue-dark border-ninja-green">
                <CardHeader>
                  <CardTitle className="text-ninja-green">お問い合わせについて</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p className="text-sm">• 楽曲リクエストや政治的なテーマの提案</p>
                  <p className="text-sm">• 政治忍者の活動への応援メッセージ</p>
                  <p className="text-sm">• コラボレーションや出演依頼</p>
                  <p className="text-sm">• その他、政治や社会問題に関するご意見</p>
                </CardContent>
              </Card>

              <Card className="bg-ninja-blue-dark border-ninja-green">
                <CardHeader>
                  <CardTitle className="text-ninja-green">返信について</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-3">
                  <p className="text-sm">いただいたメッセージには、政治忍者が直接目を通します。</p>
                  <p className="text-sm">返信には数日お時間をいただく場合がございますが、必ずお返事いたします。</p>
                  <p className="text-sm">緊急のお問い合わせは、SNSのDMもご利用ください。</p>
                </CardContent>
              </Card>

              <Card className="bg-ninja-blue-dark border-ninja-green">
                <CardHeader>
                  <CardTitle className="text-ninja-green">SNSでも繋がろう</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-col space-y-2">
                    <a
                      href="https://x.com/seijixninja"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2"
                    >
                      <span>🐦</span> X (Twitter): @seijixninja
                    </a>
                    <a
                      href="https://instagram.com/seijixninja"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-2"
                    >
                      <span>📸</span> Instagram: @seijixninja
                    </a>
                    <a
                      href="https://line.me/R/ti/p/@470opewc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-sm flex items-center gap-2"
                    >
                      <span>💬</span> LINE: @470opewc
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
