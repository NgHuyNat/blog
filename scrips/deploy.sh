#!/bin/bash
echo "🚀 Deploying to Vercel..."

# Validate markdown files
echo "🔍 Validating markdown files..."
for file in content/posts/*.md; do
    if hexdump -C "$file" | grep -q '00'; then
        echo "❌ Found null bytes in $file"
        exit 1
    fi
done

# Clean build
rm -rf .next out

# Test build
npm run build

# Deploy to Vercel
vercel --prod

echo "✅ Deployed to Vercel!"