# IEI Money Manager

[![Apache License 2.0](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![CI](https://github.com/abdullahalharun/iei-money-manager/workflows/CI/badge.svg)](https://github.com/abdullahalharun/iei-money-manager/actions)

A powerful, self-hosted money management application for tracking income, expenses, and investments. Built with an open-core architecture to provide both a fully-featured open-source edition and a future cloud offering.

## Features

- **Income & Expense Tracking**: Categorize and track all your financial transactions
- **Account Management**: Multiple accounts (bank, cash, credit, investment)
- **Budget Planning**: Create and monitor budgets for different periods
- **Investment Tracking**: Track your investment portfolio and performance
- **Multi-tenant Architecture**: Built from the ground up with tenant isolation
- **Self-hosted**: Full control over your data with Docker deployment
- **Open Core**: Extensible with plugin SDK for custom integrations

## Technology Stack

### Backend
- **Express.js**: Fast, unopinionated web framework
- **Prisma**: Next-generation ORM with type-safe database access
- **PostgreSQL**: Robust relational database
- **Zod**: Schema validation for TypeScript
- **TypeScript**: Type-safe development

### Frontend
- **Next.js 14**: React framework with App Router
- **Redux Toolkit**: Predictable state management
- **shadcn/ui**: Beautiful, accessible UI components
- **TypeScript**: End-to-end type safety

### Monorepo
- **pnpm**: Fast, disk-efficient package manager
- **Turborepo**: High-performance build system
- **Changesets**: Version management and changelog generation

## Project Structure

```
iei-money-manager/
├── apps/
│   ├── api/                  # Express.js backend API
│   │   ├── src/
│   │   │   ├── modules/      # Feature modules (accounts, transactions, etc.)
│   │   │   └── server.ts
│   │   └── prisma/           # Prisma schema and migrations
│   └── web/                  # Next.js frontend application
│       └── app/              # App Router pages
├── packages/
│   ├── shared/               # Shared types and validation (Zod)
│   ├── domain/               # Domain models and business logic
│   ├── ui/                   # Reusable UI components
│   └── plugin-sdk/           # Plugin development SDK
└── infra/                    # Infrastructure as code
    └── docker-compose.yml    # Local development setup
```

## Architecture: Open-Core Model

This project follows an open-core model:

- **Open Source Core** (this repository): Fully functional self-hosted application with all core features
- **Cloud Modules** (separate private repository): Premium features including billing, subscriptions, and advanced multi-tenant services

### Open Source Features

This repository includes everything you need to run IEI Money Manager:
- Full REST API for all core entities
- Tenant isolation and multi-tenancy support
- Plugin system for extensions
- Self-hosting with Docker
- Complete source code under Apache 2.0

### Cloud Premium Features

The private cloud repository adds:
- Payment processing (Stripe/Paddle)
- Subscription management
- Advanced tenant administration
- Audit logging and compliance features
- Rate limiting and usage tracking

See [LICENSE](#license) for licensing details.

## Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **pnpm**: v9.0.0 or higher
- **Docker & Docker Compose**: For local PostgreSQL
- **Git**: For cloning the repository

### Quick Start (Automated Setup)

**Option 1: One-command setup**

```bash
# Clone and setup
git clone https://github.com/abdullahalharun/iei-money-manager.git
cd iei-money-manager
./scripts/setup.sh

# Start development servers
pnpm dev
```

**Option 2: Manual setup**

```bash
# 1. Clone the repository
git clone https://github.com/abdullahalharun/iei-money-manager.git
cd iei-money-manager

# 2. Install dependencies
pnpm install

# 3. Create environment file
cp env.example .env

# 4. Start database and run migrations
pnpm db:up
pnpm db:migrate
pnpm db:seed

# 5. Start development servers
pnpm dev
```

The API will be available at http://localhost:4000  
The web app will be available at http://localhost:3000

### Manual Installation (Step-by-Step)

<details>
<summary>Click to expand detailed manual setup instructions</summary>

1. **Clone the repository**

```bash
git clone https://github.com/abdullahalharun/iei-money-manager.git
cd iei-money-manager
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp env.example .env
```

Edit `.env` if needed (defaults should work for local development).

4. **Start PostgreSQL**

```bash
cd infra
docker-compose up -d
cd ..
```

5. **Run database migrations**

```bash
cd apps/api
pnpm prisma migrate dev --name init
cd ../..
```

6. **Seed the database**

```bash
cd apps/api
pnpm db:seed
cd ../..
```

7. **Start development servers**

```bash
# From root directory
pnpm dev
```

Or start separately:

```bash
# Terminal 1: Start API server
cd apps/api && pnpm dev

# Terminal 2: Start Next.js frontend
cd apps/web && pnpm dev
```

</details>

## Development

### Common Commands

```bash
# Install dependencies
pnpm install

# Start development servers (API + Web)
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm typecheck

# Format code
pnpm format

# Clean install
pnpm clean
```

### Database Commands

```bash
# Start PostgreSQL
pnpm db:up

# Stop PostgreSQL
pnpm db:down

# Run migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed

# Open Prisma Studio (database GUI)
pnpm db:studio

# Create a new migration
cd apps/api && pnpm prisma migrate dev --name <migration-name>

# Reset database (development only)
cd apps/api && pnpm prisma migrate reset
```

### Running Tests

```bash
pnpm test
```

## Module Development Pattern

Each feature module in `apps/api/src/modules/` follows this structure:

```
<module>/
├── <module>.controller.ts    # Express route handlers
├── <module>.service.ts       # Business logic
├── <module>.route.ts         # Route definitions
├── <module>.types.ts         # TypeScript types
└── <module>.validation.ts    # Zod validation schemas
```

Example: `account.controller.ts`, `account.service.ts`, `account.route.ts`, etc.

All validation uses **Zod** schemas defined in `<module>.validation.ts`.

## Production Deployment

### Docker Compose (Recommended)

See `infra/docker-compose.yml` for a production-ready setup.

### Environment Variables

Ensure all required environment variables are set:
- `DATABASE_URL`: Production PostgreSQL connection
- `JWT_SECRET`: Strong random secret
- `NEXT_PUBLIC_API_URL`: Your deployed API URL
- `NODE_ENV`: Set to `production`

### Build Steps

```bash
# Install dependencies
pnpm install --frozen-lockfile

# Build all packages
pnpm build

# Run database migrations
cd apps/api
pnpm prisma migrate deploy

# Start services
cd apps/api && pnpm start
cd apps/web && pnpm start
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Zod for all input validation
- Write tests for new features
- Follow the established module pattern
- Update documentation as needed

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

### Cloud Modules License

Optional cloud modules (billing, subscriptions, advanced services) are available in a separate private repository under a proprietary license. The open-source core in this repository remains fully functional and licensed under Apache 2.0.

## Roadmap

- [ ] User authentication and authorization
- [ ] Complete RESTful API for all entities
- [ ] Transaction import/export (CSV, OFX)
- [ ] Budget alerts and notifications
- [ ] Investment performance analytics
- [ ] Mobile app (React Native)
- [ ] Advanced reporting dashboards
- [ ] Plugin marketplace
- [ ] Multi-currency support
- [ ] Bank account reconciliation

## Support

- **Issues**: [GitHub Issues](https://github.com/abdullahalharun/iei-money-manager/issues)
- **Discussions**: [GitHub Discussions](https://github.com/abdullahalharun/iei-money-manager/discussions)
- **Documentation**: Coming soon

## Acknowledgments

- Built with modern open-source technologies
- Inspired by the need for privacy-focused financial management
- Thanks to all contributors and the open-source community

## Security

If you discover a security vulnerability, please email security@iei-moneymanager.com instead of using the issue tracker.

---

Made with ❤️ by the IEI Money Manager team

