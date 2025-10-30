import { Router } from "express";
import { transactionController } from "./transaction.controller";

const router = Router();

router.get("/", (req, res, next) =>
  transactionController.list(req, res, next)
);

router.post("/", (req, res, next) =>
  transactionController.create(req, res, next)
);

export { router as transactionRoutes };

