import type { Role } from "../../common/enums/RoleEnum.js";

export interface CreateUserDTO {
    userId: string;
    email: string;
    name?: string;
    role?: Role;
    authProvider: string;
}
