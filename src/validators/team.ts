import { z } from "zod";

export const teamCreateRequestValidator = z.object({
    team_name: z.string().min(1, "Team name is required"),
});

export const teamAddUserRequestValidator = z.object({
    user_id: z.string().uuid("Invalid user ID format"),
});
