import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMW } from "../middlewares/user.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.post("/", userMW.isValidCreate, userController.create);

router.get(
  "/:userID",
  userMW.isIDValid,
  userMW.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userID",
  userMW.isIDValid,
  userMW.isValidUpdate,
  userMW.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userID",
  userMW.isIDValid,
  userMW.getByIdOrThrow,
  userController.delete
);
