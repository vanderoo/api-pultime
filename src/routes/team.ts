import {Request, Response, Router} from "express";
import { TeamController } from "../controllers/team";
import { TeamService } from "../services/team";
import { PrismaClient } from "@prisma/client";
import {
    teamAddUserRequestValidator,
    teamCreateRequestValidator,
} from "../validators/team";
import {validate} from "../middlewares/validation-middleware";

export const teamRoutes = (prisma: PrismaClient) => {
    const router = Router();

    const teamService = new TeamService(prisma);
    const teamController = new TeamController(teamService);

    router.get("/team", (req: Request, res: Response) => {
        res.status(200).json({ message: "Team API OK" });
    });

    router.post('/team', validate(teamCreateRequestValidator), teamController.create.bind(teamController));
    router.put('/team/:id', validate(teamCreateRequestValidator), teamController.update.bind(teamController));
    router.delete('/team/:id', teamController.delete.bind(teamController));
    router.get('/team/:id', teamController.findById.bind(teamController));
    router.get('/team/:id/users', teamController.listUsers.bind(teamController));
    router.delete('/team/:id/users/:user_id', teamController.deleteUser.bind(teamController));
    router.post('/team/:team_code/users', validate(teamAddUserRequestValidator), teamController.addUser.bind(teamController));

    return router;
}