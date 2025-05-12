import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const counterFilePath = path.join(process.cwd(), "data", "counter.json")

// カウンターファイルが存在しない場合は作成する関数
async function ensureCounterFile() {
  try {
    await fs.mkdir(path.dirname(counterFilePath), { recursive: true })
    try {
      await fs.access(counterFilePath)
    } catch {
      await fs.writeFile(counterFilePath, JSON.stringify({ count: 0 }))
    }
  } catch (error) {
    console.error("Error ensuring counter file exists:", error)
  }
}

// カウントを取得する
export async function GET() {
  await ensureCounterFile()

  try {
    const data = await fs.readFile(counterFilePath, "utf-8")
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error("Error reading counter:", error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}

// カウントを増やす
export async function POST() {
  await ensureCounterFile()

  try {
    const data = await fs.readFile(counterFilePath, "utf-8")
    const counter = JSON.parse(data)
    counter.count += 1
    await fs.writeFile(counterFilePath, JSON.stringify(counter))
    return NextResponse.json(counter)
  } catch (error) {
    console.error("Error incrementing counter:", error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
