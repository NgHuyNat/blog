---
title: "Fast SSH to Raspberry Pi by Tailscale"
date: "2025-09-27"
summary: "Fast SSH to Raspberry Pi by Tailscale for System"
tags: ["Linux", "Tailscale", "SSH", "RaspberryPi"]
category: "Dev"
status: "Public"
type: "Post"
---

## I, Tạo tài khoản Tailscale

- Truy cập https://tailscale.com/ và đăng ký một tài khoản miễn phí (có thể dùng tài khoản Google, Microsoft, GitHub).

## II, Kết nối vào Pi trên local

- Chạy lệnh sau trong Terminal của Pi để cài đặt Tailscale:
  `curl -fsSL https://tailscale.com/install.sh | sh`
- Sau khi cài xong, chạy lệnh sau để kết nối Pi vào mạng của bạn:
  `sudo tailscale up`
- Lệnh này sẽ đưa ra một đường link. Hãy sao chép đường link đó, dán vào trình duyệt trên máy tính chính của bạn, đăng nhập và xác nhận để thêm Raspberry Pi vào mạng.

Khi hiện các dòng như ở dưới là thành công

`sudo tailscale up`

`To authenticate, visit:`

[`https://login.tailscale.com/a/18a29b......`](https://login.tailscale.com/a/18a29b84013c0f)

`Success.`

Lấy đường link vào trình duyệt để yêu cầu đăng nhập vào tài khoản Tailscale (tài khoản Google/Microsoft... mà bạn đã dùng để đăng ký

## III, Kết nối từ xa

- Mở lại trang quản trị Tailscale trên trình duyệt: https://login.tailscale.com/admin/machines
- Bạn sẽ thấy danh sách các máy của mình. Hãy tìm Raspberry Pi và **sao chép địa chỉ IP** của nó (sẽ có dạng **`100.x.x.x`**).
- Mở Terminal (hoặc PowerShell/CMD trên Windows) và dùng lệnh `ssh` với địa chỉ IP mới này:
  `ssh pi@<địa-chỉ-IP-của-Tailscale>`

## IV, Share với người khác

![image.png](attachment:baf0f77a-4c00-415c-bf5d-daced17f3da7:image.png)

Click vào Share và nhập email của người muốn share là sẽ được truy cập vào

Thanks!
