"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { useToast } from "../../../hooks/use-toast"
import { Loader2 } from "lucide-react"

type FanMessage = {
  id: number
  ninja_name: string
  message_type: string
  message: string
  song_request: string | null
  political_topic: string | null
  created_at: string
  is_approved: boolean
  is_displayed: boolean
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<FanMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [dbError, setDbError] = useState(false)
  const { toast } = useToast()
  
  // Supabase接続のエラーハンドリング
  const [supabase] = useState(() => {
    try {
      return createClientComponentClient()
    } catch (error) {
      console.error("Supabase connection error:", error)
      return null
    }
  })

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    if (!supabase) {
      setDbError(true)
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      const { data, error } = await supabase.from("fan_messages").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
      setDbError(true)
      toast({
        title: "データベース接続エラー",
        description: "Supabaseの設定を確認してください",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (id: number, isApproved: boolean, isDisplayed: boolean) => {
    try {
      setProcessingId(id)

      const { error } = await supabase
        .from("fan_messages")
        .update({ is_approved: isApproved, is_displayed: isDisplayed })
        .eq("id", id)

      if (error) throw error

      // 成功したらメッセージリストを更新
      setMessages(
        messages.map((msg) => (msg.id === id ? { ...msg, is_approved: isApproved, is_displayed: isDisplayed } : msg)),
      )

      toast({
        title: "更新完了",
        description: `メッセージのステータスを更新しました`,
      })
    } catch (error) {
      console.error("Error updating message:", error)
      toast({
        title: "エラー",
        description: "ステータスの更新に失敗しました",
        variant: "destructive",
      })
    } finally {
      setProcessingId(null)
    }
  }

  const deleteMessage = async (id: number) => {
    if (!confirm("このメッセージを削除してもよろしいですか？")) return

    try {
      setProcessingId(id)

      const { error } = await supabase.from("fan_messages").delete().eq("id", id)

      if (error) throw error

      // 成功したらメッセージリストから削除
      setMessages(messages.filter((msg) => msg.id !== id))

      toast({
        title: "削除完了",
        description: "メッセージを削除しました",
      })
    } catch (error) {
      console.error("Error deleting message:", error)
      toast({
        title: "エラー",
        description: "削除に失敗しました",
        variant: "destructive",
      })
    } finally {
      setProcessingId(null)
    }
  }

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case "fan_letter":
        return "ファンレター"
      case "song_request":
        return "替え歌リクエスト"
      case "political_interest":
        return "政治的関心事"
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-ninja-red" />
        <span className="ml-2">メッセージを読み込み中...</span>
      </div>
    )
  }

  if (dbError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">ファンメッセージ管理</h1>
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">データベース接続エラー</p>
          <p className="text-gray-600">Supabaseの環境変数が設定されていません</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ファンメッセージ管理</h1>

      <div className="mb-6 flex justify-between items-center">
        <Button onClick={fetchMessages} variant="outline">
          更新
        </Button>
        <div className="text-sm text-gray-500">{messages.length}件のメッセージ</div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-500">メッセージはありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`border-l-4 ${message.is_approved ? "border-l-green-500" : "border-l-gray-300"}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{message.ninja_name}</CardTitle>
                    <div className="flex space-x-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded">
                        {getMessageTypeLabel(message.message_type)}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded">
                        {new Date(message.created_at).toLocaleString("ja-JP")}
                      </span>
                      {message.is_approved && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">承認済み</span>
                      )}
                      {message.is_displayed && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">表示中</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={message.is_approved ? "outline" : "default"}
                      onClick={() => updateMessageStatus(message.id, !message.is_approved, message.is_displayed)}
                      disabled={processingId === message.id}
                    >
                      {processingId === message.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : message.is_approved ? (
                        "承認取消"
                      ) : (
                        "承認"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant={message.is_displayed ? "outline" : "default"}
                      onClick={() => updateMessageStatus(message.id, message.is_approved, !message.is_displayed)}
                      disabled={processingId === message.id || !message.is_approved}
                    >
                      {processingId === message.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : message.is_displayed ? (
                        "非表示"
                      ) : (
                        "表示"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMessage(message.id)}
                      disabled={processingId === message.id}
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {message.message && (
                    <div>
                      <h3 className="text-sm font-semibold mb-1">メッセージ:</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                  )}
                  {message.song_request && (
                    <div>
                      <h3 className="text-sm font-semibold mb-1">替え歌リクエスト:</h3>
                      <p className="text-gray-700">{message.song_request}</p>
                    </div>
                  )}
                  {message.political_topic && (
                    <div>
                      <h3 className="text-sm font-semibold mb-1">政治的関心事:</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{message.political_topic}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
