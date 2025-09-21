"use client"

import { useEffect, useState } from "react"
import { getSupabase } from "lib/supabase"

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndUpdateCounter = async () => {
      try {
        const supabase = getSupabase()

        // Supabaseが利用できない場合は静かに終了
        if (!supabase) {
          setLoading(false)
          return
        }

        // 現在の日付を取得
        const today = new Date().toISOString().split("T")[0]

        // ローカルストレージから最後の訪問日を取得
        const lastVisit = localStorage.getItem("lastVisit")

        // カウンターの現在値を取得
        const { data, error: fetchError } = await supabase.from("visit_counter").select("*").eq("id", 1).single()

        if (fetchError) {
          throw new Error(`Error fetching counter: ${fetchError.message}`)
        }

        // データが存在しない場合は初期値を設定
        if (!data) {
          const { error: insertError } = await supabase
            .from("visit_counter")
            .insert([{ id: 1, count: 1, last_updated: new Date().toISOString() }])

          if (insertError) {
            throw new Error(`Error initializing counter: ${insertError.message}`)
          }

          setCount(1)
          localStorage.setItem("lastVisit", today)
          return
        }

        // 今日初めての訪問の場合はカウンターを増加
        if (lastVisit !== today) {
          console.log("First visit today, incrementing counter")

          // RPCの代わりに直接UPDATEクエリを実行
          const { error: updateError } = await supabase
            .from("visit_counter")
            .update({ count: data.count + 1, last_updated: new Date().toISOString() })
            .eq("id", 1)

          if (updateError) {
            throw new Error(`Error updating counter: ${updateError.message}`)
          }

          // 更新後の値を再取得
          const { data: updatedData, error: refetchError } = await supabase
            .from("visit_counter")
            .select("*")
            .eq("id", 1)
            .single()

          if (refetchError) {
            throw new Error(`Error refetching counter: ${refetchError.message}`)
          }

          setCount(updatedData?.count || data.count + 1)
          localStorage.setItem("lastVisit", today)
        } else {
          console.log("Already visited today")
          setCount(data.count)
        }
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchAndUpdateCounter()
  }, [])

  // Supabaseが利用できない場合は何も表示しない
  const supabase = getSupabase()
  if (!supabase) {
    return null
  }

  if (loading) return <div className="text-center">Loading visitor count...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  // カウントを文字列に変換し、必要に応じて0埋め
  const formatCount = () => {
    if (count === null) return "00000"
    return count.toString().padStart(5, "0")
  }

  const countString = formatCount()

  return (
    <div className="text-left">
      <p className="text-sm mb-2">Total Visitors</p>
      <div className="flex">
        {countString.split("").map((digit, index) => (
          <div
            key={index}
            className="w-7 h-9 bg-gray-800 border border-gray-700 rounded mx-0.5 flex items-center justify-center"
          >
            <span className="text-lg font-mono font-bold text-ninja-red">{digit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
