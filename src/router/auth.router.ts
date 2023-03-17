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

router.post(
  "/password/change",
  authMiddleware.checkAccessToken,
  authMiddleware.isValidChangePassword,
  authController.changePassword
);

router.post(
  "/password/forgot",
  userMW.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  "/password/forgot/:token",
  authMiddleware.checkActionForgotToken,
  authMiddleware.isValidForgotPassword,
  authController.setForgotPassword
);

router.post(
  "/activate",
  userMW.getDynamicallyOrThrow("email"),
  authController.activateEmail
);
