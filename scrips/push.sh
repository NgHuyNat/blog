#!/bin/bash

# Kiểm tra xem người dùng có nhập lời nhắn commit không
if [ -z "$1" ]; then
  echo "❌ Lỗi: Vui lòng nhập lời nhắn commit."
  echo "Cách dùng: ./push.sh \"Lời nhắn của bạn\""
  exit 1
fi

# Chạy các lệnh git
cd ..

echo "=> 1/3: Thêm tất cả các thay đổi..."
git add .

echo "=> 2/3: Tạo commit với lời nhắn: update"
git commit -m "update"

echo "=> 3/3: Đẩy code lên nhánh main..."
git push -u origin main

echo "✅ Hoàn tất!"