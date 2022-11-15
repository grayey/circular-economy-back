import { LoginTypes, UserTypes } from "src/utils/enums";

export interface UserInterface {
    readonly loginId: string;
    readonly loginType: LoginTypes;
    password?: string;
    readonly userType: UserTypes;
    readonly status: boolean;
    readonly updatedAt: string;
    readonly createdAt: string;
  }