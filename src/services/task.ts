import { ITaskService } from "../interfaces/task";
import { PrismaClient, User } from "@prisma/client";
import {
    GetAllTaskResponse,
    TaskRequest,
    TaskResponse,
    TaskUpdateRequest, toGetAllTaskResponse, toTaskResponse
} from "../models/task";
import {ApiError} from "../utils/api-error";
import {logger} from "../configs/logging";

export class TaskService implements ITaskService {

    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(request: TaskRequest): Promise<TaskResponse> {
        const task = await this.prisma.task.create({
            data: {
                name: request.name,
                description: request.description,
                startDate: request.start_date,
                endDate: request.end_date,
                assignee: request.assignee,
                progress: request.progress || "not_started",
                context: request.context,
                teamId: request.team_id || null,
                classId: request.class_id || null,
                userId: request.user_id || null,
                courseId: request.course_id || null,
            },
        });

        return toTaskResponse(task);
    }

    async update(request: TaskUpdateRequest): Promise<TaskResponse> {
        const task = await this.prisma.task.update({
            where: { id: request.id },
            data: {
                name: request.name,
                description: request.description,
                startDate: request.start_date,
                endDate: request.end_date,
                assignee: request.assignee,
                progress: request.progress,
                context: request.context,
                teamId: request.team_id,
                classId: request.class_id,
                userId: request.user_id || null,
                courseId: request.course_id || null,
            },
        });

        return toTaskResponse(task);
    }

    async delete(taskId: string): Promise<Record<string, any>> {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new ApiError(404, 'NOT_FOUND', [{ message: 'Task not found' }]);
        }

        await this.prisma.task.delete({
            where: { id: taskId },
        });

        return { message: "Task deleted successfully" };
    }

    async findById(taskId: string): Promise<TaskResponse> {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new ApiError(404, 'NOT_FOUND', [{ message: 'Task not found' }]);
        }

        return toTaskResponse(task);
    }

    async findByContext(context: string, contextId: string, courses: string[]): Promise<GetAllTaskResponse> {
        const tasks = await this.prisma.task.findMany({
            where: {
                context,
                OR: [
                    { teamId: context === "team" ? contextId : undefined },
                    { classId: context === "class" ? contextId : undefined },
                ],
                NOT: [
                    { courseId: { in: courses } }
                ]
            },
        });
        logger.debug(`courses: ${courses}`)

        return toGetAllTaskResponse(tasks);
    }

    async findByUser(user: User, courses: string[]): Promise<GetAllTaskResponse> {
        /**
         * User has property id
         * Todo: Get All Tasks with related teamId, classId, and userId
         * Todo: Return Tasks
         */
        const userToFind = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: {
                classes: true,
                teams: true,
            },
        });

        logger.debug(`courses: ${courses}`)

        const tasks = await this.prisma.task.findMany({
            where: {
                OR: [
                    { teamId: { in: userToFind.teams.map(team => team.id) } },
                    {
                        classId: { in: userToFind.classes.map(cls => cls.id) },
                        AND: [
                            { OR: [{ courseId: null }, { courseId: { notIn: courses } }] }
                        ]
                    },
                    { userId: user.id }
                ]
            },
        });

        return toGetAllTaskResponse(tasks);
    }

}