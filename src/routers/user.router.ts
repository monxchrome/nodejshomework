import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMW } from "../middlewares/user.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.get("/:userID", userMW.getByIdError, userController.getById);

router.post("/", userController.create);

router.put("/:userID", userController.update);

router.delete("/:userID", userController.delete);
