#!/bin/bash
set -e

echo "🚀 Starting IEI Money Manager..."

# Get the script directory (root of project)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

# Check if .env exists
if [ ! -f .env ]; then
  echo "❌ .env file not found. Please run './scripts/setup.sh' first."
  exit 1
fi

# Check if Docker is running and database is up
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker."
  exit 1
fi

if ! docker ps | grep -q "iei_money_manager"; then
  echo "🐳 Starting PostgreSQL database..."
  cd infra && docker-compose up -d && cd "$SCRIPT_DIR"
  sleep 5
fi

echo "✅ Starting development servers..."
pnpm dev

