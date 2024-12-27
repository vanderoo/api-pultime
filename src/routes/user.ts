import {Request, Response, Router} from "express";
import { UserController } from "../controllers/user";
import { UserService } from "../services/user";
import { PrismaClient } from "@prisma/client";
import { updateUsernameValidator } from "../validators/user";
import {validate} from "../middlewares/validation-middleware";

export const userRoutes = (prisma: PrismaClient) => {
    const router = Router();

    const userService = new UserService(prisma);
    const userController = new UserController(userService);

    router.get("/user", (req: Request, res: Response) => {
        res.status(200).json({ message: "User API OK" });
    });
    router.patch("/user/current", validate(updateUsernameValidator), userController.updateUsername.bind(userController));
    router.get("/user/current", userController.get.bind(userController));
    router.get("/user/current/classes", userController.listUserClasses.bind(userController));
    router.get("/user/current/teams", userController.listUserTeam.bind(userController));

    return router;
};
