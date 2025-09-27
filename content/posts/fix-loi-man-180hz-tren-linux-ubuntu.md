---
title: "Fix lỗi màn 180hz trên Linux(Ubuntu)"
date: "2025-09-27"
summary: ""
tags: ["Ubuntu", "Linux", "RefreshRate"]
category: "System"
status: "Public"
type: "Post"
---

## Hãy làm theo các bước sau để vô hiệu hóa HDMI DeepColor.

### 1. Mở file cấu hình GRUB

Mở Terminal và chạy lệnh sau để chỉnh sửa file cấu hình bộ khởi động (bootloader):

`sudo gedit /etc/default/grub`

_(Bạn có thể dùng `nano` nếu muốn, nhưng `gedit` dễ sử dụng hơn)._

### 2. Chỉnh sửa dòng cấu hình

Tìm dòng có nội dung tương tự như sau:
`GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"`

Thêm `nvidia-modeset.hdmi_deepcolor=0` vào cuối bên trong dấu ngoặc kép. Dòng đó sẽ trở thành:
`GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nvidia-modeset.hdmi_deepcolor=0"`

**Lưu ý:** Nếu đã có các tham số khác, chỉ cần thêm tham số mới này vào cuối, cách các tham số cũ một khoảng trắng.

### 3. Lưu file và thoát

Lưu file bạn vừa chỉnh sửa và đóng `gedit` lại.

### 4. Cập nhật GRUB

Chạy lệnh sau để áp dụng thay đổi vào bộ khởi động:

`sudo update-grub`

### 5. Khởi động lại máy tính

`sudo reboot`

Sau khi máy khởi động lại, hãy thử vào **Cài đặt > Màn hình** và chọn lại tần số 180Hz. Rất có khả năng nó sẽ hoạt động.
