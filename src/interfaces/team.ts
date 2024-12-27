import {
    TeamAddUserRequest,
    TeamRequest,
    TeamResponse,
    TeamUsersResponse
} from "../models/team";
import { User } from "@prisma/client";

export interface ITeamService {
    create(user: User, request: TeamRequest): Promise<TeamResponse>;
    update(request: TeamRequest): Promise<TeamResponse>;
    findById(classId: string): Promise<TeamResponse>;
    delete(classId: string): Promise<Record<string, any>>;
    listUsers(classId: string): Promise<TeamUsersResponse[]>;
    deleteUser(classId: string, userId: string): Promise<TeamUsersResponse[]>;
    addUser(request: TeamAddUserRequest): Promise<TeamUsersResponse[]>;
}
