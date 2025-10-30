import { Router } from "express";
import { budgetController } from "./budget.controller";

const router = Router();

router.get("/", (req, res, next) => budgetController.list(req, res, next));
router.post("/", (req, res, next) => budgetController.create(req, res, next));

export { router as budgetRoutes };

