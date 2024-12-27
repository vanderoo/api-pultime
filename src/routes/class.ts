import {Request, Response, Router} from "express";
import { ClassController } from "../controllers/class";
import { ClassService } from "../services/class";
import { PrismaClient } from "@prisma/client";
import {
    classAddUserRequestValidator,
    classCreateRequestValidator,
    classUpdateRequestValidator
} from "../validators/class";
import {validate} from "../middlewares/validation-middleware";

export const classRoutes = (prisma: PrismaClient) => {
    const router = Router();

    const classService = new ClassService(prisma);
    const classController = new ClassController(classService);

    router.get("/class", (req: Request, res: Response) => {
        res.status(200).json({ message: "Class API OK" });
    });
    router.post('/class', validate(classCreateRequestValidator), classController.create.bind(classController));
    router.put('/class/:id', validate(classUpdateRequestValidator), classController.update.bind(classController));
    router.delete('/class/:id', classController.delete.bind(classController));
    router.get('/class/:id', classController.findById.bind(classController));
    router.get('/class/:id/users', classController.listUsers.bind(classController));
    router.delete('/class/:id/users/:user_id', classController.deleteUser.bind(classController));
    router.post('/class/:class_code/users', validate(classAddUserRequestValidator), classController.addUser.bind(classController));

    return router;
}