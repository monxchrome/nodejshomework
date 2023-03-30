import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMW } from "../middlewares";
import { fileMiddleware } from "../middlewares/file.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

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

router.put(
  "/:userID/avatar",
  authMiddleware.checkAccessToken,
  userMW.isIDValid,
  userMW.getByIdOrThrow,
  fileMiddleware.isAvatarValid,
  userController.uploadAvatar
);
