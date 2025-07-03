// 手動で管理するコメントデータ
export interface Comment {
  id: number
  ninja_name: string
  message_type: "fan_letter" | "song_request" | "political_interest"
  message: string
  song_request?: string
  political_topic?: string
  created_at: string
}

export const approvedComments: Comment[] = [
  {
    id: 1,
    ninja_name: "影丸",
    message_type: "fan_letter",
    message: "政治忍者の活動、いつも楽しく拝見しています！替え歌のセンスが抜群で、政治への関心が高まりました。",
    created_at: "2025-01-01",
  },
  {
    id: 2,
    ninja_name: "月光",
    message_type: "song_request",
    message: "楽曲リクエスト: 津軽海峡冬景色",
    song_request: "津軽海峡冬景色",
    created_at: "2025-01-02",
  },
  {
    id: 3,
    ninja_name: "風雲",
    message_type: "political_interest",
    message: "政治的関心事: 選挙制度改革について",
    political_topic: "選挙制度改革について",
    created_at: "2025-01-03",
  },
  {
    id: 4,
    ninja_name: "雷電",
    message_type: "fan_letter",
    message: "「無能総理誕生！」の風刺が効いていて最高でした！政治への怒りを歌で表現するスタイルが素晴らしいです。",
    created_at: "2025-01-04",
  },
  {
    id: 5,
    ninja_name: "疾風",
    message_type: "song_request",
    message: "楽曲リクエスト: 上野駅",
    song_request: "上野駅",
    created_at: "2025-01-05",
  },
]
