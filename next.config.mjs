/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify用の設定
  output: 'export',
  trailingSlash: true,
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
        protocol: 'http',
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
