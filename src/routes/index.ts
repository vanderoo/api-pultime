import { Router, Request, Response } from "express";
import { authRoutes } from "./auth";
import { PrismaClient } from "@prisma/client";
import {classRoutes} from "./class";
import {authMiddleware} from "../middlewares/auth-middleware";
import {userRoutes} from "./user";
import {taskRoutes} from "./task";
import {teamRoutes} from "./team";

export const apiRoutes = (prisma: PrismaClient) => {
    const router = Router();
    
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "PulTime API OK" });
    });
    
    router.use(authRoutes(prisma));

    router.use(authMiddleware(prisma, process.env.JWT_SECRET));
    router.use(classRoutes(prisma));
    router.use(userRoutes(prisma));
    router.use(teamRoutes(prisma));
    router.use(taskRoutes(prisma));
    
    return router;
};
