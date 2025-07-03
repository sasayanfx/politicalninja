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
import { Mail, MessageCircle, Music, Users, Send } from "lucide-react"
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
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Formspreeを使用してメール送信
      const response = await fetch("https://formspree.io/f/xdkogqpz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ninja_name: formData.ninjaName,
          message_type: formData.messageType,
          message: formData.message,
          song_request: formData.songRequest,
          political_topic: formData.politicalTopic,
          _subject: `政治忍者サイト - ${formData.messageType === "fan_letter" ? "ファンレター" : formData.messageType === "song_request" ? "楽曲リクエスト" : "政治的関心"}`,
        }),
      })

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
      } else {
        throw new Error("送信に失敗しました")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "送信に失敗しました",
        description: "しばらく時間をおいて再度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
