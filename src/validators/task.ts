import { z } from "zod";

export const taskRequestValidator = z.object({
    name: z.string().min(1, "Task name is required"),
    description: z.string().min(1, "Task description is required"),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    assignee: z.string().optional(),
    progress: z.enum(["not_started", "in_progress", "completed"]).optional(),
    context: z.enum(["class", "team", "personal"]),
    team_id: z.string().uuid("Invalid team ID format").optional(),
    class_id: z.string().uuid("Invalid class ID format").optional(),
    user_id: z.string().uuid("Invalid user ID format").optional(),
});

