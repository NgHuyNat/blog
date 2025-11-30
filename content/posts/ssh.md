---
title: "Hướng dẫn toàn tập về SSH Key: Git, Multiple Accounts & Server Security"
date: "2025-11-30"
summary: "Hướng dẫn chi tiết cách tạo và quản lý SSH Key cho Git (GitHub, GitLab), cấu hình nhiều tài khoản và bảo mật Server/VPS."
tags: ["SSH", "Git", "DevOps", "Security"]
category: "DevOps"
status: "Public"
type: "Post"
---

# Hướng dẫn toàn tập về SSH Key

Trong quá trình làm việc với Git (GitHub, GitLab) hay quản trị Server (VPS), việc sử dụng **SSH Key** là tiêu chuẩn bắt buộc để đảm bảo bảo mật và sự tiện lợi. Bài viết này sẽ hướng dẫn bạn từ cơ bản đến nâng cao: tạo key, cấu hình nhiều tài khoản (ví dụ: tài khoản cá nhân và công ty trên cùng một máy), và bảo mật Server để không cần nhập mật khẩu.

## 1. Tại sao nên dùng SSH Key?

- **Bảo mật hơn**: SSH Key khó bị tấn công brute-force hơn mật khẩu truyền thống.
- **Tiện lợi**: Không cần nhập username/password mỗi lần push code hay login vào server.
- **Quản lý dễ dàng**: Có thể thu hồi quyền truy cập bằng cách xóa public key mà không cần đổi mật khẩu.

## 2. Tạo SSH Key (Chuẩn Ed25519)

Hiện nay, thuật toán **Ed25519** được khuyên dùng thay thế cho RSA vì nó an toàn hơn và nhanh hơn.

Mở terminal (hoặc Git Bash trên Windows) và chạy lệnh sau:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- `-t ed25519`: Chọn thuật toán Ed25519.
- `-C "..."`: Comment để định danh key (thường dùng email).

Hệ thống sẽ hỏi nơi lưu file. Mặc định là `~/.ssh/id_ed25519`.
- Nếu bạn chỉ dùng 1 key duy nhất: Nhấn Enter.
- Nếu bạn muốn tạo key riêng cho công ty (để tách biệt): Nhập đường dẫn mới, ví dụ: `/home/user/.ssh/id_ed25519_company`.

Sau đó, bạn có thể đặt **passphrase** (mật khẩu cho key) để tăng bảo mật, hoặc để trống nếu muốn login nhanh.

## 3. Cấu hình cho Git (GitHub, GitLab)

### Bước 1: Lấy nội dung Public Key

Chạy lệnh sau để xem và copy public key:

```bash
cat ~/.ssh/id_ed25519.pub
# Hoặc key công ty
cat ~/.ssh/id_ed25519_company.pub
```

Kết quả sẽ bắt đầu bằng `ssh-ed25519 ...`. Hãy copy toàn bộ chuỗi này.

### Bước 2: Thêm vào GitHub/GitLab

- **GitHub**: Vào Settings -> SSH and GPG keys -> New SSH key.
- **GitLab**: Vào Preferences -> SSH Keys -> Add new key.

Dán nội dung vừa copy vào và lưu lại.

### Bước 3: Kiểm tra kết nối

```bash
ssh -T git@github.com
# Hoặc
ssh -T git@gitlab.com
```

Nếu thấy thông báo `Hi username! You've successfully authenticated...` là thành công.

## 4. Cấu hình nâng cao: Nhiều tài khoản (Personal vs Company)

Đây là vấn đề nhiều người gặp phải: Làm sao để dùng tài khoản GitHub cá nhân cho dự án riêng và tài khoản GitHub công ty cho dự án công việc trên cùng một máy?

Giải pháp là sử dụng file `config` của SSH.

### Bước 1: Tạo file config

Tạo hoặc chỉnh sửa file `~/.ssh/config`:

```bash
nano ~/.ssh/config
```

### Bước 2: Thêm cấu hình

Giả sử bạn có 2 key:
1. `~/.ssh/id_ed25519` (Cá nhân)
2. `~/.ssh/id_ed25519_company` (Công ty)

