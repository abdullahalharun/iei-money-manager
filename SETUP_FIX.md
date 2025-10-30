# Setup Fix Summary

## Issue
The `make setup` command was failing because Prisma couldn't find the `.env` file. Prisma looks for `.env` files in the directory where the schema is located (`apps/api`), but we only had `.env` in the root directory.

## Solution
Created a symlink from `apps/api/.env` → `../../.env` so that Prisma can find the environment variables.

## Changes Made

1. **Updated `scripts/setup.sh`**: Added step to create `.env` symlink in `apps/api`
2. **Updated `.gitignore`**: Added `apps/*/.env` to ignore symlinks in subdirectories
3. **Fixed script directory handling**: Used `$SCRIPT_DIR` variable to ensure proper directory navigation

## Verification

✅ Database migrations run successfully
✅ Database seeded with sample data  
✅ Prisma Client generated correctly
✅ `.env` file is being loaded by Prisma

## To Use

Now you can run:

```bash
make setup
# or
./scripts/setup.sh
```

This will:
1. Create `.env` from `env.example`
2. Create symlink in `apps/api/.env`
3. Start PostgreSQL
4. Install dependencies
5. Run migrations
6. Seed database

## Next Steps

Start the development servers:

```bash
pnpm dev
```

Or use:

```bash
make dev
```

API will be available at http://localhost:4000

