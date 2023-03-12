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
  userMW.getByIdError,
  userController.getById
);

router.put(
  "/:userID",
  userMW.isIDValid,
  userMW.isValidUpdate,
  userMW.getByIdError,
  userController.update
);

router.delete(
  "/:userID",
  userMW.isIDValid,
  userMW.getByIdError,
  userController.delete
);
