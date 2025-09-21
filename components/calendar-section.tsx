import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Calendar } from "lucide-react"
import { ShurikenIcon } from "./icons/shuriken-icon"

export default function CalendarSection() {
  return (
    <section id="calendar" className="py-20 bg-ninja-blue-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            活動<span className="text-ninja-green">カレンダー</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-red mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-ninja-blue border-ninja-green overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-ninja-green rounded-full p-4">
                  <Calendar className="h-12 w-12 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">現在予定なし</h3>

              <div className="flex items-center justify-center mb-6">
                <ShurikenIcon className="text-ninja-red mr-2" size={20} />
                <p className="text-lg">次回の活動予定は準備中です</p>
                <ShurikenIcon className="text-ninja-red ml-2" size={20} />
              </div>

              <p className="text-gray-300 mb-8">
                最新の活動予定は、SNSでも随時お知らせします。
                <br />
                フォローして最新情報をチェックしてください。
              </p>

              <Button className="bg-ninja-green hover:bg-ninja-green-dark">
                <Calendar className="mr-2 h-4 w-4" /> 過去の活動を見る
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
