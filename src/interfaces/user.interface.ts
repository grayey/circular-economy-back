import { LoginTypes, UserTypes } from 'src/utils/enums';

export interface UserInterface {
  readonly _id: string;
  readonly loginId: string;
  readonly loginType: LoginTypes;
  password?: string;
  signUpToken?: String;
  tokenExpires?: String;
  readonly userType: UserTypes;
  status: boolean;
  readonly updatedAt: string;
  readonly createdAt: string;
}
