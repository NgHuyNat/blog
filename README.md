# Morethan Blog - Markdown Edition

Một blog tĩnh được xây dựng bằng Next.js và Markdown, không sử dụng backend hay API bên ngoài.

## ✨ Tính năng

- 📝 **Markdown Blog**: Viết bài bằng Markdown files
- ⚡ **Static Generation**: Tối ưu tốc độ với Next.js SSG
- 🎨 **Responsive Design**: Giao diện đẹp trên mọi thiết bị
- 🔍 **SEO Friendly**: Tối ưu cho công cụ tìm kiếm
- 🏷️ **Tags & Categories**: Phân loại bài viết dễ dàng
- 🌙 **Dark/Light Theme**: Chuyển đổi theme tự động
- 💬 **Comments**: Hỗ trợ Utterances comments
- 📊 **Analytics**: Tích hợp Google Analytics (tùy chọn)

## 🚀 Bắt đầu nhanh

### Cài đặt

```bash
# Clone repository
git clone https://github.com/your-username/morethan-log.git
cd morethan-log

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem blog.

### Viết bài đầu tiên

1. Tạo file mới trong `content/posts/`:

```bash
touch content/posts/bai-dau-tien.md
```

2. Thêm front matter và nội dung:

```markdown
---
title: "Bài viết đầu tiên của tôi"
date: "2024-01-20"
summary: "Đây là bài viết đầu tiên trên blog mới"
tags: ["hello-world", "first-post"]
category: "General"
status: "Public"
type: "Post"
---

# Xin chào!

Đây là bài viết đầu tiên trên blog Markdown của tôi.

## Tính năng tuyệt vời

- Viết bằng Markdown
- Không cần database
- Tốc độ cực nhanh
- SEO tối ưu

Happy blogging! 🎉
```

3. Lưu file và kiểm tra tại [http://localhost:3000](http://localhost:3000)

## 📚 Hướng dẫn chi tiết

Xem file [`BLOG_GUIDE.md`](./BLOG_GUIDE.md) để biết cách:

- Tạo và quản lý bài viết
- Sử dụng front matter
- Thêm hình ảnh
- Cú pháp Markdown nâng cao
- Best practices

## ⚙️ Cấu hình

### Site Configuration

Chỉnh sửa file `site.config.js`:

```javascript
const CONFIG = {
  // Thông tin cá nhân
  profile: {
    name: "Tên của bạn",
    image: "/avatar.svg",
    role: "Web Developer",
    bio: "Mô tả về bản thân",
    email: "email@example.com",
    linkedin: "username",
    github: "username",
  },

  // Cấu hình blog
  blog: {
    title: "Tên Blog",
    description: "Mô tả blog của bạn",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // Cấu hình chung
  link: "https://your-blog.vercel.app",
  since: 2024,
  lang: "vi-VN",
}
```

### Environment Variables (Tùy chọn)

Tạo file `.env.local`:

```bash
# Google Analytics
NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Utterances Comments
NEXT_PUBLIC_UTTERANCES_REPO=username/repository-name
```

## 📁 Cấu trúc thư mục

```
morethan-log/
├── content/posts/          # Bài viết Markdown
├── public/                 # Static files
│   ├── images/posts/      # Hình ảnh bài viết
│   └── avatar.svg         # Avatar
├── src/
│   ├── apis/              # API functions cho markdown
│   ├── components/        # React components
│   ├── pages/             # Next.js pages
│   ├── styles/            # Styles và themes
│   └── types/             # TypeScript types
├── site.config.js         # Cấu hình site
└── BLOG_GUIDE.md          # Hướng dẫn viết blog
```

## 🛠️ Development

```bash
# Development
npm run dev

# Build cho production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 📦 Deployment

### Vercel (Khuyên dùng)

1. Push code lên GitHub
2. Kết nối với [Vercel](https://vercel.com)
3. Deploy tự động khi push code

### Netlify

1. Build project: `npm run build`
2. Upload thư mục `out/` lên Netlify

### Manual Deployment

```bash
# Build static files
npm run build

# Deploy thư mục out/ lên hosting
```

## 🎨 Customization

### Themes

Chỉnh sửa colors trong `src/styles/`:

```typescript
// src/styles/colors.ts
export const colors = {
  light: {
    primary: "#0066cc",
    background: "#ffffff",
    // ...
  },
  dark: {
    primary: "#66b3ff",
    background: "#1a1a1a",
    // ...
  },
}
```

### Fonts

Thay đổi fonts trong `src/assets/fonts/`:

- Pretendard (Korean font) - đã có sẵn
- Thêm fonts khác bằng cách đặt file `.woff2` vào thư mục tương ứng

### Components

Customize các component trong `src/components/`:

- `MarkdownRenderer` - Render markdown content
- `PostCard` - Card hiển thị bài viết
- `Header` - Navigation header
- `Footer` - Site footer

## 🤝 Contributing

1. Fork project
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Emotion](https://emotion.sh/) - CSS-in-JS library
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown renderer
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Front matter parser

## � Deployment

### Deploy lên Raspberry Pi

1. **Chuẩn bị**: Xem hướng dẫn chi tiết trong [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

2. **Build và đóng gói**:

   ```bash
   make deploy-prep
   ```

3. **Upload lên Pi**:

   ```bash
   make upload
   # hoặc với custom host
   PI_HOST=user@your-pi-ip make upload
   ```

4. **Deploy trên Pi**: Làm theo hướng dẫn trong DEPLOY_GUIDE.md

### Deploy khác

- **Vercel**: `vercel --prod`
- **Netlify**: Connect GitHub repo
- **GitHub Pages**: Enable trong Settings > Pages

## �📞 Support

Nếu bạn có vấn đề hoặc câu hỏi:

1. Kiểm tra [BLOG_GUIDE.md](./BLOG_GUIDE.md) (viết bài)
2. Kiểm tra [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) (deployment)
3. Tạo [GitHub Issue](../../issues)
4. Liên hệ qua email trong `site.config.js`

---

**Made with ❤️ using Next.js & Markdown**
