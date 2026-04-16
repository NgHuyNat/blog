---
title: "Nvim Tutorial"
date: "2026-04-16"
summary: ""
tags: []
category: "Tutorial"
status: "Public"
type: "Post"
---

# Hướng Dẫn Sử Dụng Neovim (Cấu hình LazyVim)

Chào bạn! Dựa trên cấu hình trong máy của bạn, mình thấy bạn đang sử dụng **LazyVim** - một bản phân phối Neovim rất mạnh mẽ và đã được cấu hình sẵn nhiều tính năng hữu ích. Dưới đây là hướng dẫn từ cơ bản đến nâng cao, cũng như các phím tắt được thiết lập riêng cho cấu hình của bạn.

---

## 1. Các Chế Độ Cơ Bản (Modes)

Trong Vim/Neovim, bạn luôn làm việc trong các chế độ khác nhau. Việc hiểu rõ các chế độ này là cốt lõi để sử dụng Neovim:

*   **Normal Mode (`Esc`)**: Chế độ mặc định dùng để di chuyển, thực thi lệnh, copy/paste. Bạn không thể gõ văn bản trực tiếp ở đây.
*   **Insert Mode (`i`, `a`, `o`, ...)**: Chế độ soạn thảo văn bản (như các edior thông thường như VSCode, Word).
*   **Visual Mode (`v` hoặc `V`)**: Chế độ bôi đen (chọn) văn bản để copy, xóa, hoặc định dạng.
*   **Command Mode (`:`)**: Gõ các câu lệnh ở góc dưới cùng màn hình (VD: `:w` để lưu, `:q` để thoát).

> [!TIP] 
> Phím quan trọng nhất: **Leader Key**. Trong LazyVim, phím Leader mặc định là **Phím `Space` (Dấu cách)**. Các tổ hợp phím mạnh mẽ nhất đều bắt đầu bằng phím `Space`.

---

## 2. Di Chuyển Chuẩn (Ở Normal Mode)

Thay vì dùng phím mũi tên, bạn nên làm quen với các phím sau để tay không phải rời khỏi khu vực trung tâm bàn phím:

*   `h`: Trái
*   `j`: Xuống
*   `k`: Lên
*   `l`: Phải
*   `w`: Tiến tới đầu từ tiếp theo.
*   `b`: Lùi về đầu từ trước đó.
*   `0`: Về đầu dòng.
*   `$`: Tới cuối dòng.
*   `gg`: Về đầu file.
*   `G`: Tới cuối file.
*   `Ctrl + u`: Cuộn lên nửa trang.
*   `Ctrl + d`: Cuộn xuống nửa trang.

---

## 3. Chỉnh Sửa Cơ Bản

**Chuyển sang Insert Mode (soạn thảo):**
*   `i`: Chèn (soạn thảo) ngay trước con trỏ hiện tại.
*   `I`: Chèn ở đầu dòng.
*   `a`: Chèn ngay sau con trỏ hiện tại.
*   `A`: Chèn ở cuối dòng.
*   `o`: Mở một dòng mới bên dưới dòng hiện tại và soạn thảo.
*   `O`: Mở một dòng mới bên trên dòng hiện tại và soạn thảo.

**Xóa và Copy (Ở Normal Mode):**
*   `x`: Xóa ký tự tại vị trí con trỏ.
*   `dd`: Xóa (Cắt) cả dòng hiện tại.
*   `yy`: Copy cả dòng hiện tại.
*   `p`: Dán (Paste) nội dung vừa copy/cắt vào dưới con trỏ.
*   `u`: Undo (Hủy thao tác vừa làm).
*   `Ctrl + r`: Redo (Làm lại thao tác vừa Undo).

---

## 4. Các Phím Tắt Của LazyVim (Leader Key = `Space`)

Đây là nơi sức mạnh của LazyVim tỏa sáng. Nhớ rằng `<leader>` nghĩa là ấn phím **Space**.

