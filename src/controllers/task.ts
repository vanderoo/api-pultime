import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task";
import { TaskRequest, TaskUpdateRequest } from "../models/task";
import {UserRequest} from "../types/user-request";
import {sendSuccessResponse} from "../utils/response";

export class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as TaskRequest;
            const data = await this.taskService.create(request);
            sendSuccessResponse(res, 200, 'TASK_CREATED', data)
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as TaskUpdateRequest;
            request.id = req.params.id;
            const data = await this.taskService.update(request);
            sendSuccessResponse(res, 200, 'TASK_UPDATED', data);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.taskService.delete(req.params.id);
            sendSuccessResponse(res, 200, 'TASK_DELETED', data);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.taskService.findById(req.params.id);
            sendSuccessResponse(res, 200, 'TASK_RETRIEVED', data);
        } catch (error) {
            next(error);
        }
    }

    async findByContext(req: Request, res: Response, next: NextFunction) {
        try {
            const courses: string[] = req.query.courses ? JSON.parse(req.query.courses as string) : [];
            const data = await this.taskService.findByContext(req.params.context, req.params.context_id, courses);
            sendSuccessResponse(res, 200, 'TASK_RETRIEVED', data);
        } catch (error) {
            next(error);
        }
    }

    async findByUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const courses: string[] = req.query.courses ? JSON.parse(req.query.courses as string) : [];
            const data = await this.taskService.findByUser(req.user, courses);
            sendSuccessResponse(res, 200, 'TASK_RETRIEVED', data);
        } catch (error) {
            next(error);
        }
    }

}
