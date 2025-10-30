.PHONY: help setup install dev build db-up db-down db-migrate db-seed db-studio clean test lint typecheck format

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Run automated setup (install, db, migrate, seed)
	@echo "🚀 Setting up IEI Money Manager..."
	@./scripts/setup.sh

install: ## Install dependencies
	@echo "📦 Installing dependencies..."
	@pnpm install

dev: ## Start development servers
	@echo "🚀 Starting development servers..."
	@pnpm dev

build: ## Build for production
	@echo "🔨 Building for production..."
	@pnpm build

db-up: ## Start PostgreSQL database
	@echo "🐳 Starting PostgreSQL..."
	@cd infra && docker-compose up -d

db-down: ## Stop PostgreSQL database
	@echo "🛑 Stopping PostgreSQL..."
	@cd infra && docker-compose stop

db-migrate: ## Run database migrations
	@echo "🔄 Running migrations..."
	@cd apps/api && pnpm prisma migrate dev

db-seed: ## Seed database with sample data
	@echo "🌱 Seeding database..."
	@cd apps/api && pnpm db:seed

db-studio: ## Open Prisma Studio
	@echo "🎨 Opening Prisma Studio..."
	@cd apps/api && pnpm prisma:studio

db-reset: ## Reset database (development only)
	@echo "🔄 Resetting database..."
	@cd apps/api && pnpm prisma migrate reset

clean: ## Clean build artifacts and reinstall
	@echo "🧹 Cleaning..."
	@rm -rf node_modules .turbo dist .next
	@pnpm install

test: ## Run tests
	@echo "🧪 Running tests..."
	@pnpm test

lint: ## Run linter
	@echo "🔍 Running linter..."
	@pnpm lint

typecheck: ## Type check TypeScript
	@echo "✓ Type checking..."
	@pnpm typecheck

format: ## Format code with Prettier
	@echo "💅 Formatting code..."
	@pnpm format

start: dev ## Alias for dev

