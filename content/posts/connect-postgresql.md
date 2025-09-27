---
title: "Cách kết nối tới Postgresql
date: "2025-09-27"
summary: "Cách khởi động Database Postgresql"
tags: ["SQL", "Postgresql"]
category: "Tutorial"
status: "Public"
type: "Post"
---

# 1, Tải và cài đặt

```bash
sudo pacman -S postgresql
```

# 2, Khởi động

Nếu bị thiếu phần service của db với lỗi như sau

```bash
"/var/lib/postgres/data" is missing or empty.
```

Hãy chạy lệnh

```bash
sudo -iu postgres initdb --locale=vi_VN.UTF-8 -E UTF8 -D /var/lib/postgres/data
```

để tạo cấu trúc cho thư mục và các file cần thiết

- sudo -iu postgres: Chạy lệnh với tư cách là người dùng postgres
- initdb: Lệnh để khởi tạo cụm cơ sở dữ liệu.
- -locale=vi_VN.UTF-8: Thiết lập ngôn ngữ mặc định là tiếng Việt, tốt cho việc sắp xếp chuỗi tiếng Việt sau này.
  Sau đó chạy lệnh

```bash
sudo systemctl start postgresql

sudo systemctl enable postgresql
```
