#!/bin/bash

# Script tạo bài viết mới cho blog markdown
# Usage: ./new-post.sh [title]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR=$(cd "$(dirname "$0")" &>/dev/null && pwd)
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")

POSTS_DIR="$PROJECT_ROOT/content/posts"
DEFAULT_CATEGORY="Tutorial"
DEFAULT_STATUS="Public"
DEFAULT_TYPE="Post"

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to create slug from title
create_slug() {
    local title="$1"
    echo "$title" | \
        iconv -t ascii//TRANSLIT 2>/dev/null | \
        sed 's/[^a-zA-Z0-9]/-/g' | \
        sed 's/--*/-/g' | \
        sed 's/^-\|-$//g' | \
        tr '[:upper:]' '[:lower:]'
}

# Function to format tags
format_tags() {
    local tags="$1"
    if [[ -z "$tags" ]]; then
        echo '[]'
    else
        # Split by comma, trim spaces, and format as JSON array
        echo "$tags" | sed 's/,/\n/g' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | \
        awk '{printf "\"%s\",", $0}' | sed 's/,$//' | \
        awk '{printf "[%s]", $0}'
    fi
}

# Function to validate input
validate_title() {
    local title="$1"
    if [[ -z "$title" ]]; then
        log_error "Tiêu đề không được để trống!"
        return 1
    fi
    if [[ ${#title} -lt 5 ]]; then
        log_warning "Tiêu đề hơi ngắn (< 5 ký tự)"
    fi
    return 0
}

# Function to check if file exists
check_file_exists() {
    local filepath="$1"
    if [[ -f "$filepath" ]]; then
        log_error "File đã tồn tại: $filepath"
        read -p "Bạn có muốn ghi đè? (y/N): " overwrite
        if [[ ! "$overwrite" =~ ^[Yy]$ ]]; then
            log_info "Hủy tạo bài viết."
            exit 1
        fi
    fi
}

# Main function
main() {
    log_info "📝 Bắt đầu tạo bài viết mới..."
    echo

    # Create posts directory if it doesn't exist
    mkdir -p "$POSTS_DIR"

    # Get title from command line argument or prompt
    if [[ -n "$1" ]]; then
        title="$1"
        log_info "Sử dụng tiêu đề từ command line: $title"
    else
        read -p "📝 Nhập tiêu đề bài viết: " title
    fi

    # Validate title
    validate_title "$title" || exit 1

    # Create slug
    slug=$(create_slug "$title")
    log_info "Slug được tạo: $slug"

    # Get other information
    read -p "📄 Nhập tóm tắt (summary): " summary
    read -p "🏷️  Nhập các thẻ (tags), cách nhau bằng dấu phẩy: " tags
    read -p "📂 Nhập chuyên mục (category) [Mặc định: $DEFAULT_CATEGORY]: " category
    read -p "🔒 Nhập trạng thái (status) [Mặc định: $DEFAULT_STATUS]: " status

    # Use default values if empty
    category="${category:-$DEFAULT_CATEGORY}"
    status="${status:-$DEFAULT_STATUS}"

    # Format tags
    formatted_tags=$(format_tags "$tags")

    # Get current date
    current_date=$(date +%Y-%m-%d)

    # Create file path
    file_path="$POSTS_DIR/${slug}.md"

    # Check if file exists
    check_file_exists "$file_path"

    # Create the markdown file
    cat > "$file_path" << EOF
---
title: "$title"
date: "$current_date"
summary: "$summary"
tags: $formatted_tags
category: "$category"
status: "$status"
type: "$DEFAULT_TYPE"
---

# $title

## Giới thiệu

Viết nội dung giới thiệu ở đây...

## Nội dung chính

### Phần 1

Nội dung phần 1...

### Phần 2

Nội dung phần 2...

## Kết luận

Tóm tắt và kết luận...

---

**Tags:** $(echo "$tags" | sed 's/,/, /g')  
**Danh mục:** $category  
**Ngày tạo:** $current_date
EOF

    # Success message
    echo
    log_success "Đã tạo thành công bài viết!"
    log_info "📍 Đường dẫn: $file_path"
    log_info "🔗 URL slug: /$slug"
    echo

    # Show file info
    log_info "📊 Thông tin file:"
    echo "   • Tiêu đề: $title"
    echo "   • Slug: $slug"
    echo "   • Ngày: $current_date"
    echo "   • Danh mục: $category"
    echo "   • Tags: $tags"
    echo "   • Trạng thái: $status"
    echo

    # Ask to open file
    read -p "🚀 Bạn có muốn mở file để chỉnh sửa? (Y/n): " open_file
    if [[ "$open_file" =~ ^[Yy]$|^$ ]]; then
        # Try different editors
        if command -v code >/dev/null 2>&1; then
            code "$file_path"
        elif command -v nano >/dev/null 2>&1; then
            nano "$file_path"
        elif command -v vim >/dev/null 2>&1; then
            vim "$file_path"
        else
            log_warning "Không tìm thấy editor. Vui lòng mở file thủ công: $file_path"
        fi
    fi

    # Show next steps
    echo
    log_info "🎯 Các bước tiếp theo:"
    echo "   1. Chỉnh sửa nội dung bài viết"
    echo "   2. Chạy 'npm run dev' để xem preview"
    echo "   3. Chạy 'make deploy' để đăng lên blog"
}

# Show help
show_help() {
    echo "Script tạo bài viết mới cho blog markdown"
    echo
    echo "Cách sử dụng:"
    echo "  $0 [title]           Tạo bài viết với tiêu đề"
    echo "  $0 -h, --help       Hiển thị hướng dẫn"
    echo
    echo "Ví dụ:"
    echo "  $0 \"Hướng dẫn Docker\""
    echo "  $0"
    echo
    echo "Cấu trúc thư mục:"
    echo "  $POSTS_DIR/slug.md"
    echo
}

# Handle command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac