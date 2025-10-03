---
title: "Proxy Server"
date: "2025-10-03"
summary: ""
tags: ["DevOps"]
category: "DevOps"
status: "Public"
type: "Post"
---

# Proxy Server

## Nội dung chính

Proxy có nhiệm vụ chuyển tiếp và kiểm soát thông tin giữa client và server phía back end  
Proxy gồm 1 IP và 1 port để truy cập cố định

### Forward Proxy

- Là proxy server được dùng phía clinent

- Luồng hoạt động như sau: Client -> Forward Proxy -> Internet

- Tác dụng:
  - Ẩn địa chỉ IP của Client trước khi truy cập vào Internet
  - Truy cập vào các nội dung bị chặn bởi công ty, chính phủ
  - Dùng làm catching server để tăng tốc độ

### Reverse Proxy

- Là proxy dùng phía server tức là request sau khi đi qua Internet sẽ đi qua Reverse Proxy định hướng tiếp đi về server backend nào
- Tác dụng
  - Load balancing: giúp điều phối requests tới các servers backend để cân bằng tải, ngoài ra nó còn giúp hệ thống đạt tính sẵn sàng cao khi lỡ không may có server bị ngỏm thì nó sẽ chuyển request tới một server còn sống để thực thi.
  - Increased Security: Reverse Proxy còn đóng vai trò là một lớp bảo vệ cho các servers backend. Nó giúp cho chúng ta có thể ẩn đi địa chỉ và cấu trúc thực của server backend.
  - Logging: Tất cả các requests tới các servers backend đều phải đi qua reverse proxy nên việc quản lý log của access tới từng server và endpoint sẽ dễ dàng hơn rất nhiều so với việc kiểm tra trên từng server một.
  - Encrypted Connection: Bằng việc mã hóa kết nối giữa client và reverse proxy với TLS, users sẽ được hưởng lợi từ việc mã hóa dữ liệu và bảo mật với HTTPS.

### Catching server

### Firewall

### Load Balancer

## Kết luận

Tóm tắt và kết luận...
