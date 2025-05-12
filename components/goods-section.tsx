import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "政治忍者Tシャツ",
    price: 3500,
    image: "/placeholder.svg?height=300&width=300&query=ninja t-shirt merchandise",
    badge: "人気",
    badgeColor: "bg-ninja-red",
  },
  {
    id: 2,
    name: "手裏剣ステッカーセット",
    price: 800,
    image: "/placeholder.svg?height=300&width=300&query=shuriken stickers set",
    badge: "新作",
    badgeColor: "bg-ninja-green",
  },
  {
    id: 3,
    name: "政治替え歌CD",
    price: 2000,
    image: "/placeholder.svg?height=300&width=300&query=music CD with ninja design",
    badge: "限定",
    badgeColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "忍者マスク",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300&query=ninja face mask black",
    badge: "",
    badgeColor: "",
  },
]

export default function GoodsSection() {
  return (
    <section id="goods" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            オリジナル<span className="text-ninja-red">グッズ</span>
          </h2>
          <div className="w-24 h-1 bg-ninja-green mx-auto"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            政治忍者の活動を支援するオリジナルグッズ。
            <br />
            <span className="text-ninja-red">忍者限定</span>アイテムも多数ご用意しています。
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-gray-900 border-gray-700 overflow-hidden">
                <div className="relative">
                  {product.badge && (
                    <div
                      className={`absolute top-2 right-2 ${product.badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}
                    >
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-ninja-red font-bold">¥{product.price.toLocaleString()}</div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <Button className="w-full bg-ninja-green hover:bg-ninja-green-dark">
                    <ShoppingBag className="mr-2 h-4 w-4" /> カートに追加
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-ninja-red hover:bg-ninja-red-dark">
              すべての商品を見る
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
