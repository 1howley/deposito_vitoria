import type { Role } from "../../common/enum/RoleEnum.js";

export interface CreateUserDTO {
    email: string,
    password: string,
    name?: string,
    role: Role
}