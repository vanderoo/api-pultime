import {
    GetAllTaskResponse,
    TaskRequest,
    TaskResponse,
    TaskUpdateRequest
} from "../models/task";
import { User } from "@prisma/client";

export interface ITaskService {
    create(request: TaskRequest): Promise<TaskResponse>;
    update(request: TaskUpdateRequest): Promise<TaskResponse>;
    delete(taskId: string): Promise<Record<string, any>>;
    findById(taskId: string): Promise<TaskResponse>;
    findByContext(context: string, contextId: string, courses: string[]): Promise<GetAllTaskResponse>;
    findByUser(user: User, courses: string[]): Promise<GetAllTaskResponse>;
}