import { ITeamService } from "../interfaces/team";
import {PrismaClient, User} from "@prisma/client";
import {
    TeamAddUserRequest,
    TeamRequest,
    TeamResponse,
    TeamUsersResponse, toTeamResponse, toTeamUsersResponse
} from "../models/team";
import { v4 as uuidv4 } from "uuid";
import {ApiError} from "../utils/api-error";

export class TeamService implements ITeamService {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(user: User, request: TeamRequest): Promise<TeamResponse> {
        const { team_name } = request;
        const team_code = uuidv4().slice(0,8);

        const team = await this.prisma.team.create({
            data: {
                teamName: team_name,
                teamCode: team_code,
                users: {
                    connect: {
                        id: user.id
                    }
                }
            },
        });

        return toTeamResponse(team);
    }

    async update(request: TeamRequest): Promise<TeamResponse> {
        const { id, team_name } = request;

        if (!id) {
            throw new ApiError(400, 'TEAM_ID_REQUIRED', [
                { message: 'Team ID is required for update' },
            ]);
        }

        const existingTeam = await this.prisma.team.findUnique({
            where: { id },
        });

        if (!existingTeam) {
            throw new ApiError(404, 'TEAM_NOT_FOUND', [
                { message: `Team with id ${id} not found` },
            ]);
        }

        const team = await this.prisma.team.update({
            where: { id },
            data: { teamName: team_name },
        });

        return toTeamResponse(team);
    }

    async delete(teamId: string): Promise<Record<string, any>> {
        const existingTeam = await this.prisma.team.findUnique({
            where: { id: teamId },
        });

        if (!existingTeam) {
            throw new ApiError(404, 'TEAM_NOT_FOUND', [
                { message: `Team with id ${teamId} not found` },
            ]);
        }

        await this.prisma.team.delete({
            where: { id: teamId },
        });

        return { message: 'Team successfully deleted' };
    }

    async findById(teamId: string): Promise<TeamResponse> {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
        });

        if (!team) {
            throw new ApiError(404, 'TEAM_NOT_FOUND', [
                { message: `Team with id ${teamId} not found` },
            ]);
        }

        return toTeamResponse(team);
    }

    async listUsers(teamId: string): Promise<TeamUsersResponse[]> {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
            include: { users: true },
        });

        if (!team) {
            throw new ApiError(404, 'TEAM_NOT_FOUND', [
                { message: `Team with id ${teamId} not found` },
            ]);
        }

        return toTeamUsersResponse(team);
    }

    async deleteUser(teamId: string, userId: string): Promise<TeamUsersResponse[]> {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
            include: { users: true },
        });

        if (!team) {
            throw new ApiError(404, 'TEAM_NOT_FOUND', [
                { message: `Team with id ${teamId} not found` },
            ]);
        }

        if (!team.users.some(user => user.id === userId)) {
            throw new ApiError(404, 'USER_NOT_FOUND_IN_TEAM', [
                { message: `User with id ${userId} is not a member of this team` },
            ]);
        }

        const updatedTeam = await this.prisma.team.update({
            where: { id: teamId },
            data: {
                users: { disconnect: { id: userId } },
            },
            include: { users: true },
        });

        return toTeamUsersResponse(updatedTeam);
    }

    async addUser(request: TeamAddUserRequest): Promise<TeamUsersResponse[]> {
        const { team_code, user_id } = request;

        const [team, userExists] = await Promise.all([
            this.prisma.team.findUnique({
                where: { teamCode: team_code },
                include: { users: true },
            }),
            this.prisma.user.findUnique({ where: { id: user_id } }),
        ]);

        if (!team) {
            throw new ApiError(404, 'TEAM_NOT_FOUND', [
                { message: `Team with code ${team_code} not found` },
            ]);
        }

        if (!userExists) {
            throw new ApiError(404, 'USER_NOT_FOUND', [
                { message: `User with id ${user_id} not found` },
            ]);
        }

        if (team.users.some(user => user.id === user_id)) {
            throw new ApiError(400, 'USER_ALREADY_EXISTS', [
                { message: `User is already a member of this team` },
            ]);
        }

        const updatedTeam = await this.prisma.team.update({
            where: { id: team.id },
            data: {
                users: { connect: { id: userExists.id } },
            },
            include: { users: true },
        });

        return toTeamUsersResponse(updatedTeam);
    }

}