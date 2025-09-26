// Export default as ClientOnly version to prevent hydration issues
export { default } from "./ClientOnly"

// Export original version if needed for specific use cases
export { default as MarkdownRendererSSR } from "./index"
