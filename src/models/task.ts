import { Task } from "@prisma/client";

type TaskBase = {
    name: string;
    description: string;
    start_date?: string;
    end_date?: string;
    assignee?: string;
    progress?: "not_started" | "in_progress" | "completed";
};

export type TaskRequest = TaskBase & {
    context: "class" | "team" | "personal";
    team_id?: string;
    class_id?: string;
    user_id?: string;
    course_id?: string;
};

export type TaskUpdateRequest = Partial<TaskBase> & {
    id: string;
    context?: "class" | "team" | "personal";
    team_id?: string;
    class_id?: string;
    user_id?: string;
    course_id?: string;
};

export type TaskResponse = TaskBase & {
    id: string;
    context: "class" | "team" | "personal";
    created_at: Date;
    updated_at?: Date;
};

export type GetAllTaskResponse = TaskResponse[];

export function toTaskResponse(task: Task): TaskResponse {
    return {
        id: task.id,
        name: task.name,
        description: task.description,
        start_date: task.startDate,
        end_date: task.endDate,
        context: task.context as "class" | "team" | "personal",
        assignee: task.assignee,
        progress: task.progress as "not_started" | "in_progress" | "completed",
        created_at: task.createdAt,
        updated_at: task.updatedAt
    }
}

export function toGetAllTaskResponse(tasks: Task[]): GetAllTaskResponse {
    return tasks.map((task) => ({
        id: task.id,
        name: task.name,
        description: task.description,
        start_date: task.startDate,
        end_date: task.endDate,
        context: task.context as "class" | "team" | "personal",
        assignee: task.assignee,
        progress: task.progress as "not_started" | "in_progress" | "completed",
        created_at: task.createdAt,
        updated_at: task.updatedAt,
        user_id: task.userId,
        course_id: task.courseId,
    }));
}