### 📁 Quản lý File và Tìm kiếm (Telescope)
*   `<leader> e`: Mở File Explorer (Neo-tree) ở bên trái.
*   `<leader> f f`: Tìm kiếm file trong thư mục hiện tại.
*   `<leader> s g`: Tìm kiếm đoạn chữ/text (Grep) trong toàn bộ dự án.
*   `<leader> f r`: Tìm lại các file vừa mở gần đây.

### 📝 Quản lý Buffer (Các tab đang mở)
*   `Shift + h` / `Shift + l`: Chuyển qua lại giữa các tab (Buffer) đang mở.
*   `<leader> b d`: Đóng tab (Buffer) hiện tại.

### 🪟 Quản lý Cửa sổ (Windows/Splits)
*   `<leader> |`: Chia đôi màn hình theo chiều dọc.
*   `<leader> -`: Chia đôi màn hình theo chiều ngang.
*   `Ctrl + h/j/k/l`: Di chuyển con trỏ giữa các cửa sổ đã chia.
*   `<leader> w d`: Đóng cửa sổ hiện tại.

### 🛠️ Code, Terraform và LSP
LazyVim đã tích hợp sẵn tính năng gợi ý và sửa lỗi code. Khi bạn mở file `main.tf` hay `outputs.tf`:
*   `gd`: Đi đến nơi khai báo (Go to definition) của biến/resource.
*   `gr`: Tìm tất cả các chỗ sử dụng hàm/biến này (References).
*   `K`: Xem tài liệu/thông tin (Hover tooltip) của hàm/biến.
*   `<leader> c a`: Chạy các hành động tối ưu code (Code Actions).
*   `<leader> c f`: Format code (căn chỉnh lại code cho đẹp).

---

## 5. Phím Tắt Tự Chế Của Bạn (Dành Riêng Cho Markdown)

Mình đã kiểm tra cấu hình cá nhân của bạn trong file `lua/config/keymaps.lua`. Bạn đã thiết lập một bảng phím tắt tuyệt vời dành riêng để viết file Markdown (ví dụ file `README.md`):

### Bật / Tắt hiệu ứng Markdown
*   `<leader> u m`: Bật/Tắt tính năng Render Markdown (giúp hiển thị markdown đẹp mắt ngay trong vim).

### Ở Chế Độ Normal (Trong file Markdown)
Đứng yên ở chế độ Normal và gõ phím `<leader>` (Space) cùng các phím sau:
*   `<leader> m 1` đến `<leader> m 6`: Tự chèn tiêu đề H1 (#) đến H6 (######) vào đầu dòng.
*   `<leader> m h`: Chèn một đường kẻ ngang (Horizontal Rule).
*   `<leader> m C`: Chèn ngay một khối Code (Code Block).
*   `<leader> m -`: Chèn dấu tickbox trống `- [ ]`.
*   `<leader> m x`: Đánh dấu tích (hoặc bỏ tích) cho tickbox hiện tại.

### Ở Chế Độ Visual (Bôi Đen Chữ Trong Markdown)
Hãy dùng `v` (để bôi đen chữ mong muốn), sau đó nhấn `<leader>` (Space) + phím:
*   `<leader> m b`: **In đậm** chữ (Bold).
*   `<leader> m i`: *In nghiêng* chữ (Italic).
*   `<leader> m c`: Chuyển thành `Code Inline`.
*   `<leader> m s`: ~~Gạch ngang~~ chữ (Strikethrough).
*   `<leader> m l`: Biến chữ được chọn thành một [Link]().

---

> [!NOTE]
> Bạn luôn có thể lưu bài viết bằng cách nhấn `Esc` rồi gõ `:w` (Enter), hoặc nếu dùng LazyVim thì nhấn nhanh `Ctrl + s`. Nếu muốn tắt màn hình hiện tại, hãy gõ `:q`!

Hy vọng tài liệu này sẽ giúp bạn dễ dàng làm chủ sự kì diệu của Neovim! Nếu bạn cần tìm hiểu thêm sâu về bất kỳ tính năng gì (như Git, Telescope hay tự chỉnh phím mới), cứ thoái mái hỏi nhé!


---

**Tags:**   
**Danh mục:** Tutorial  
**Ngày tạo:** 2026-04-16
