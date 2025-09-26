.PHONY: setup dev build start new-post clean help

# Setup development environment
setup:
	npm install
	@echo "✅ Dependencies installed successfully!"
	@echo "📝 To create your first post, run: make new-post POST=your-post-name"

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Start production server (after build)
start:
	npm run start

# Create new blog post
# Usage: make new-post POST=my-awesome-post
new-post:
	@if [ -z "$(POST)" ]; then \
		echo "❌ Please provide post name: make new-post POST=your-post-name"; \
		exit 1; \
	fi
	@./new-post.sh $(POST)

# Clean build files and cache
clean:
	rm -rf .next out node_modules/.cache
	@echo "✅ Cleaned build files and cache"

# Install dependencies
install:
	npm install

# Lint code
lint:
	npm run lint

# Create deployment package
package:
	@echo "📦 Creating deployment package..."
	@rm -f blog-deploy.tar.gz
	@tar --exclude='node_modules' --exclude='.git' --exclude='.next' --exclude='out' --exclude='*.log' --exclude='.env*' --exclude='blog-deploy.tar.gz' -czf blog-deploy.tar.gz .
	@echo "✅ Package created: blog-deploy.tar.gz"

# Upload to Pi (requires PI_HOST environment variable or default)
upload:
	@if [ -z "$(PI_HOST)" ]; then \
		PI_HOST="nghuytan@100.80.153.127"; \
	fi; \
	echo "📡 Uploading to $$PI_HOST..."; \
	scp blog-deploy.tar.gz $$PI_HOST:~/blog/

# Build and package for deployment
deploy-prep: build package
	@echo "✅ Ready for deployment!"
	@echo "📝 Next steps:"
	@echo "  1. make upload (to transfer files)"
	@echo "  2. SSH to Pi and run deployment commands"
	@echo "  3. See DEPLOY_GUIDE.md for detailed instructions"

# Show help
help:
	@echo "📚 Available commands:"
	@echo ""
	@echo "  setup      - Install dependencies"
	@echo "  dev        - Start development server"
	@echo "  build      - Build for production"
	@echo "  start      - Start production server"
	@echo "  new-post   - Create new blog post (POST=post-name)"
	@echo "  clean      - Clean build files and cache"
	@echo "  lint       - Check code quality"
	@echo "  package    - Create deployment package"
	@echo "  upload     - Upload package to Pi (PI_HOST=user@host)"
	@echo "  deploy-prep- Build and package for deployment"
	@echo "  help       - Show this help"
	@echo ""
	@echo "📝 Examples:"
	@echo "  make setup"
	@echo "  make dev" 
	@echo "  make new-post POST=my-first-post"
	@echo "  make deploy-prep"
	@echo "  PI_HOST=user@your-pi make upload"
	@echo ""
	@echo "📖 See DEPLOY_GUIDE.md for deployment instructions"

