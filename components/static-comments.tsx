"use client"

import { Card, CardContent } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { approvedComments, type Comment } from "@/data/comments"
import { MessageCircle, Music, Users } from "lucide-react"

const getMessageTypeIcon = (type: Comment["message_type"]) => {
  switch (type) {
    case "fan_letter":
      return <MessageCircle className="h-4 w-4" />
    case "song_request":
      return <Music className="h-4 w-4" />
    case "political_interest":
      return <Users className="h-4 w-4" />
    default:
      return <MessageCircle className="h-4 w-4" />
  }
}

const getMessageTypeLabel = (type: Comment["message_type"]) => {
  switch (type) {
    case "fan_letter":
      return "ファンレター"
    case "song_request":
      return "楽曲リクエスト"
    case "political_interest":
      return "政治的関心"
    default:
      return "メッセージ"
  }
}

const getMessageTypeBadgeColor = (type: Comment["message_type"]) => {
  switch (type) {
    case "fan_letter":
      return "bg-ninja-green text-white"
    case "song_request":
      return "bg-ninja-red text-white"
    case "political_interest":
      return "bg-blue-600 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

export default function StaticComments() {
  return (
    <div className="space-y-4">
      {approvedComments.map((comment) => (
        <Card key={comment.id} className="bg-ninja-blue-dark border-ninja-green">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-ninja-green">🥷 {comment.ninja_name}</span>
                <Badge className={getMessageTypeBadgeColor(comment.message_type)}>
                  {getMessageTypeIcon(comment.message_type)}
                  <span className="ml-1">{getMessageTypeLabel(comment.message_type)}</span>
                </Badge>
              </div>
              <span className="text-xs text-gray-400">{comment.created_at}</span>
            </div>

            <p className="text-gray-200 mb-2">{comment.message}</p>

            {comment.song_request && (
              <div className="mt-2 p-2 bg-ninja-red/20 rounded border-l-4 border-ninja-red">
                <span className="text-sm text-ninja-red font-semibold">リクエスト楽曲: </span>
                <span className="text-sm text-gray-200">{comment.song_request}</span>
              </div>
            )}

            {comment.political_topic && (
              <div className="mt-2 p-2 bg-blue-600/20 rounded border-l-4 border-blue-600">
                <span className="text-sm text-blue-400 font-semibold">政治的関心事: </span>
                <span className="text-sm text-gray-200">{comment.political_topic}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
