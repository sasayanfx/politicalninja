// ブラウザフィンガープリンティングを使用した匿名ユーザーID生成
export function generateUserId(): string {
  // ブラウザの特徴を組み合わせてユニークなIDを生成
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("政治忍者投票システム", 2, 2)
  }

  const canvasFingerprint = canvas.toDataURL()

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvasFingerprint.slice(-50), // Canvas fingerprintの一部
  ].join("|")

  // シンプルなハッシュ関数
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 32bit整数に変換
  }

  return `user_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`
}

// ローカルストレージからユーザーIDを取得または生成
export function getUserId(): string {
  if (typeof window === "undefined") return "server_user"

  const stored = localStorage.getItem("ninja_user_id")
  if (stored) {
    return stored
  }

  const newId = generateUserId()
  localStorage.setItem("ninja_user_id", newId)
  return newId
}
