"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchAndUpdateCounter = async () => {
      try {
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
  }, [supabase])

  if (loading) return <div className="text-center">Loading visitor count...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  return (
    <div className="text-center">
      <p className="text-lg">
        Total Visitors: <span className="font-bold">{count}</span>
      </p>
    </div>
  )
}
