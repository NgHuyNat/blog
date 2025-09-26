import { FC } from "react"
import styled from "@emotion/styled"
import { useClientOnly } from "src/hooks/useClientOnly"
import MarkdownRenderer from "./index"

type Props = {
  content: string
}

const ClientOnlyMarkdownRenderer: FC<Props> = ({ content }) => {
  const hasMounted = useClientOnly()

  if (!hasMounted) {
    return (
      <StyledLoadingWrapper>
        <div className="loading">Đang tải nội dung...</div>
      </StyledLoadingWrapper>
    )
  }

  return <MarkdownRenderer content={content} />
}

export default ClientOnlyMarkdownRenderer

const StyledLoadingWrapper = styled.div`
  padding: 2rem;
  text-align: center;

  .loading {
    color: #666;
    font-style: italic;
  }
`
