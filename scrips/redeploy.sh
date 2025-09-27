#!/bin/bash

# Dán URL Deploy Hook của bạn vào đây
HOOK_URL="https://api.vercel.com/v1/integrations/deploy/prj_HUDgAGT3dZS03gYYibqw0DgmqyRq/0IK6NDWCp1"

echo "🚀 Kích hoạt redeploy trên Vercel..."

# Gửi yêu cầu POST tới hook URL để kích hoạt build
curl -X POST "$HOOK_URL"

echo "✅ Yêu cầu đã được gửi. Vercel đang bắt đầu quá trình build mới."