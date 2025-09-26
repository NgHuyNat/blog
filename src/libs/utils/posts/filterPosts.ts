import { PostMeta } from "src/apis/posts/getPosts"

export interface FilterPostsOptions {
  acceptStatus?: string[]
  acceptType?: string[]
}

export const filterPosts = (
  posts: PostMeta[],
  options: FilterPostsOptions = {}
): PostMeta[] => {
  const { acceptStatus = ["Public"], acceptType = ["Post", "Page", "Paper"] } =
    options

  return posts.filter((post) => {
    const statusMatch = acceptStatus.includes(post.status)
    const typeMatch = post.type.some((type) => acceptType.includes(type))

    return statusMatch && typeMatch
  })
}
