"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShurikenIcon } from "@/components/icons/shuriken-icon"
import { Mail, MessageCircle, Music, Users, Send, AlertCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import StaticComments from "@/components/static-comments"

export default function FansSection() {
  const [formData, setFormData] = useState({
    ninjaName: "",
    messageType: "fan_letter",
    message: "",
    songRequest: "",
    politicalTopic: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string>("")
  const { toast } = useToast()

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case "fan_letter":
        return "ファンレター"
      case "song_request":
        return "楽曲リクエスト"
      case "political_interest":
        return "政治的関心事"
      default:
        return "メッセージ"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setDebugInfo("")

    try {
      // バリデーション
      if (!formData.ninjaName.trim() || !formData.message.trim()) {
        toast({
          title: "入力エラー",
          description: "忍者ネームとメッセージは必須です。",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // デバッグ情報を設定
      setDebugInfo("送信中...")

      // Formspreeに送信するデータを準備
      const submitData = {
        name: formData.ninjaName,
        email: "noreply@politicalninja.com", // ダミーメール（Formspreeで必要な場合）
        ninja_name: formData.ninjaName,
        message_type: getMessageTypeLabel(formData.messageType),
        message: formData.message,
        song_request: formData.songRequest || "なし",
        political_topic: formData.politicalTopic || "なし",
        _subject: `政治忍者サイト - ${getMessageTypeLabel(formData.messageType)} from ${formData.ninjaName}`,
        _replyto: "seijixninja@gmail.com",
        _next: window.location.href, // 送信後のリダイレクト先
      }

      console.log("Sending data:", submitData)
      setDebugInfo("Formspreeに送信中...")

      const response = await fetch("https://formspree.io/f/xdkogqpz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submitData),
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      const responseText = await response.text()
      console.log("Response text:", responseText)

      setDebugInfo(`レスポンス: ${response.status} - ${responseText.substring(0, 100)}`)

      if (response.ok) {
        toast({
          title: "メッセージを送信しました！",
          description: "💌 メールで直接お送りしました。良い内容は手動でサイトに掲載させていただきます。",
        })

        // フォームをリセット
        setFormData({
          ninjaName: "",
          messageType: "fan_letter",
          message: "",
          songRequest: "",
          politicalTopic: "",
        })
        setDebugInfo("送信完了！")
      } else {
        // エラーレスポンスの詳細を表示
        let errorMessage = "送信に失敗しました"
        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }

        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = error instanceof Error ? error.message : "不明なエラー"

      setDebugInfo(`エラー: ${errorMessage}`)

      toast({
        title: "送信に失敗しました",
        description: `エラー: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 直接メールクライアントを開く関数
  const openEmailClient = () => {
    const subject = encodeURIComponent(
      `政治忍者サイト - ${getMessageTypeLabel(formData.messageType)} from ${formData.ninjaName}`,
    )
    const body = encodeURIComponent(`
忍者ネーム: ${formData.ninjaName}
メッセージタイプ: ${getMessageTypeLabel(formData.messageType)}

メッセージ:
${formData.message}

${formData.songRequest ? `楽曲リクエスト: ${formData.songRequest}` : ""}
${formData.politicalTopic ? `政治的関心事: ${formData.politicalTopic}` : ""}
    `)

    window.location.href = `mailto:seijixninja@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="fans" className="py-20 bg-ninja-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            忍者<span className="text-ninja-red">ファン</span>の声
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* メッセージ送信フォーム */}
          <Card className="bg-ninja-blue-dark border-ninja-green">
            <CardHeader>
              <CardTitle className="flex items-center text-ninja-green">
                <Mail className="mr-2 h-5 w-5" />
                メッセージを送る
              </CardTitle>
              <div className="text-sm text-gray-300 space-y-1">
                <p>💌 メールに直接届きます</p>
                <p>📝 良い内容は手動でサイトに掲載</p>
                <p>🔒 個人情報は安全に管理</p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="ninjaName" className="text-white">
                    忍者ネーム *
                  </Label>
                  <Input
                    id="ninjaName"
                    value={formData.ninjaName}
                    onChange={(e) => handleInputChange("ninjaName", e.target.value)}
                    placeholder="例: 影丸、月光、風雲..."
                    required
                    className="bg-ninja-blue border-ninja-green text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-white">メッセージの種類 *</Label>
                  <RadioGroup
                    value={formData.messageType}
                    onValueChange={(value) => handleInputChange("messageType", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fan_letter" id="fan_letter" />
                      <Label htmlFor="fan_letter" className="flex items-center text-white">
                        <MessageCircle className="mr-2 h-4 w-4 text-ninja-green" />
                        ファンレター
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="song_request" id="song_request" />
                      <Label htmlFor="song_request" className="flex items-center text-white">
                        <Music className="mr-2 h-4 w-4 text-ninja-red" />
                        楽曲リクエスト
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="political_interest" id="political_interest" />
                      <Label htmlFor="political_interest" className="flex items-center text-white">
                        <Users className="mr-2 h-4 w-4 text-blue-400" />
                        政治的関心事
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">
                    メッセージ *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="政治忍者への応援メッセージ、感想、意見などをお聞かせください..."
                    required
                    rows={4}
                    className="bg-ninja-blue border-ninja-green text-white placeholder:text-gray-400"
                  />
                </div>

                {formData.messageType === "song_request" && (
                  <div>
                    <Label htmlFor="songRequest" className="text-white">
                      リクエスト楽曲
                    </Label>
                    <Input
                      id="songRequest"
                      value={formData.songRequest}
                      onChange={(e) => handleInputChange("songRequest", e.target.value)}
                      placeholder="替え歌にしてほしい楽曲名"
                      className="bg-ninja-blue border-ninja-green text-white placeholder:text-gray-400"
                    />
                  </div>
                )}

                {formData.messageType === "political_interest" && (
                  <div>
                    <Label htmlFor="politicalTopic" className="text-white">
                      政治的関心事
                    </Label>
                    <Input
                      id="politicalTopic"
                      value={formData.politicalTopic}
                      onChange={(e) => handleInputChange("politicalTopic", e.target.value)}
                      placeholder="関心のある政治的テーマ"
                      className="bg-ninja-blue border-ninja-green text-white placeholder:text-gray-400"
                    />
                  </div>
                )}

                {/* デバッグ情報表示 */}
                {debugInfo && (
                  <div className="p-3 bg-gray-800 rounded border text-xs text-gray-300">
                    <div className="flex items-center mb-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      デバッグ情報:
                    </div>
                    <div className="font-mono">{debugInfo}</div>
                  </div>
                )}

                <div className="space-y-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-ninja-red hover:bg-ninja-red-dark">
                    {isSubmitting ? (
                      "送信中..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        メール送信 🥷
                      </>
                    )}
                  </Button>

                  {/* フォールバック：直接メールクライアントを開く */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={openEmailClient}
                    className="w-full border-ninja-green text-ninja-green hover:bg-ninja-green hover:text-black bg-transparent"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    メールクライアントで送信
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 承認済みメッセージ表示 */}
          <Card className="bg-ninja-blue-dark border-ninja-green">
            <CardHeader>
              <CardTitle className="flex items-center text-ninja-green">
                <ShurikenIcon className="mr-2" size={20} />
                忍者ファンからの声
              </CardTitle>
              <p className="text-sm text-gray-300">📝 手動で選ばれた素晴らしいメッセージたち</p>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <StaticComments />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
