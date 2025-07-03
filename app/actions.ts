"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// 汎用 Supabase クライアント（サービスロールキーがあれば優先使用）
const getSupabaseClient = () => {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("Supabase URL:", url ? "設定済み" : "未設定")
  console.log("Service Key:", serviceKey ? "設定済み" : "未設定")
  console.log("Anon Key:", anonKey ? "設定済み" : "未設定")

  if (!url) {
    console.error("Supabase URL is not set")
    throw new Error("Supabase URL is not set")
  }

  const key = serviceKey || anonKey
  if (!key) {
    console.error("Supabase key is not set")
    throw new Error("Supabase key is not set")
  }

  return createClient(url, key)
}

// ファンレター送信アクション
export async function submitFanLetter(formData: FormData) {
  console.log("submitFanLetter called")

  try {
    const supabase = getSupabaseClient()

    const ninjaName = formData.get("ninjaName") as string
    const message = formData.get("message") as string

    console.log("Form data:", { ninjaName, message })

    if (!ninjaName || !message) {
      console.log("Validation failed: missing ninjaName or message")
      return { success: false, error: "忍者ネームとメッセージを入力してください" }
    }

    console.log("Attempting to insert into fan_messages table")

    const { data, error } = await supabase
      .from("fan_messages")
      .insert({
        ninja_name: ninjaName,
        message_type: "fan_letter",
        message: message,
        song_request: null,
        political_topic: null,
      })
      .select()

    if (error) {
      console.error("Supabase insert error:", error)
      return { success: false, error: `データベースエラー: ${error.message}` }
    }

    console.log("Insert successful:", data)
    revalidatePath("/")
    return { success: true, message: "ファンレターが送信されました！確認後に表示されます。" }
  } catch (error) {
    console.error("Error submitting fan letter:", error)
    return { success: false, error: `エラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}` }
  }
}

// 替え歌リクエスト送信アクション
export async function submitSongRequest(formData: FormData) {
  console.log("submitSongRequest called")

  try {
    const supabase = getSupabaseClient()

    const songRequest = formData.get("songRequest") as string

    console.log("Song request data:", { songRequest })

    if (!songRequest) {
      console.log("Validation failed: missing songRequest")
      return { success: false, error: "楽曲リクエストを入力してください" }
    }

    console.log("Attempting to insert song request")

    const { data, error } = await supabase
      .from("fan_messages")
      .insert({
        ninja_name: "匿名忍者",
        message_type: "song_request",
        message: `楽曲リクエスト: ${songRequest}`,
        song_request: songRequest,
        political_topic: null,
      })
      .select()

    if (error) {
      console.error("Supabase insert error:", error)
      return { success: false, error: `データベースエラー: ${error.message}` }
    }

    console.log("Song request insert successful:", data)
    revalidatePath("/")
    return { success: true, message: "楽曲リクエストが送信されました！" }
  } catch (error) {
    console.error("Error submitting song request:", error)
    return { success: false, error: `エラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}` }
  }
}

// 政治的関心事送信アクション
export async function submitPoliticalInterest(formData: FormData) {
  console.log("submitPoliticalInterest called")

  try {
    const supabase = getSupabaseClient()

    const politicalTopic = formData.get("politicalTopic") as string

    console.log("Political topic data:", { politicalTopic })

    if (!politicalTopic) {
      console.log("Validation failed: missing politicalTopic")
      return { success: false, error: "政治的関心事を入力してください" }
    }

    console.log("Attempting to insert political interest")

    const { data, error } = await supabase
      .from("fan_messages")
      .insert({
        ninja_name: "匿名忍者",
        message_type: "political_interest",
        message: `政治的関心事: ${politicalTopic}`,
        song_request: null,
        political_topic: politicalTopic,
      })
      .select()

    if (error) {
      console.error("Supabase insert error:", error)
      return { success: false, error: `データベースエラー: ${error.message}` }
    }

    console.log("Political interest insert successful:", data)
    revalidatePath("/")
    return { success: true, message: "政治的関心事が送信されました！" }
  } catch (error) {
    console.error("Error submitting political interest:", error)
    return { success: false, error: `エラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}` }
  }
}

// 承認済みメッセージの取得
export async function getApprovedMessages() {
  console.log("getApprovedMessages called")

  try {
    const supabase = getSupabaseClient()

    console.log("Attempting to fetch approved messages")

    const { data, error } = await supabase
      .from("fan_messages")
      .select("*")
      .eq("is_approved", true)
      .eq("is_displayed", true)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Supabase select error:", error)
      return { success: false, messages: [] }
    }

    console.log("Approved messages fetched:", data?.length || 0, "messages")
    return { success: true, messages: data || [] }
  } catch (error) {
    console.error("Error fetching approved messages:", error)
    return { success: false, messages: [] }
  }
}

// デバッグ用：テーブル存在確認
export async function checkTableExists() {
  console.log("checkTableExists called")

  try {
    const supabase = getSupabaseClient()

    // テーブルの存在確認（簡単なクエリを実行）
    const { data, error } = await supabase.from("fan_messages").select("count", { count: "exact" }).limit(1)

    if (error) {
      console.error("Table check error:", error)
      return { exists: false, error: error.message }
    }

    console.log("Table exists, record count:", data)
    return { exists: true, count: data }
  } catch (error) {
    console.error("Error checking table:", error)
    return { exists: false, error: error instanceof Error ? error.message : "不明なエラー" }
  }
}
