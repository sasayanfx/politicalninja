import { Card, CardContent } from "@/components/ui/card"
import { ShurikenIcon } from "@/components/icons/shuriken-icon"

export default function PoliticalIssuesSection() {
  // 問題の大きさでソート（数値が大きいほど重要）
  const politicalIssues = [
    { text: "給料の半分以上持っていくなんて、ヒドクナイすか！？税金高すぎ問題", importance: 100 },
    { text: "増税は勝手にサクサク決めるクセに、減税となると「財源ガー！」問題", importance: 95 },
    { text: "外国人生活保護支給、海外バラマキと外国人学生優遇、どこの国の政治なの？", importance: 90 },
    { text: "議員の半数以上が帰化人！？問題", importance: 85 },
    { text: "国の借金1000兆円超えのウソ。資産を計算に入れてないから当たり前！", importance: 80 },
    { text: "米価格高騰！備蓄米を放出しても全く下がらず上がってる始末", importance: 75 },
    { text: "選挙前だけいいこと言って、当選後に手のひら返し祭り開催中", importance: 70 },
    { text: "政治とカネの闇。「1億円の収支不記載」とか意味わからんレベル", importance: 65 },
    { text: "「少子化対策します！」と30年言い続けてるのに、なぜか毎年過去最低更新中", importance: 60 },
    { text: "東京一極集中がヤバい。地方は「若者おらず、仕事なし、未来なし」の三重苦", importance: 55 },
    { text: "重要な決定が密室で「いつの間にか決まってた」ってアリ？透明性皆無問題", importance: 50 },
    { text: "国際社会で「日本さん、あなた何がしたいの？」と問われ続ける存在感の薄さ", importance: 45 },
    { text: "国会中継、マジ退屈…。本音での議論より台本読みが多すぎ問題", importance: 40 },
    { text: "「政治家なんて信用できない」が若者の8割！？ 信頼関係ゼロ問題", importance: 35 },
    { text: "役所のデジタル化が遅すぎて、未だに「ハンコと紙の書類」が主役の謎", importance: 30 },
  ]

  // 重要度でソート（降順）
  const sortedIssues = [...politicalIssues].sort((a, b) => b.importance - a.importance)

  return (
    <section id="political-issues" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-ninja-red">日本の政治</span>の現状
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
          <p className="mt-6 text-lg max-w-2xl mx-auto">政治忍者が切り込むべき、現在の日本政治が抱える問題点</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-ninja-blue-dark border-ninja-red">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-ninja-green">日本政治の課題</h3>

              <ul className="space-y-4">
                {sortedIssues.map((issue, index) => (
                  <li key={index} className="flex items-start">
                    <ShurikenIcon className="text-ninja-red mr-3 flex-shrink-0 mt-1" size={20} />
                    <p className="text-lg">{issue.text}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-black/30 rounded-lg border-l-4 border-ninja-green">
                <p className="text-lg">
                  これらの問題に対して、政治忍者は若者の視点から切り込み、
                  <span className="text-ninja-green font-bold">エンターテイメント</span>
                  <span className="text-ninja-red font-bold">の力</span>で 政治を変える活動を展開しています。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
