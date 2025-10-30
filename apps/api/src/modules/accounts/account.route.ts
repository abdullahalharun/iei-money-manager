import { Router } from "express";
import { accountController } from "./account.controller";

const router = Router();

// GET /api/accounts - List all accounts
router.get("/", (req, res, next) => accountController.list(req, res, next));

// GET /api/accounts/:id - Get single account
router.get("/:id", (req, res, next) => accountController.get(req, res, next));

// POST /api/accounts - Create account
router.post("/", (req, res, next) => accountController.create(req, res, next));

// PUT /api/accounts/:id - Update account
router.put("/:id", (req, res, next) => accountController.update(req, res, next));

// DELETE /api/accounts/:id - Delete account
router.delete("/:id", (req, res, next) =>
  accountController.delete(req, res, next)
);

export { router as accountRoutes };

