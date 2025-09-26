---
title: "Hướng dẫn viết Markdown"
date: "2024-01-16"
summary: "Học cách sử dụng Markdown để viết blog một cách hiệu quả và chuyên nghiệp."
tags: ["markdown", "tutorial", "writing"]
category: "Tutorial"
status: "Public"
type: "Post"
---

# Hướng dẫn viết Markdown

Markdown là ngôn ngữ đánh dấu nhẹ cho phép bạn format text sử dụng syntax đơn giản.

## Cú pháp cơ bản

### Headers

```markdown
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

### Text Formatting

- **Bold text**: `**bold**` hoặc `__bold__`
- _Italic text_: `*italic*` hoặc `_italic_`
- ~~Strikethrough~~: `~~strikethrough~~`
- `Inline code`: `` `code` ``

### Lists

#### Unordered List

- Item 1
- Item 2
  - Sub item 2.1
  - Sub item 2.2

#### Ordered List

1. First item
2. Second item
3. Third item

### Links và Images

- **Link**: `[text](url)`
- **Image**: `![alt text](image-url)`

### Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Code Blocks

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

```css
.example {
  color: #333;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}
```

## Front Matter

Mỗi bài viết cần có front matter ở đầu file:

```yaml
---
title: "Tiêu đề bài viết"
date: "2024-01-16"
summary: "Mô tả ngắn"
tags: ["tag1", "tag2"]
category: "Category Name"
status: "Public"
type: "Post"
---
```

## Tips

1. Sử dụng **preview** để kiểm tra format
2. Giữ cho văn bản **đơn giản** và **rõ ràng**
3. Sử dụng **headings** để tổ chức nội dung
4. Thêm **tags** phù hợp để dễ tìm kiếm

Happy writing! ✍️