Thêm nội dung sau vào file config:

```ssh
# Tài khoản Cá nhân (Mặc định)
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519

# Tài khoản Công ty (Custom Host)
Host github-company
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_company
```

### Bước 3: Sử dụng

- **Với dự án cá nhân**: Clone bình thường.
  ```bash
  git clone git@github.com:username/repo.git
  ```

- **Với dự án công ty**: Thay `github.com` bằng `github-company` (tên Host bạn đã đặt trong file config).
  ```bash
  git clone git@github-company:company-org/project.git
  ```

**Lưu ý**: Nếu dự án đã clone rồi, bạn có thể sửa remote url:
```bash
git remote set-url origin git@github-company:company-org/project.git
```

## 5. Bảo mật Server/VPS (SSH Hardening)

Để bảo mật VPS, chúng ta sẽ làm 2 việc:
1. Copy SSH Key lên server để login không cần mật khẩu.
2. Tắt chức năng đăng nhập bằng mật khẩu (Password Authentication) để chặn hacker brute-force.

### Bước 1: Copy SSH Key lên Server

Từ máy cá nhân của bạn, chạy lệnh:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519 root@ip-server-cua-ban
```

Nhập mật khẩu root lần cuối. Sau khi xong, thử login lại: `ssh root@ip-server`. Nếu vào thẳng được là thành công.

### Bước 2: Tắt đăng nhập bằng mật khẩu

SSH vào server, sau đó sửa file cấu hình SSH:

```bash
sudo nano /etc/ssh/sshd_config
```

Tìm và sửa các dòng sau (nếu chưa có thì thêm vào):

```ssh
# Tắt login bằng mật khẩu
PasswordAuthentication no

# Chỉ cho phép dùng Key
PubkeyAuthentication yes

# (Tùy chọn) Tắt login quyền root nếu bạn đã tạo user sudo riêng
# PermitRootLogin no
```

### Bước 3: Khởi động lại SSH service

```bash
sudo service ssh restart
# Hoặc
sudo systemctl restart sshd
```

**Quan trọng**: Đừng thoát phiên SSH hiện tại ngay. Hãy mở một terminal mới và thử login lại (`ssh root@ip-server`) để chắc chắn mọi thứ hoạt động. Nếu login được thì mới thoát phiên cũ.

---

## 6. Trường hợp ngược lại: Tạo Key trên Server và lấy về máy

Đôi khi bạn cần tạo key trên server (ví dụ: để server này truy cập vào GitHub/GitLab hoặc server khác) và bạn muốn lưu private key về máy cá nhân để backup hoặc sử dụng.

### Bước 1: Tạo Key trên Server

SSH vào server và chạy lệnh tạo key như bình thường:

```bash
ssh-keygen -t ed25519 -C "server-key" -f ~/.ssh/id_ed25519_server
```

### Bước 2: Lấy Private Key về máy cá nhân

Từ **máy cá nhân** của bạn (không phải trên server), sử dụng lệnh `scp` (Secure Copy) để tải file về:

```bash
# Cú pháp: scp user@ip-server:path-to-remote-file path-to-local-destination
scp root@ip-server:~/.ssh/id_ed25519_server ~/.ssh/
```

### Bước 3: Phân quyền và sử dụng

Sau khi tải về, bạn cần set quyền chỉ đọc cho chủ sở hữu (bắt buộc với SSH key):

```bash
chmod 600 ~/.ssh/id_ed25519_server
```

Bây giờ bạn có thể dùng key này để SSH vào server (nếu đã add public key vào `authorized_keys` của server) hoặc dùng cho các mục đích khác.

```bash
ssh -i ~/.ssh/id_ed25519_server root@ip-server
```

## Tổng kết

Với các bước trên, bạn đã thiết lập một môi trường làm việc chuyên nghiệp và bảo mật:
1. Sử dụng **Ed25519** key hiện đại.
2. Quản lý tách biệt code **Cá nhân** và **Công ty**.
3. Bảo vệ **Server/VPS** trước các cuộc tấn công dò mật khẩu.

Chúc các bạn thành công!
