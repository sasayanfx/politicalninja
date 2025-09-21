// このファイルを app/api/test-voting-tables/route.ts として保存してください

import { NextResponse } from "next/server"
import { checkVotingTablesExist } from "../../../app/actions"

export async function GET() {
  try {
    const result = await checkVotingTablesExist()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in test-voting-tables API:", error)
    return NextResponse.json(
      { error: "テーブル確認中にエラーが発生しました" },
      { status: 500 }
    )
  }
}
