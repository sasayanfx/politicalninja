"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function VisitCounter() {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAndUpdateCounter = async () => {
      try {
        // ローカルストレージから前回の訪問日と訪問カウントを取得
        const lastVisit = localStorage.getItem("lastVisit")
        const today = new Date().toDateString()
        const localCount = Number.parseInt(localStorage.getItem("visitCount") || "0", 10)

        // Supabaseが利用可能かチェック
        if (supabase) {
          // Supabaseを使用したカウンター処理
          // 今日初めての訪問の場合のみカウントを増やす
          if (lastVisit !== today) {
            // カウンターを取得
            const { data: counters, error: fetchError } = await supabase
              .from("visit_counter")
              .select("*")
              .eq("id", 1)
              .single()

            if (fetchError && fetchError.code !== "PGRST116") {
              console.error("Error fetching counter:", fetchError)
              // エラーが発生した場合はローカルカウンターにフォールバック
              handleLocalCounter(lastVisit, today, localCount)
              return
            }

            const currentCount = counters?.count || 0

            // カウンターを更新
            const { data: updatedCounter, error: updateError } = await supabase
              .from("visit_counter")
              .upsert({ id: 1, count: currentCount + 1 })
              .select()
              .single()

            if (updateError) {
              console.error("Error updating counter:", updateError)
              // エラーが発生した場合はローカルカウンターにフォールバック
              handleLocalCounter(lastVisit, today, localCount)
            } else {
              setCount(updatedCounter.count)
              // ローカルストレージに訪問日を保存
              localStorage.setItem("lastVisit", today)
            }
          } else {
            // 今日すでに訪問済みの場合は、現在のカウントを取得するだけ
            const { data: counters, error } = await supabase.from("visit_counter").select("*").eq("id", 1).single()

            if (error) {
              console.error("Error fetching counter:", error)
              // エラーが発生した場合はローカルカウンターを表示
              setCount(10000 + localCount)
            } else {
              setCount(counters?.count || 0)
            }
          }
        } else {
          // Supabaseが利用できない場合はローカルカウンターを使用
          handleLocalCounter(lastVisit, today, localCount)
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        // エラーが発生した場合はローカルカウンターを表示
        const localCount = Number.parseInt(localStorage.getItem("visitCount") || "0", 10)
        setCount(10000 + localCount)
      } finally {
        setIsLoading(false)
      }
    }

    // ローカルカウンターを処理する関数
    const handleLocalCounter = (lastVisit: string | null, today: string, localCount: number) => {
      if (lastVisit !== today) {
        // 今日初めての訪問の場合はカウントを増やす
        localCount += 1
        localStorage.setItem("visitCount", localCount.toString())
        localStorage.setItem("lastVisit", today)
      }
      // 表示用のカウントを設定（デモ用に基準値を追加）
      setCount(10000 + localCount)
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
