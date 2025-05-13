import { createClient } from "@supabase/supabase-js"

// シングルトンパターンでクライアントを作成
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  // 環境変数からSupabaseの接続情報を取得
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 既にインスタンスが存在する場合はそれを返す
  if (supabaseInstance) {
    return supabaseInstance
  }

  // 環境変数が設定されていない場合はnullを返す
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase環境変数が設定されていません")
    return null
  }

  // 新しいインスタンスを作成
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}
