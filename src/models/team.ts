import {Prisma, Team} from "@prisma/client";

type TeamWithUsers = Prisma.TeamGetPayload<{
    include: { users: true };
}>

export type TeamRequest = {
    id?: string;
    team_name: string;
};

export type TeamAddUserRequest = {
    user_id: string;
    team_code: string;
};

export type TeamResponse = {
    id: string;
    team_name: string;
    team_code: string;
    created_at: Date;
    updated_at: Date;
}

export function toTeamResponse(team: Team) {
    return {
        id: team.id,
        team_name: team.teamName,
        team_code: team.teamCode,
        created_at: team.createdAt,
        updated_at: team.updatedAt
    }
}

export type TeamUsersResponse = {
    id: string;
    email: string;
    username: string;
    created_at: Date;
    updated_at: Date;
}

export function toTeamUsersResponse(team: TeamWithUsers) {
    return team.users.map((user) => {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        }
    });
}
