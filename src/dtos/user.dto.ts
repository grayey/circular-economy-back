import { LoginTypes } from "src/utils/enums";

export class UserDto {
  readonly loginId: string;
  readonly loginType: LoginTypes;
  readonly userType: string;
  readonly status: boolean;
  readonly updatedAt: string;
  readonly createdAt: string;
}
