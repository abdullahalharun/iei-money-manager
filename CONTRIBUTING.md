# Contributing to IEI Money Manager

First off, thank you for considering contributing to IEI Money Manager! It's people like you that make IEI Money Manager such a great project.

## Code of Conduct

This project and everyone participating in it is governed by a code of conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Use the [GitHub issue tracker](https://github.com/abdullahalharun/iei-money-manager/issues)
- Check if the bug has already been reported
- Provide a clear and descriptive title
- Include steps to reproduce the bug
- Describe the expected behavior vs. actual behavior
- Add screenshots if applicable

### Suggesting Enhancements

- Open an issue with the `enhancement` label
- Clearly describe the feature and why it would be useful
- Outline the proposed implementation if possible

### Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Add or update tests as necessary
5. Ensure all tests pass (`pnpm test`)
6. Ensure linting passes (`pnpm lint`)
7. Ensure type checking passes (`pnpm typecheck`)
8. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
9. Push to the branch (`git push origin feature/amazing-feature`)
10. Open a Pull Request

## Development Setup

See the [README.md](README.md) for detailed setup instructions.

Quick start:

```bash
# Clone and install
git clone https://github.com/abdullahalharun/iei-money-manager.git
cd iei-money-manager
pnpm install

# Start development servers
cd infra && docker-compose up -d
cd ../apps/api && pnpm prisma migrate dev
pnpm dev
```

## Coding Standards

### TypeScript

- Always use TypeScript for new code
- Avoid `any` type unless absolutely necessary
- Prefer interfaces for object shapes
- Use strict mode enabled in tsconfig

### Validation

- All user input must be validated using **Zod schemas**
- Validation schemas go in `<module>.validation.ts`
- Never trust client-side validation alone

### Module Pattern

Follow the established module pattern:

```
<module>/
├── <module>.controller.ts    # Express route handlers
├── <module>.service.ts       # Business logic
├── <module>.route.ts         # Route definitions
├── <module>.types.ts         # TypeScript types
└── <module>.validation.ts    # Zod schemas
```

### Git Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(accounts): add account balance validation
fix(transactions): correct date filtering bug
docs: update setup instructions
```

### Code Formatting

- We use Prettier for code formatting
- Run `pnpm format` before committing
- Format on save is recommended in your editor

### Testing

- Write tests for new features
- Aim for good coverage but focus on critical paths
- Mock external dependencies

## Project Structure

```
iei-money-manager/
├── apps/
│   ├── api/          # Backend API
│   └── web/          # Frontend application
├── packages/
│   ├── shared/       # Shared utilities
│   ├── domain/       # Domain models
│   ├── ui/           # UI components
│   └── plugin-sdk/   # Plugin SDK
└── infra/            # Infrastructure
```

## Questions?

Don't hesitate to ask questions by opening an issue or starting a discussion!

Thank you for contributing to IEI Money Manager! 🎉

