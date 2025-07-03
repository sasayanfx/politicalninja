// lib/email-service.ts

/** =========================================================================
 *  メール送信は Formspree のみを使用します。
 *  EmailJS 設定を完全に削除し、クライアントに機密情報を一切公開しないようにしました。
 *  ========================================================================= */

export const formspreeEndpoint = "https://formspree.io/f/xkgrzakz"

/**
 * Formspree 経由でメールを送信します。
 * @param data 送信内容
 */
export async function sendEmailViaFormspree(data: {
  ninja_name: string
  message_type: "fan_letter" | "song_request" | "political_topic"
  message: string
  song_request?: string
  political_topic?: string
}) {
  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `[政治忍者サイト] ${
          data.message_type === "fan_letter"
            ? "ファンレター"
            : data.message_type === "song_request"
              ? "楽曲リクエスト"
              : "政治的関心事"
        }`,
        ninja_name: data.ninja_name,
        message_type: data.message_type,
        message: data.message,
        song_request: data.song_request ?? "",
        political_topic: data.political_topic ?? "",
        timestamp: new Date().toLocaleString("ja-JP"),
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "送信エラー",
    }
  }
}
