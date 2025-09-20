"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// 汎用 Supabase クライアント（サービスロールキーがあれば優先使用）
const getSupabaseClient = () => {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // プロダクション環境では機密情報をログに出力しない
  if (process.env.NODE_ENV === 'development') {
    console.log("Supabase URL:", url ? "設定済み" : "未設定")
    console.log("Service Key:", serviceKey ? "設定済み" : "未設定")
    console.log("Anon Key:", anonKey ? "設定済み" : "未設定")
  }

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

// 楽曲投票アクション
export async function submitSongVote(userId: string, songTitle: string) {
  console.log("submitSongVote called", { userId, songTitle })

  try {
    const supabase = getSupabaseClient()

    // まず、ユーザーの現在の投票数を確認
    const { data: existingVotes, error: countError } = await supabase
      .from("song_votes")
      .select("song_title")
      .eq("user_id", userId)

    if (countError) {
      console.error("Error checking existing votes:", countError)
      return { success: false, error: `投票確認エラー: ${countError.message}` }
    }

    // 投票上限チェック（3票まで）
    if (existingVotes && existingVotes.length >= 3) {
      return { success: false, error: "投票上限（3票）に達しています" }
    }

    // 同じ楽曲への重複投票チェック
    const alreadyVoted = existingVotes?.some((vote) => vote.song_title === songTitle)
    if (alreadyVoted) {
      return { success: false, error: "この楽曲には既に投票済みです" }
    }

    // 投票を挿入
    const { data, error } = await supabase
      .from("song_votes")
      .insert({
        user_id: userId,
        song_title: songTitle,
      })
      .select()

    if (error) {
      console.error("Supabase vote insert error:", error)
      return { success: false, error: `投票エラー: ${error.message}` }
    }

    console.log("Vote insert successful:", data)
    revalidatePath("/")

    const remainingVotes = 3 - (existingVotes?.length || 0) - 1
    return {
      success: true,
      message: `「${songTitle}」に投票しました！`,
      remainingVotes,
      userVotes: [...(existingVotes?.map((v) => v.song_title) || []), songTitle],
    }
  } catch (error) {
    console.error("Error submitting vote:", error)
    return { success: false, error: `エラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}` }
  }
}

// 投票統計の取得
export async function getSongVoteStats() {
  console.log("getSongVoteStats called")

  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase.from("song_vote_stats").select("*").order("vote_count", { ascending: false })

    if (error) {
      console.error("Error fetching vote stats:", error)
      return { success: false, stats: [] }
    }

    console.log("Vote stats fetched:", data?.length || 0, "songs")
    return { success: true, stats: data || [] }
  } catch (error) {
    console.error("Error fetching vote stats:", error)
    return { success: false, stats: [] }
  }
}

// ユーザーの投票履歴取得
export async function getUserVotes(userId: string) {
  console.log("getUserVotes called", { userId })

  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("song_votes")
      .select("song_title, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user votes:", error)
      return { success: false, votes: [] }
    }

    console.log("User votes fetched:", data?.length || 0, "votes")
    return { success: true, votes: data || [] }
  } catch (error) {
    console.error("Error fetching user votes:", error)
    return { success: false, votes: [] }
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

// 投票テーブル存在確認
export async function checkVotingTablesExist() {
  console.log("checkVotingTablesExist called")

  try {
    const supabase = getSupabaseClient()

    // song_votes テーブルの存在確認
    const { data: votesData, error: votesError } = await supabase
      .from("song_votes")
      .select("count", { count: "exact" })
      .limit(1)

    // song_vote_stats ビューの存在確認
    const { data: statsData, error: statsError } = await supabase
      .from("song_vote_stats")
      .select("*")
      .limit(1)

    const result = {
      song_votes: {
        exists: !votesError,
        error: votesError?.message,
        count: votesData
      },
      song_vote_stats: {
        exists: !statsError,
        error: statsError?.message,
        data: statsData
      }
    }

    console.log("Voting tables check result:", result)
    return result
  } catch (error) {
    console.error("Error checking voting tables:", error)
    return { 
      error: error instanceof Error ? error.message : "不明なエラー",
      song_votes: { exists: false },
      song_vote_stats: { exists: false }
    }
  }
}
