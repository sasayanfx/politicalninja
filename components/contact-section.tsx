"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { MessageSquare, Mail, MapPin, Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    electionChoice: "行かない",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("https://formspree.io/f/xkgrzakz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          "7月の参議院議員選挙は投票に": formData.electionChoice,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          electionChoice: "行かない",
          message: "",
        })
      } else {
        const data = await response.json()
        throw new Error(data.error || "送信に失敗しました。後でもう一度お試しください。")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました。後でもう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            お<span className="text-ninja-red">問い合わせ</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-ninja-blue-dark border-ninja-red">
                <CardHeader>
                  <CardTitle>メッセージを送る</CardTitle>
                  <CardDescription>
                    ご質問、ご意見、コラボレーションのご提案など、お気軽にお問い合わせください。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="bg-ninja-green/20 border border-ninja-green p-6 rounded-lg text-center">
                      <h3 className="text-xl font-bold mb-2 text-ninja-green">送信完了</h3>
                      <p className="mb-4">お問い合わせありがとうございます。内容を確認し、近日中にご連絡いたします。</p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-ninja-green hover:bg-ninja-green-dark"
                      >
                        新しいお問い合わせ
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            お名前 <span className="text-ninja-red">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-ninja-blue border-gray-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            メールアドレス <span className="text-ninja-red">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-ninja-blue border-gray-700"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <label htmlFor="subject" className="text-sm font-medium">
                          件名 <span className="text-ninja-red">*</span>
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="bg-ninja-blue border-gray-700"
                        />
                      </div>

                      <div className="space-y-2 mb-4">
                        <label className="text-sm font-medium">
                          7月の参議院議員選挙は投票に <span className="text-ninja-red">*</span>
                        </label>
                        <RadioGroup
                          name="electionChoice"
                          value={formData.electionChoice}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, electionChoice: value }))}
                          className="flex space-x-8"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="行かない" id="election-no" />
                            <Label htmlFor="election-no">行かない</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="行く" id="election-yes" />
                            <Label htmlFor="election-yes">行く</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2 mb-4">
                        <label htmlFor="message" className="text-sm font-medium">
                          メッセージ <span className="text-ninja-red">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="bg-ninja-blue border-gray-700"
                        />
                      </div>

                      {error && (
                        <div className="bg-ninja-red/20 border border-ninja-red p-4 rounded-lg mb-4">
                          <p className="text-ninja-red">{error}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-ninja-red hover:bg-ninja-red-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 送信中...
                          </>
                        ) : (
                          "送信する"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-ninja-blue-dark border-ninja-green mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-ninja-green rounded-full p-3">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">SNSでのお問い合わせ</h3>
                      <p className="text-gray-300 mb-4">各SNSのDMからもお問い合わせいただけます。</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-ninja-red mr-2">●</span>
                          <a
                            href="https://x.com/seijixninja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-ninja-red transition-colors"
                          >
                            X (Twitter): @seijixninja
                          </a>
                        </div>
                        <div className="flex items-center">
                          <span className="text-ninja-green mr-2">●</span>
                          <a
                            href="https://instagram.com/seijixninja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-ninja-green transition-colors"
                          >
                            Instagram: @seijixninja
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-ninja-blue-dark border-ninja-green mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-ninja-green rounded-full p-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">メールでのお問い合わせ</h3>
                      <p className="text-gray-300 mb-4">直接メールでのお問い合わせも受け付けています。</p>
                      <div className="mt-2">
                        <p className="text-ninja-red">seijixninja@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-ninja-blue-dark border-ninja-green">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-ninja-green rounded-full p-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">活動拠点</h3>
                      <p className="text-gray-300 mb-4">
                        主な活動拠点は東京都内です。イベント情報はカレンダーをご確認ください。
                        <br />
                        <span className="text-ninja-red text-sm">
                          ※遠方の場合は、交通費のご負担と前払いをお願いしております。
                        </span>
                      </p>
                    </div>
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
