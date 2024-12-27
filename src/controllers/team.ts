import { NextFunction, Request, Response } from "express";
import { TeamService } from "../services/team";
import { TeamAddUserRequest, TeamRequest } from "../models/team";
import {UserRequest} from "../types/user-request";
import {sendSuccessResponse} from "../utils/response";

export class TeamController {
    private teamService: TeamService;

    constructor(teamService: TeamService) {
        this.teamService = teamService;
    }

    async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as TeamRequest;
            const data = await this.teamService.create(req.user, request);
            sendSuccessResponse(res, 200, 'TEAM_CREATED', data)
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as TeamRequest;
            request.id = req.params.id;
            const data = await this.teamService.update(request);
            sendSuccessResponse(res, 200, 'TEAM_UPDATED', data);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teamService.delete(req.params.id);
            sendSuccessResponse(res, 200, 'TEAM_DELETED', data);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teamService.findById(req.params.id);
            sendSuccessResponse(res, 200, 'TEAM_RETRIEVED', data);
        } catch (error) {
            next(error);
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teamService.listUsers(req.params.id);
            sendSuccessResponse(res, 200, 'TEAM_USERS_RETRIEVED', data);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teamService.deleteUser(req.params.id, req.params.user_id);
            sendSuccessResponse(res, 200, 'TEAM_USERS_DELETED', data);
        } catch (error) {
            next(error);
        }
    }

    async addUser(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as TeamAddUserRequest;
            request.team_code = req.params.team_code;
            const data = await this.teamService.addUser(request);
            sendSuccessResponse(res, 200, 'TEAM_USERS_ADDED', data);
        } catch (error) {
            next(error);
        }
    }

}