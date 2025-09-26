import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { PostMeta } from "./getPosts"

export interface PostContent extends PostMeta {
  content: string
}

const postsDirectory = path.join(process.cwd(), "content/posts")

export async function getPost(slug: string): Promise<PostContent | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)

    let filePath: string
    if (fs.existsSync(fullPath)) {
      filePath = fullPath
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else {
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    const post: PostContent = {
      id: slug,
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      summary: data.summary || data.description || "",
      tags: data.tags || [],
      category: data.category ? [data.category] : ["Post"],
      thumbnail: data.thumbnail || data.image || "",
      status: (data.status as PostMeta["status"]) || "Public",
      type: data.type ? [data.type] : ["Post"],
      createdTime: data.createdTime || data.date || new Date().toISOString(),
      updatedTime: data.updatedTime || data.date || new Date().toISOString(),
      content,
    }

    return post
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}
