import {Request, Response, Router} from "express";
import { AuthController } from "../controllers/auth";
import { AuthService } from "../services/auth";
import { PrismaClient } from '@prisma/client'
import {
    signupValidator,
    loginValidator,
    logoutValidator,
    refreshTokenValidator,
    emailSentValidator, resetPasswordValidator
} from '../validators/auth';
import {validate} from "../middlewares/validation-middleware";
import {authMiddleware} from "../middlewares/auth-middleware";

export const authRoutes = (prisma: PrismaClient) => {
    const router = Router();

    const authService = new AuthService(prisma);
    const authController = new AuthController(authService);

    router.get("/auth", (req: Request, res: Response) => {
        res.status(200).json({ message: "Auth API OK" });
    });

    router.post("/auth/signup", validate(signupValidator), authController.signup.bind(authController));
    router.post("/auth/login", validate(loginValidator), authController.login.bind(authController));
    router.post("/auth/refresh-token", validate(refreshTokenValidator), authController.refreshToken.bind(authController));
    router.delete("/auth/logout", authMiddleware(prisma, process.env.JWT_SECRET), validate(logoutValidator), authController.logout.bind(authController));
    router.post("/auth/request-reset-password", validate(emailSentValidator), authController.requestResetPassword.bind(authController));
    router.post("/auth/reset-password", validate(resetPasswordValidator), authController.resetPassword.bind(authController));

    return router;
};
