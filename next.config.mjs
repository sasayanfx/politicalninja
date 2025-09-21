/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel用の設定（静的エクスポートを無効化）
  // output: 'export', // コメントアウト
  trailingSlash: true,
  // パス解決の設定
  basePath: '',
  assetPrefix: '',
  // エラーチェックを緩和
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // セキュリティ向上のため、許可するドメインを明示的に指定
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
      },
      {
        protocol: 'https',
        hostname: 'www.rays-counter.com', // 外部カウンターサービス用
      },
    ],
  },
  // セキュリティヘッダーの追加
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
