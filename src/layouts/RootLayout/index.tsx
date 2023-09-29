import React, { useState, useEffect, useRef, ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"
import useScheme from "src/hooks/useScheme"
import Header from "./Header"
import styled from "@emotion/styled"
import Scripts from "src/layouts/RootLayout/Scripts"
import useGtagEffect from "./useGtagEffect"
import useDebounce from "src/hooks/useDebounce"
import { useRouter } from "next/router"

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const router = useRouter()
  const currentElementRef = useRef<HTMLDivElement | null>(null)

  const [blogHeight, setBlogHeight] = useState(0)
  const [debounceScrollY, setDebounceScrollY] = useState<number>(0)
  const [scheme] = useScheme()

  useGtagEffect()

  const scrollDebounce = useDebounce(() => {
    setDebounceScrollY(window.scrollY)
  }, 200)

  const getCurrentPercentage = () => {
    if (router.asPath === "/") return 0

    let percentage = Math.ceil((debounceScrollY / blogHeight) * 100)

    if (percentage >= 90) {
      percentage = 100
    } else {
      percentage = Math.ceil((debounceScrollY / blogHeight) * 100)
    }
    return percentage
  }

  useEffect(() => {
    if (currentElementRef.current) {
      const clientHeight = currentElementRef.current.clientHeight
      setBlogHeight(clientHeight)
    }

    window.addEventListener("scroll", scrollDebounce)
    return () => window.removeEventListener("scroll", scrollDebounce)
  }, [debounceScrollY])

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
