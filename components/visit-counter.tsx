"use client"

import { useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase"

export default function VisitCounter() {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAndUpdateCounter = async () => {
      try {
        // ローカルストレージから前回の訪問日を取得
        const lastVisit = localStorage.getItem("lastVisit")
        const today = new Date().toDateString()

        // Supabaseクライアントを取得
        const supabase = getSupabase()

        if (!supabase) {
          console.error("Supabaseクライアントが初期化できませんでした")
          setIsLoading(false)
          return
        }

        // 今日初めての訪問の場合のみカウントを増やす
        if (lastVisit !== today) {
          // トランザクション的な処理（Supabaseではトランザクションが直接サポートされていないため）
          const { data: currentData, error: fetchError } = await supabase
            .from("visit_counter")
            .select("count")
            .eq("id", 1)
            .single()

          if (fetchError) {
            console.error("カウンター取得エラー:", fetchError)
            setIsLoading(false)
            return
          }

          const currentCount = currentData?.count || 0

          // カウンターを更新
          const { data: updatedData, error: updateError } = await supabase
            .from("visit_counter")
            .update({ count: currentCount + 1 })
            .eq("id", 1)
            .select()
            .single()

          if (updateError) {
            console.error("カウンター更新エラー:", updateError)
          } else {
            setCount(updatedData.count)
            // ローカルストレージに訪問日を保存
            localStorage.setItem("lastVisit", today)
          }
        } else {
          // 今日すでに訪問済みの場合は、現在のカウントを取得するだけ
          const { data, error } = await supabase.from("visit_counter").select("count").eq("id", 1).single()

          if (error) {
            console.error("カウンター取得エラー:", error)
          } else {
            setCount(data?.count || 0)
          }
        }
      } catch (error) {
        console.error("予期せぬエラー:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAndUpdateCounter()
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <div className="text-xs text-gray-400">訪問者数:</div>
      <div className="bg-ninja-blue-dark border border-ninja-green px-2 py-1 rounded-md">
        {isLoading ? (
          <div className="animate-pulse w-16 h-5 bg-gray-700 rounded"></div>
        ) : (
          <div className="font-mono text-ninja-red font-bold tracking-wider">{count.toLocaleString()}</div>
        )}
      </div>
    </div>
  )
}
