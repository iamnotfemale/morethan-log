import { GetServerSideProps } from "next"

export const dynamic = "force-dynamic"

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain")
  res.write(`User-agent: *
Allow: /
Sitemap: https://www.mizzu-creations.xyz/sitemap.xml`)
  res.end()
  return {
    props: {},
  }
}

export default function Robots() {
  return null
}
