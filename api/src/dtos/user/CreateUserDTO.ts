import type { Role } from "../../common/enum/RoleEnum.js";

export interface CreateUserDTO {
    userId: string,
    email: string,
    name?: string,
    role?: Role
}