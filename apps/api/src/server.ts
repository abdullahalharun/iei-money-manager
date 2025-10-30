import express from "express";
import { tenantMiddleware } from "./lib/middleware";
import { authMiddleware } from "./lib/auth.middleware";
import { errorHandler } from "./lib/errors";
import { authRoutes } from "./modules/auth/auth.route";
import { accountRoutes } from "./modules/accounts/account.route";
import { categoryRoutes } from "./modules/categories/category.route";
import { transactionRoutes } from "./modules/transactions/transaction.route";
import { budgetRoutes } from "./modules/budgets/budget.route";
import { investmentRoutes } from "./modules/investments/investment.route";

const app = express();

// Middleware
app.use(express.json());

// Health check (public)
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api", timestamp: new Date().toISOString() });
});

// Public auth routes (no authentication required)
app.use("/api/auth", authRoutes);

// Protected routes (require authentication)
app.use(authMiddleware);
app.use(tenantMiddleware);

app.use("/api/accounts", accountRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/investments", investmentRoutes);

// Error handling (must be last)
app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

