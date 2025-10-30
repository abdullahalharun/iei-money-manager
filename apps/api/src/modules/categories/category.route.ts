import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.get("/", (req, res, next) => categoryController.list(req, res, next));
router.post("/", (req, res, next) => categoryController.create(req, res, next));

export { router as categoryRoutes };

