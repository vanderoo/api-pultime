import {Request, Response, Router} from "express";
import { TaskController } from "../controllers/task";
import { TaskService } from "../services/task";
import { PrismaClient } from "@prisma/client";
import {
    taskRequestUpdateValidator,
    taskRequestValidator

} from "../validators/task";
import {validate} from "../middlewares/validation-middleware";

export const taskRoutes = (prisma: PrismaClient) => {
    const router = Router();

    const taskService = new TaskService(prisma);
    const taskController = new TaskController(taskService);

    router.get("/task", (req: Request, res: Response) => {
        res.status(200).json({ message: "Task API OK" });
    });

    router.post('/task', validate(taskRequestValidator), taskController.create.bind(taskController));
    router.put('/task/:id', validate(taskRequestUpdateValidator),taskController.update.bind(taskController));
    router.delete('/task/:id', taskController.delete.bind(taskController));
    router.get('/task/:id', taskController.findById.bind(taskController));
    router.get('/tasks/by-context/:context/:context_id', taskController.findByContext.bind(taskController));
    router.get('/tasks/by-user', taskController.findByUser.bind(taskController));

    return router;
}