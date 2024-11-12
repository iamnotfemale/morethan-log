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
}
