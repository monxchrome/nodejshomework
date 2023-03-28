import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";

const router = Router();

export const carRouter = router;

router.get("/", carController.getAll);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  carMiddleware.isValidCreate,
  carController.create
);

router.get(
  "/:carID",
  authMiddleware.checkAccessToken,
  carMiddleware.isIDValid,
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.put(
  "/:carID",
  authMiddleware.checkAccessToken,
  carMiddleware.isIDValid,
  carMiddleware.isValidUpdate,
  carMiddleware.getByIdOrThrow,
  carController.update
);

router.delete(
  "/:carID",
  authMiddleware.checkAccessToken,
  carMiddleware.isIDValid,
  carMiddleware.getByIdOrThrow,
  carController.delete
);
