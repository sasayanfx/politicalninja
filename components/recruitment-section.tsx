"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Users, Music, Heart, Video, Mic, CuboidIcon as Cube, Code } from "lucide-react"
import Link from "next/link"
import { ShurikenIcon } from "./icons/shuriken-icon"

export default function RecruitmentSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("ninja")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const recruitmentContent = {
    ninja: {
      title: "政治忍者参戦",
      description: "替え歌制作やパフォーマンスに参加したい、政治を変える活動に興味がある方を募集しています。",
      buttonText: "参戦する",
      buttonClass: "bg-ninja-red hover:bg-ninja-red-dark",
      iconClass: "bg-ninja-red",
      icon: <Users className="h-8 w-8 text-white" />,
      details: (
        <div className="mt-4 p-4 bg-black/30 rounded-lg">
          <h4 className="font-bold text-lg mb-3">政治忍者メンバーの活動内容</h4>
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
              <span>SNSでの政治啓発発信・拡散活動</span>
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
    supporter: {
      title: "サポーター参加",
      description: "政治忍者を応援したい、一緒に政治を変えていきたい方を募集しています。",
      buttonText: "応援する",
      buttonClass: "bg-ninja-green hover:bg-ninja-green-dark",
      iconClass: "bg-ninja-green",
      icon: <Heart className="h-8 w-8 text-white" />,
      details: (
        <div className="mt-4 p-4 bg-black/30 rounded-lg">
          <h4 className="font-bold text-lg mb-3">サポーターの活動内容</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>SNSでの拡散・シェア活動</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>イベント参加・応援</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>グッズ購入・販売協力</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-ninja-green mr-2 flex-shrink-0 mt-1" size={16} />
              <span>政治に関する意見・アイデア提供</span>
            </li>
          </ul>
        </div>
      ),
    },
    creator: {
      title: "クリエイター参加",
      description: "動画制作、デザイン、楽曲制作など、クリエイティブなスキルで政治忍者をサポートしたい方を募集しています。",
      buttonText: "参加する",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
      iconClass: "bg-blue-600",
      icon: <Video className="h-8 w-8 text-white" />,
      details: (
        <div className="mt-4 p-4 bg-black/30 rounded-lg">
          <h4 className="font-bold text-lg mb-3">クリエイターの活動内容</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ShurikenIcon className="text-blue-400 mr-2 flex-shrink-0 mt-1" size={16} />
              <span>MV・PV制作</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-blue-400 mr-2 flex-shrink-0 mt-1" size={16} />
              <span>ロゴ・ポスター・グッズデザイン</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-blue-400 mr-2 flex-shrink-0 mt-1" size={16} />
              <span>音響・レコーディング技術</span>
            </li>
            <li className="flex items-start">
              <ShurikenIcon className="text-blue-400 mr-2 flex-shrink-0 mt-1" size={16} />
              <span>Webサイト・アプリ開発</span>
            </li>
          </ul>
        </div>
      ),
    },
  }

  const tabs = [
    { id: "ninja", label: "政治忍者", icon: <Users className="h-4 w-4" /> },
    { id: "supporter", label: "サポーター", icon: <Heart className="h-4 w-4" /> },
    { id: "creator", label: "クリエイター", icon: <Video className="h-4 w-4" /> },
  ]

  return (
    <section
      id="recruitment"
      className={`py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            参加・応援募集
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            政治忍者と一緒に、日本を変える活動に参加しませんか？
            <br />
            あなたのスキルや情熱を活かして、政治をエンタメに変えましょう！
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-lg transform scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* メインコンテンツ */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 左側：説明カード */}
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${recruitmentContent[activeTab].iconClass}`}>
                  {recruitmentContent[activeTab].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {recruitmentContent[activeTab].title}
                  </h3>
                  <p className="text-gray-300 mt-2">
                    {recruitmentContent[activeTab].description}
                  </p>
                </div>
              </div>

              {recruitmentContent[activeTab].details}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  className={`${recruitmentContent[activeTab].buttonClass} text-white font-bold py-3 px-8 text-lg transition-all duration-300 hover:scale-105`}
                  size="lg"
                >
                  {recruitmentContent[activeTab].buttonText}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-8 text-lg"
                  size="lg"
                >
                  詳細を見る
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 右側：参加方法 */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Music className="h-5 w-5 text-red-400" />
                  参加方法
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>1. <strong>LINE公式アカウント</strong>に友達追加</p>
                  <p>2. <strong>参加希望</strong>の旨をメッセージ</p>
                  <p>3. <strong>簡単な面談</strong>（オンライン可）</p>
                  <p>4. <strong>活動開始</strong>！</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-400" />
                  応援方法
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>• <strong>SNSフォロー</strong>・拡散</p>
                  <p>• <strong>グッズ購入</strong>で活動支援</p>
                  <p>• <strong>イベント参加</strong>で応援</p>
                  <p>• <strong>意見・アイデア</strong>の提供</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  お問い合わせ
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p><strong>X（旧Twitter）:</strong> @seijixninja</p>
                  <p><strong>Instagram:</strong> @seijixninja</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* フッターメッセージ */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            年齢・性別・経験は問いません。政治を変えたいという熱い想いがあれば、誰でも参加できます！
            <br />
            <span className="text-yellow-400 font-semibold">一緒に日本を救いましょう！</span>
          </p>
        </div>
      </div>
    </section>
  )
}