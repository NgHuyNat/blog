import dynamic from "next/dynamic"

const DynamicMarkdownRenderer = dynamic(() => import("./index"), {
  ssr: true,
  loading: () => <div>Loading...</div>,
})

export default DynamicMarkdownRenderer
