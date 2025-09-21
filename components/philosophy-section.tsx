import { Card, CardContent } from "./ui/card"
import { ShurikenIcon } from "./icons/shuriken-icon"

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-20 bg-ninja-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            活動理念 <span className="text-ninja-red">政治忍者の思い</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <span className="text-ninja-red">無関心という闇</span>を、
              <br />
              <span className="text-ninja-green">エンタメの刃</span>で切り裂く。
            </h3>

            <p className="text-lg leading-relaxed mb-6">
              政治は難しい。退屈だ。自分には関係ない——。
              <br />
              そんな声が若者たちの間で広がっています。
            </p>

            <p className="text-lg leading-relaxed mb-6">
              しかし、政治は私たちの生活に直結しています。教育、雇用、環境、社会保障…あらゆる課題が政治によって左右されるのです。
            </p>

            <p className="text-lg leading-relaxed mb-6">
              <span className="text-ninja-red font-bold">政治忍者</span>
              は、エンターテイメントの力で政治への関心を高め、若者の政治参画を促進するために活動しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-ninja-blue-dark border-ninja-green">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <ShurikenIcon className="text-ninja-red mr-2" size={20} />
                  <h4 className="text-xl font-bold text-ninja-red">エンタメ×政治</h4>
                </div>
                <p>楽曲やパフォーマンスを通じて、政治を身近で楽しいものに変えます。</p>
              </CardContent>
            </Card>

            <Card className="bg-ninja-blue-dark border-ninja-green">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <ShurikenIcon className="text-ninja-red mr-2" size={20} />
                  <h4 className="text-xl font-bold text-ninja-red">若者の声を届ける</h4>
                </div>
                <p>若者が政治に参加する重要性を伝え、その声を社会に届けます。</p>
              </CardContent>
            </Card>

            <Card className="bg-ninja-blue-dark border-ninja-green">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <ShurikenIcon className="text-ninja-red mr-2" size={20} />
                  <h4 className="text-xl font-bold text-ninja-red">コミュニティ形成</h4>
                </div>
                <p>政治に関心を持つ若者たちのコミュニティを作り、共に行動します。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
