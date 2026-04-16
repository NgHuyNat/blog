---
title: "Tmux Tutorial"
date: "2026-04-16"
summary: ""
tags: []
category: "Tutorial"
status: "Public"
type: "Post"
---

# Hướng Dẫn Sử Dụng Tmux (Theo cấu hình của bạn)
---

## 1. Phím Prefix (Chìa Khóa Cốt Lõi)
Tmux hoạt động dựa trên một phím kích hoạt gọi là `Prefix`. Bạn đã đổi nó trong cấu hình của mình:
*   Mặc định của Tmux: `Ctrl + b`
*   **Cấu hình của bạn**: `Ctrl + a` (giống như lệnh `screen`, rất dễ bấm)

> [!IMPORTANT]
> Trong suốt hướng dẫn này, khi ghi **Prefix**, bạn hãy hiểu là nhấn và nhả `Ctrl + a` trước khi ấn phím tiếp theo. (Ví dụ: `Prefix` + `c` nghĩa là ấn `Ctrl + a`, nhả tay ra, rồi ấn `c`).

---

## 2. Quản Lý Session (Phiên Làm Việc)

Session giúp bạn nhóm nhiều cửa sổ làm việc lại với nhau, khi tắt Terminal (hoặc tắt máy) bạn có thể giữ nguyên trạng thái nếu dùng Plugin phục hồi.

**Từ ngoài Terminal (chưa vào Tmux):**
*   `tmux new -s ten_session`: Tạo một Session mới có tên.
*   `tmux ls`: Liệt kê các Session đang chạy.
*   `tmux a -t ten_session`: Mở lại (Attach) Session đã tồn tại.

**Khi đang ở trong Tmux:**
*   `Prefix` + `d`: Thoát ra ngoài (Detach) nhưng vẫn để Session chạy ngầm.
*   `Prefix` + `s`: Hiển thị danh sách các Session để chọn và di chuyển.
*   `Prefix` + `$`: Đổi tên Session hiện tại.

> [!TIP]
> **Tmux Resurrect & Continuum (Cấu hình của bạn):**
> Bạn đã bật tự động lưu session!
> - Phiên làm việc của bạn sẽ được tự động lưu lại ngầm sau mỗi 15 phút (nhờ tmux-continuum).
> - Để chủ động **Lưu** ngay trạng thái: Bấm `Prefix` + `Ctrl + s`.
> - Để chủ động **Phục hồi**: Bấm `Prefix` + `Ctrl + r`.

---

## 3. Quản Lý Windows (Giống như các Tab)

Trong cấu hình của bạn, **số thứ tự Window đã được bắt đầu từ 1 (thay vì 0)**. Điều này giúp thao tác chọn Tab nhanh chóng bằng dãy phím số phía trên.

*   `Prefix` + `c`: Tạo Window mới.
*   `Prefix` + `1`, `2`, `3`...: Chuyển nhanh giữa các Window.
*   `Prefix` + `n`: Chuyển sang Window tiếp theo.
*   `Prefix` + `p`: Chuyển sang Window trước đó.
*   `Prefix` + `,`: Đổi tên Window hiện hành chữ ngắn gọn dễ nhớ.
*   `Prefix` + `&`: Đóng (Xóa) Window hiện tại.

---

## 4. Quản Lý Panes (Chia Cửa Sổ)

Tính năng chia nhỏ cửa sổ terminal cho phép bạn chạy nhiều thứ một lúc (ví dụ: một bên chạy neovim, một bên chạy log server).
> [!NOTE] Cấu Hình Chuột Của Bạn
> Do bạn đã bật tính năng **Hỗ trợ Chuột** (`set -g mouse on`), thao tác quản lý pane đã cực kỳ sung sướng:
> - **Chuyển Pane:** Chỉ cần **click chuột** vào vùng Pane muốn làm việc.
> - **Đổi Kích Thước:** Cầm chuột di chuyển vào đường viền để **kéo thả** thay đổi chiều rộng / chiều cao.
> - **Cuộn Trang:** Bạn cứ cuộn con trỏ chuột là màn hình trượt bình thường, thả text sao chép y hệt Terminal Native.

**Bạn vẫn có thể dùng phím tắt nếu thích kiểu "Pro":**
*   `Prefix` + `%`: Chia màn hình theo **chiều dọc** (Trái/Phải).
*   `Prefix` + `"`: Chia màn hình theo **chiều ngang** (Trên/Dưới).
*   `Prefix` + phím `Mũi tên`: Chuyển con trỏ sang Pane lân cận.
*   `Prefix` + `x`: Đóng Pane hiện hành (Nó sẽ hỏi y/n).
*   `Prefix` + `z`: Phóng to (Zoom) Pane hiện tại ra toàn màn hình (ấn lại để thu nhỏ lại như cũ).
*   `Prefix` + `Space`: Tự động thay đổi các mô hình chia Pane khác nhau.

---

## 5. Quản Lý Plugin (Sử dụng TPM)

File cấu hình của bạn đã cài đặt TPM (Tmux Plugin Manager). Nếu bạn mới khởi động Tmux lần đầu, dưới đây là cách bắt TPM tải cấu hình về:

1. Chắc chắn bạn đã clone repo của TPM: 
   `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`
2. **Cài Đặt Plugin**: Sau khi cập nhật file `.tmux.conf`, bạn mở Tmux và gõ: 
   **`Prefix` + `I` (Chữ "I" viết HOA - tức là `Shift` + `i`)** để cài đặt.
3. **Cập Nhật Plugin**: Nhấm **`Prefix` + `U` (Chữ "U" viết HOA)**.
4. **Xóa Plugin (sau khi xóa lệnh khỏi `.tmux.conf`)**: Nhấn **`Prefix` + `Alt` + `u`**.
5. **Reload Cấu hình nhanh**: Dù chưa thiết lập phím tắt nhưng bạn có thể dùng lệnh thủ công sau khi chỉnh cài đặt: `Prefix` + `:`, sau đó gõ `source-file ~/.tmux.conf` và bấm `Enter`.

*(Giao diện Dracula tuyệt đẹp kèm theo zsh làm vỏ shell mặc định sẽ được cập nhật tự động sau bước ấn `Prefix + I`).*
Chúc bạn quản lý Terminal của mình hiệu quả với tmux!


---

**Tags:**   
**Danh mục:** Tutorial  
**Ngày tạo:** 2026-04-16
