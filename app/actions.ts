"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Supabaseクライアントの作成（サーバーサイド用）
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// サーバーサイドのSupabaseクライアント
const getSupabaseAdmin = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase credentials are not set")
  }
  return createClient(supabaseUrl, supabaseServiceKey)
}

// ファンレター送信アクション
export async function submitFanLetter(formData: FormData) {
  try {
    const supabase = getSupabaseAdmin()

    const ninjaName = formData.get("ninjaName") as string
    const message = formData.get("message") as string

    if (!ninjaName || !message) {
      return { success: false, error: "忍者ネームとメッセージを入力してください" }
    }

    const { error } = await supabase.from("fan_messages").insert({
      ninja_name: ninjaName,
      message_type: "fan_letter",
      message: message,
      song_request: null,
      political_topic: null,
    })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    revalidatePath("/")
    return { success: true, message: "ファンレターが送信されました！確認後に表示されます。" }
  } catch (error) {
    console.error("Error submitting fan letter:", error)
    return { success: false, error: "エラーが発生しました。後でもう一度お試しください。" }
  }
}

// 替え歌リクエスト送信アクション
export async function submitSongRequest(formData: FormData) {
  try {
    const supabase = getSupabaseAdmin()

    const songRequest = formData.get("songRequest") as string

    if (!songRequest) {
      return { success: false, error: "楽曲リクエストを入力してください" }
    }

    const { error } = await supabase.from("fan_messages").insert({
      ninja_name: "匿名忍者", // デフォルト名
      message_type: "song_request",
      message: `楽曲リクエスト: ${songRequest}`,
      song_request: songRequest,
      political_topic: null,
    })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    revalidatePath("/")
    return { success: true, message: "楽曲リクエストが送信されました！" }
  } catch (error) {
    console.error("Error submitting song request:", error)
    return { success: false, error: "エラーが発生しました。後でもう一度お試しください。" }
  }
}

// 政治的関心事送信アクション
export async function submitPoliticalInterest(formData: FormData) {
  try {
    const supabase = getSupabaseAdmin()

    const politicalTopic = formData.get("politicalTopic") as string

    if (!politicalTopic) {
      return { success: false, error: "政治的関心事を入力してください" }
    }

    const { error } = await supabase.from("fan_messages").insert({
      ninja_name: "匿名忍者", // デフォルト名
      message_type: "political_interest",
      message: `政治的関心事: ${politicalTopic}`,
      song_request: null,
      political_topic: politicalTopic,
    })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    revalidatePath("/")
    return { success: true, message: "政治的関心事が送信されました！" }
  } catch (error) {
    console.error("Error submitting political interest:", error)
    return { success: false, error: "エラーが発生しました。後でもう一度お試しください。" }
  }
}

// 承認済みメッセージの取得
export async function getApprovedMessages() {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from("fan_messages")
      .select("*")
      .eq("is_approved", true)
      .eq("is_displayed", true)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) throw error

    return { success: true, messages: data }
  } catch (error) {
    console.error("Error fetching approved messages:", error)
    return { success: false, messages: [] }
  }
}
