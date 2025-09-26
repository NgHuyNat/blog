---
title: "Next.js và Static Site Generation"
date: "2024-01-17"
summary: "Tìm hiểu về Static Site Generation (SSG) trong Next.js và cách nó giúp tối ưu performance cho blog."
tags: ["nextjs", "ssg", "performance", "web-development"]
category: "Development"
status: "Public"
type: "Post"
---

# Next.js và Static Site Generation

Static Site Generation (SSG) là một trong những tính năng mạnh mẽ nhất của Next.js, đặc biệt phù hợp cho các website như blog.

## SSG là gì?

SSG là quá trình tạo ra các file HTML tĩnh tại thời điểm build time, thay vì tạo ra khi user request (server-side rendering) hay tại client (client-side rendering).

### Ưu điểm của SSG

1. **Performance tuyệt vời**: File HTML đã được pre-render sẵn
2. **SEO-friendly**: Content có sẵn ngay khi crawler truy cập
3. **Chi phí hosting thấp**: Có thể host trên CDN
4. **Security**: Không có server logic exposed

## Cách hoạt động trong Next.js

### getStaticProps

```javascript
export async function getStaticProps() {
  const posts = await getPosts()

  return {
    props: {
      posts,
    },
    revalidate: 3600, // ISR - regenerate every hour
  }
}
```

### getStaticPaths

```javascript
export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
```

## Incremental Static Regeneration (ISR)

ISR cho phép bạn update static content mà không cần rebuild toàn bộ site:

```javascript
return {
  props: { posts },
  revalidate: 60, // Revalidate at most once per minute
}
```

## Khi nào nên dùng SSG?

- **Blog/CMS**: Content không thay đổi thường xuyên
- **E-commerce**: Product pages
- **Documentation**: Technical docs
- **Marketing pages**: Landing pages

## Performance Benefits

Với SSG, blog của chúng ta có thể đạt được:

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+ điểm

## Code Example: Blog với SSG

```typescript
// pages/[slug].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.slug as string)

  if (!post) {
    return { notFound: true }
  }

  return {
    props: { post },
    revalidate: 3600,
  }
}
```

## Kết luận

SSG là lựa chọn tuyệt vời cho blog vì:

- Load nhanh
- SEO tốt
- Cost-effective
- Developer experience tốt

Kết hợp với markdown files, chúng ta có một solution hoàn hảo cho blog cá nhân! 🚀
