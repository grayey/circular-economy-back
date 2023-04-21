import { LoginTypes, UserTypes } from 'src/utils/enums';

export interface UserInterface {
  readonly _id: string;
  readonly aggregatorId: string;
  readonly loginId: string;
  readonly loginType: LoginTypes;
  readonly userType: UserTypes;
  password?: string;
  signUpToken?: string;
  tokenExpires?: string;
  status: boolean;
  readonly roleId?: string;
  readonly updatedAt: string;
  readonly createdAt: string;
  readonly save?: Function;
}
