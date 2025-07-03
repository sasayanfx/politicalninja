// Formspreeを使用したサーバーレス・メール送信サービス

export interface EmailData {
  name: string
  email: string
  message: string
}

export async function sendEmailViaFormspree(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("https://formspree.io/f/xdkogqpz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _replyto: data.email,
        _subject: `政治忍者サイトからのお問い合わせ - ${data.name}様`,
      }),
    })

    if (response.ok) {
      return {
        success: true,
        message: "メッセージが正常に送信されました。ありがとうございます！",
      }
    } else {
      throw new Error("送信に失敗しました")
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      message: "メッセージの送信に失敗しました。しばらく時間をおいて再度お試しください。",
    }
  }
}
