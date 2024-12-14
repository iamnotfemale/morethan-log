module.exports = {
  async redirects() {
    return [
      {
        source: "/robots.txt",
        destination: "/robots",
        permanent: true,
      },
    ]
  },
  images: {
    domains: [
      "www.notion.so",
      "lh5.googleusercontent.com",
      "s3-us-west-2.amazonaws.com",
    ],
  },
  experimental: {
    optimizePackageImports: true,
  },
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.performance = {
      hints: false, // 성능 경고 비활성화
    }
    return config
  },
}
