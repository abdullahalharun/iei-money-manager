import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a default tenant
  const tenant = await prisma.tenant.upsert({
    where: { id: "default-tenant-id" },
    update: {},
    create: {
      id: "default-tenant-id",
      name: "Default Tenant"
    }
  });

  console.log("✓ Created tenant:", tenant.name);

  // Create a default user with hashed password
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "John Doe",
      password: hashedPassword,
      tenantId: tenant.id
    }
  });

  console.log("✓ Created user:", user.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        tenantId: tenant.id,
        name: "Salary",
        kind: "INCOME"
      }
    }),
    prisma.category.create({
      data: {
        tenantId: tenant.id,
        name: "Freelance",
        kind: "INCOME"
      }
    }),
    prisma.category.create({
      data: {
        tenantId: tenant.id,
        name: "Groceries",
        kind: "EXPENSE"
      }
    }),
    prisma.category.create({
      data: {
        tenantId: tenant.id,
        name: "Transport",
        kind: "EXPENSE"
      }
    }),
    prisma.category.create({
      data: {
        tenantId: tenant.id,
        name: "Stock Investment",
        kind: "INVEST"
      }
    })
  ]);

  console.log(`✓ Created ${categories.length} categories`);

  // Create accounts
  const checkingAccount = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      name: "Checking Account",
      type: "checking",
      balance: 1000
    }
  });

  const savingsAccount = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      name: "Savings Account",
      type: "savings",
      balance: 5000
    }
  });

  console.log("✓ Created accounts");

  // Create sample transactions
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        tenantId: tenant.id,
        accountId: checkingAccount.id,
        categoryId: categories[2].id,
        amount: -150,
        note: "Weekly groceries",
        occurredAt: new Date("2025-01-15")
      }
    }),
    prisma.transaction.create({
      data: {
        tenantId: tenant.id,
        accountId: checkingAccount.id,
        categoryId: categories[3].id,
        amount: -30,
        note: "Bus pass",
        occurredAt: new Date("2025-01-16")
      }
    }),
    prisma.transaction.create({
      data: {
        tenantId: tenant.id,
        accountId: checkingAccount.id,
        categoryId: categories[0].id,
        amount: 5000,
        note: "Monthly salary",
        occurredAt: new Date("2025-01-01")
      }
    })
  ]);

  console.log(`✓ Created ${transactions.length} transactions`);

  // Create budgets
  const budgets = await Promise.all([
    prisma.budget.create({
      data: {
        tenantId: tenant.id,
        name: "Monthly Groceries",
        amount: 600,
        period: "monthly"
      }
    }),
    prisma.budget.create({
      data: {
        tenantId: tenant.id,
        name: "Yearly Savings",
        amount: 12000,
        period: "yearly"
      }
    })
  ]);

  console.log(`✓ Created ${budgets.length} budgets`);

  // Create investments
  const investments = await Promise.all([
    prisma.investment.create({
      data: {
        tenantId: tenant.id,
        name: "AAPL Stock",
        amount: 5000
      }
    }),
    prisma.investment.create({
      data: {
        tenantId: tenant.id,
        name: "Google Stock",
        amount: 3000
      }
    })
  ]);

  console.log(`✓ Created ${investments.length} investments`);

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

