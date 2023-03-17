import { Router } from "express";

import { userController } from "../controllers";
import { userMW } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.post("/", userMW.isValidCreate, userController.create);

router.get(
  "/:userID",
  authMiddleware.checkAccessToken,
  userMW.isIDValid,
  userMW.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userID",
  authMiddleware.checkAccessToken,
  userMW.isIDValid,
  userMW.isValidUpdate,
  userMW.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userID",
  authMiddleware.checkAccessToken,
  userMW.isIDValid,
  userMW.getByIdOrThrow,
  userController.delete
);
