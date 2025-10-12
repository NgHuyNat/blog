---
title: "Docker"
date: "2025-10-12"
summary: "Docker beginner"
tags: ["DevOps", "Docker"]
category: "DevOps"
status: "Public"
type: "Post"
---

# Docker

## Phân biệt image và container

- Image là một khuôn mẫu có sẵn bao gồm các thư viện, cấu hình, mã nguồn, hệ điều hành, lệnh khời chạy(CMD) định hình cho container

  - Chỉ đọc(Read-only), được build và lưu trữ,, đóng gói ứng dụng và môi trường của nó - giống như một class

- Container được tạo ra từ khuôn image và từ một image có thể tạo ra nhiều container

  - Có thể chỉnh sửa, chạy trên một khuôn mẫu(image), được tạo-chạy-dừng-xóa, chạy và cô lập ứng dụng, - tương tự như object

## Mount

### Mount cùng một volume

- Dùng docker quản lí trên một thư mục ổ đĩa "ảo" với cách này chúng ta phải stop và xóa container đi (docker rm ten_file) và build lại container mỗi khi file thay đổi
- Sử dụng lệnh docker run -d -p 8080:80 -v /duong_dan_toi_folder_can_chay:/duong_dan_toi_container --name ten_container ten_image
  - -d - chạy ở chế độ nền tách ra khỏi terminal, -p - chạy ở cổng nào, -v - viết tắt cho volume, --name - tên container
  - Ví dụ: docker run -d -p 8080:80 -v ~/DevOps/shared-app:/usr/share/nginx/html --name web1 nginx

### Mount bind

- Dùng thư mục thật trên host cho container, tự động thay đổi dữ liệu bên trong container khi dữ liệu trên máy host thay đổi
- docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html --name myweb nginx
  - /usr/share/nginx/html trong container sẽ trỏ đến thư mục hiện tại trên host

### Phần 1

Nội dung phần 1...

### Phần 2

Nội dung phần 2...

## Kết luận

Tóm tắt và kết luận...
