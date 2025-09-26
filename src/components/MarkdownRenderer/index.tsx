import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import styled from "@emotion/styled"

type Props = {
  content: string
}

const MarkdownRenderer: FC<Props> = ({ content }) => {
  if (!content) {
    return <StyledWrapper>No content available</StyledWrapper>
  }

  return (
    <StyledWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
        {content}
      </ReactMarkdown>
    </StyledWrapper>
  )
}

export default MarkdownRenderer

const StyledWrapper = styled.div`
  > * {
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
  }

  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.25em;
  }

  p {
    margin: 1em 0;
    line-height: 1.6;
  }

  ul,
  ol {
    margin: 1em 0;
    padding-left: 2em;
  }

  li {
    margin: 0.5em 0;
  }

  blockquote {
    border-left: 4px solid #ddd;
    margin: 1em 0;
    padding-left: 1em;
    color: #666;
    font-style: italic;
  }

  code {
    background: #f4f4f4;
    color: #1a202c;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: "Courier New", monospace;
    font-size: 0.85em;
  }

  pre {
    background: #f8f8f8;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1em 0;

    code {
      background: none;
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 1em 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.5em;
    text-align: left;
    background: #f8f8f8;
    color: #1a202c;
  }

  th {
    background: #f8f8f8;
    color: #1a202c;
    font-weight: 600;
  }

  a {
    color: #0066cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
