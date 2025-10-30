#!/bin/bash
set -e

echo "🚀 Setting up IEI Money Manager..."

# Get the script directory (root of project)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

# Check if .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from env.example..."
  cp env.example .env
  echo "✅ .env file created. Please review and update if needed."
else
  echo "✓ .env file already exists"
fi

# Create symlink in apps/api so Prisma can find .env
if [ ! -f apps/api/.env ]; then
  echo "📝 Creating .env symlink in apps/api..."
  cd apps/api && ln -sf ../../.env .env && cd "$SCRIPT_DIR"
  echo "✅ .env symlink created in apps/api"
else
  echo "✓ .env symlink in apps/api already exists"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

echo "🐳 Starting PostgreSQL database..."
cd infra && docker-compose up -d && cd "$SCRIPT_DIR"

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

echo "📦 Installing dependencies..."
pnpm install

echo "🔄 Running database migrations..."
cd apps/api && pnpm prisma migrate dev && cd "$SCRIPT_DIR"

echo "🌱 Seeding database..."
cd apps/api && pnpm db:seed && cd "$SCRIPT_DIR"

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development servers:"
echo "  pnpm dev"
echo ""
echo "API will be available at: http://localhost:4000"
echo "Web app will be available at: http://localhost:3000"
echo ""
echo "To view the database:"
echo "  pnpm db:studio"
echo ""

