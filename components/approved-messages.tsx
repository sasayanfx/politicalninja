"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "components/ui/card"
import { Loader2 } from "lucide-react"
import { getApprovedMessages } from "app/actions"

type FanMessage = {
  id: number
  ninja_name: string
  message_type: string
  message: string
  song_request: string | null
  political_topic: string | null
  created_at: string
}

export default function ApprovedMessages() {
  const [messages, setMessages] = useState<FanMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const result = await getApprovedMessages()

        if (result.success) {
          setMessages(result.messages)
        }
      } catch (error) {
        console.error("Error fetching approved messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-ninja-red" />
        <span className="ml-2">メッセージを読み込み中...</span>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400">表示できるメッセージはまだありません</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {messages.map((message) => (
        <Card key={message.id} className="bg-ninja-blue-dark border-ninja-green">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ninja-red flex items-center justify-center">
                <span className="text-white font-bold">{message.ninja_name.charAt(0)}</span>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold">{message.ninja_name}</h4>
                  <span className="text-xs text-gray-400">
                    {new Date(message.created_at).toLocaleDateString("ja-JP")}
                  </span>
                </div>
                <p className="text-gray-200 mb-2 whitespace-pre-wrap">{message.message}</p>
                {message.song_request && (
                  <div className="text-xs bg-ninja-blue p-2 rounded mt-2">
                    <span className="font-bold text-ninja-green">替え歌リクエスト:</span> {message.song_request}
                  </div>
                )}
                {message.political_topic && (
                  <div className="text-xs bg-ninja-blue p-2 rounded mt-2">
                    <span className="font-bold text-ninja-red">政治的関心事:</span> {message.political_topic}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
