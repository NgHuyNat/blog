---
title: "Install UbuntuServer Error"
date: "2025-11-18"
summary: ""
tags: ["Ubuntu", "Server"]
category: "Server"
status: "Public"
type: "Post"
---

# Install UbuntuServer Error

## Giới thiệu

Mình đã gặp lỗi khi cố tải UbuntuServer mà nó cứ báo lỗi như ảnh dưới

![Error](/images/posts/install-ubuntuserver-error/error.png)

![Error](/images/posts/install-ubuntuserver-error/image.png)

Lỗi này nguyên nhân là do ổ bị khóa như ảnh trên

## Cách fix

Dùng LiveUSB tải GParted về (dùng Rufus để cài ISO)  
Tất cả các ổ không có biểu tượng chìa khóa giống ảnh bên trên thì sẽ rất dễ để format nhưng riêng với ổ bị khóa phải dùng lệnh sau

```bash
sudo swapoff -a

sudo swapoff -a
```

Sau đó vào menu Device → Create Partition Table → Chọn “gpt”, sau đó nhấn “Apply” để xóa sạch mọi metadata cũ

**Tags:**  
**Danh mục:** Tutorial  
**Ngày tạo:** 2025-11-18
