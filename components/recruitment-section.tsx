"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Users, Music, Heart, Video, Mic, CuboidIcon as Cube, Code } from "lucide-react"
import Link from "next/link"
import { ShurikenIcon } from "components/icons/shuriken-icon"

export default function RecruitmentSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("ninja")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const recruitmentContent = {
    ninja: {
      title: "政治忍者に参戦",
      description: "替え歌制作やパフォーマンスに参加したい方、政治を広める活動に興味がある方を募集しています。",
      buttonText: "参戦する",
      buttonClass: "bg-ninja-red hover:bg-ninja-red-dark",
      iconClass: "bg-ninja-red",
      icon: <Users className="h-8 w-8 text-white" />,
      details: (
        <div className="mt-4 p-4 bg-black/30 rounded-lg">
          <h4 className="font-bold text-lg mb-3">政治忍者隊メンバーの活動内容</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
              <span>政治替え歌の作詞・作曲・パフォーマンスへの参加</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
              <span>若者向け政治啓発イベントの企画・運営</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
              <span>SNSでの政治情報発信・拡散活動</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-red mr-2 flex-shrink-0 mt-1" size={16} />
              <span>政治忍者オリジナルグッズの企画・制作</span>
            </li>
          </ul>
          <p className="mt-3 text-sm">※活動頻度や参加形態は柔軟に対応可能です</p>
        </div>
      ),
    },
    collab: {
      title: "コラボレーション",
      description: "アーティスト、クリエイター、政治団体など、政治忍者とのコラボレーションを希望する方はこちら。",
      buttonText: "コラボする",
      buttonClass: "bg-ninja-green hover:bg-ninja-green-dark",
      iconClass: "bg-ninja-green",
      icon: <Music className="h-8 w-8 text-white" />,
      details: (
        <div className="mt-4 p-4 bg-black/30 rounded-lg">
          <h4 className="font-bold text-lg mb-3">コラボレーション事例</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>音楽アーティストとの政治替え歌コラボ制作</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>若者向け政治団体とのイベント共同開催</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>クリエイターとのオリジナルグッズ共同開発</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>メディアとの政治コンテンツ制作協力</span>
            </li>
          </ul>
          <p className="mt-3 text-sm">※新しいアイデアのコラボも歓迎します</p>
        </div>
      ),
    },
    support: {
      title: "応援・サポート",
      description: "政治忍者の活動を応援したい方、資金面や技術面でサポートしたい方はこちらから。",
      buttonText: "応援する",
      buttonClass: "bg-ninja-blue hover:bg-ninja-blue-light",
      iconClass: "bg-ninja-blue",
      icon: <Heart className="h-8 w-8 text-white" />,
      details: (
        <div className="mt-4 p-4 bg-black/30 rounded-lg">
          <h4 className="font-bold text-lg mb-3">サポート方法</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>活動資金の寄付</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>無償・格安での技術提供</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>SNSでの拡散・シェアによる応援</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>イベント参加や口コミによる応援</span>
            </li>
          </ul>
          {/* <ul className="space-y-2">
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>活動資金のクラウドファンディング参加</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>政治忍者グッズの購入による支援</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>SNSでの拡散・シェアによる応援</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-blue mr-2 flex-shrink-0 mt-1" size={16} />
              <span>イベント参加や口コミによる応援</span>
            </li>
          </ul> */}
          <p className="mt-3 text-sm">※あなたのできる形での応援をお待ちしています</p>
        </div>
      ),
    },
  }

  return (
    <section id="recruitment" className="py-20 ninja-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/japanese-scroll-pattern.png')] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              共に<span className="text-ninja-red">闇を斬る</span>仲間を募集！
            </h2>
            <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(recruitmentContent).map(([key, content]) => (
              <Card
                key={key}
                className={`bg-ninja-blue-dark border-${
                  key === "ninja" ? "ninja-red" : key === "collab" ? "ninja-green" : "ninja-blue"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`${content.iconClass} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                  >
                    {content.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{content.title}</h3>
                  <p className="mb-6 text-gray-300">{content.description}</p>
                  <Button className={`w-full ${content.buttonClass}`} onClick={() => setActiveTab(key)}>
                    {content.buttonText}
                  </Button>
                  {activeTab === key && content.details}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-black/50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">現在募集中の技術サポート人材</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="bg-ninja-red rounded-full p-3 mb-4">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold mb-2">動画クリエーター</h4>
                <p className="text-center text-sm">
                  政治替え歌のMV制作や、SNS用の短尺動画制作ができる方を募集しています。
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-ninja-green rounded-full p-3 mb-4">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold mb-2">ボーカロイド制作者</h4>
                <p className="text-center text-sm">
                  ボーカロイドを自在に扱い、政治替え歌の制作に協力いただける方を募集しています。
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-ninja-blue rounded-full p-3 mb-4">
                  <Cube className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold mb-2">3Dアニメーター</h4>
                <p className="text-center text-sm">
                  3Dアニメーション作成が得意で、政治忍者のキャラクター制作やMV制作に協力いただける方を募集しています。
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-ninja-red rounded-full p-3 mb-4">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold mb-2">WEBクリエーター</h4>
                <p className="text-center text-sm">
                  特にサーバーサイド技術にお詳しい方、フォームの実装、ショップカートの実装などができる方を募集しています。
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="#contact">
                <Button size="lg" className="bg-ninja-red hover:bg-ninja-red-dark">
                  技術サポートに応募する
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
