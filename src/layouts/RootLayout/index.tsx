import React, { useState, useEffect, useRef, ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"
import useScheme from "src/hooks/useScheme"
import Header from "./Header"
import styled from "@emotion/styled"
import Scripts from "src/layouts/RootLayout/Scripts"
import useGtagEffect from "./useGtagEffect"
import useThrottle from "src/hooks/useThrottle"
import { useRouter } from "next/router"
import Prism from "prismjs/prism"
import "prismjs/components/prism-markup-templating.js"
import "prismjs/components/prism-markup.js"
import "prismjs/components/prism-js-templates.js"
import "prismjs/components/prism-diff.js"
import "prismjs/components/prism-git.js"
import "prismjs/components/prism-makefile.js"
import "prismjs/components/prism-markdown.js"
import "prismjs/components/prism-python.js"
import "prismjs/components/prism-css.js"
import "prismjs/components/prism-sass.js"
import "prismjs/components/prism-scss.js"
import "prismjs/components/prism-stylus.js"
import "prismjs/components/prism-yaml.js"
// import"prismjs/components/prism-bash.js"
// import"prismjs/components/prism-c.js"
// import"prismjs/components/prism-cpp.js"
// import"prismjs/components/prism-csharp.js"
// import"prismjs/components/prism-docker.js"
// import"prismjs/components/prism-java.js"
// import"prismjs/components/prism-coffeescript.js"
// import"prismjs/components/prism-go.js"
// import"prismjs/components/prism-graphql.js"
// import"prismjs/components/prism-handlebars.js"
// import"prismjs/components/prism-less.js"
// import"prismjs/components/prism-objectivec.js"
// import"prismjs/components/prism-ocaml.js"
// import"prismjs/components/prism-reason.js"
// import"prismjs/components/prism-rust.js"
// import"prismjs/components/prism-solidity.js"
// import"prismjs/components/prism-sql.js"
// import"prismjs/components/prism-swift.js"
// import"prismjs/components/prism-wasm.js"

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const router = useRouter()
  const currentElementRef = useRef<HTMLDivElement | null>(null)

  const [blogHeight, setBlogHeight] = useState(0)
  const [throttleScrollY, setThrottleScrollY] = useState<number>(0)
  const [scheme] = useScheme()
  useGtagEffect()

  const scrollThrottle = useThrottle(() => {
    setThrottleScrollY(window.scrollY)
  }, 100)

  const getCurrentPercentage = () => {
    if (router.asPath === "/") return 0

    let percentage = Math.ceil((throttleScrollY / blogHeight) * 100)

    if (percentage >= 90) {
      percentage = 100
    } else {
      percentage = Math.ceil((throttleScrollY / blogHeight) * 100)
    }
    return percentage
  }

  useEffect(() => {
    if (currentElementRef.current) {
      const clientHeight = currentElementRef.current.clientHeight
      setBlogHeight(clientHeight)
    }

    window.addEventListener("scroll", scrollThrottle)
    return () => window.removeEventListener("scroll", scrollThrottle)
  }, [throttleScrollY])

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      {/* // TODO: replace react query */}
      {/* {metaConfig.type !== "Paper" && <Header />} */}
      <Header
        fullWidth={false}
        readingProgress={blogHeight < 1200 ? 0 : getCurrentPercentage()}
      />
      <StyledMain ref={currentElementRef}>{children}</StyledMain>
    </ThemeProvider>
  )
}

export default RootLayout

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  padding: 0 1rem;
`
