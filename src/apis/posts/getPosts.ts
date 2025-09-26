import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostMeta {
  id: string
  slug: string
  title: string
  date: string
  summary?: string
  tags?: string[]
  category?: string[]
  thumbnail?: string
  status: "Public" | "Private" | "PublicOnDetail"
  type: string[]
  createdTime: string
  updatedTime: string
}

const postsDirectory = path.join(process.cwd(), "content/posts")

export async function getPosts(): Promise<PostMeta[]> {
  try {
    // Ensure posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data } = matter(fileContents)

        const post: PostMeta = {
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
          createdTime:
            data.createdTime || data.date || new Date().toISOString(),
          updatedTime:
            data.updatedTime || data.date || new Date().toISOString(),
        }

        return post
      })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}
