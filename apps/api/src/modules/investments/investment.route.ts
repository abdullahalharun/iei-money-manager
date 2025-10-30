import { Router } from "express";
import { investmentController } from "./investment.controller";

const router = Router();

router.get("/", (req, res, next) =>
  investmentController.list(req, res, next)
);

router.post("/", (req, res, next) =>
  investmentController.create(req, res, next)
);

export { router as investmentRoutes };

