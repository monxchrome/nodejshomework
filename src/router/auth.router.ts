import { Router } from "express";

import { authController } from "../controllers";
import { userMW } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

export const authRouter = router;

router.post(
  "/register",
  userMW.isValidCreate,
  userMW.getDynamicallyAndThrow("email", "body"), // search for email ( from res.body) | fieldName = email
  authController.register
);

router.post(
  "/login",
  userMW.isValidLogin,
  userMW.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
