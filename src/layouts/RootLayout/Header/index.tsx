import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"

type Props = {
  fullWidth?: boolean
  readingProgress: number
}

const Header: React.FC<Props> = ({ fullWidth, readingProgress }) => {
  return (
    <StyledWrapper>
      <HeaderWrapper>
        <div data-full-width={fullWidth} className="container">
          <Logo />
          <div className="nav">
            <ThemeToggle />
            <NavBar />
          </div>
        </div>
      </HeaderWrapper>
      <ReadingProgress readingProgress={readingProgress} />
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  backdrop-filter: blur(50px);
`

const HeaderWrapper = styled.div`
  padding: 10px 0;
  background-color: ${({ theme }) => theme.colors.grayA1};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  .container {
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    height: 3rem;
    margin: 0 auto;
    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }
    .nav {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
  }
`

const ReadingProgress = styled.div<Props>`
  width: ${({ readingProgress }) => readingProgress + "%"};
  height: 0.2rem;
  background-color: ${({ theme }) => theme.colors.amber11};
  opacity: 0.6;
  transition: width 0.4s ease-out;
`
