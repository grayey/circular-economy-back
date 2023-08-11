import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { compareSync } from 'bcrypt';
import { UserInterface } from 'src/interfaces/user.interface';
import { UserCreateDto, UserSignUpDto } from 'src/dtos/user.dto';
import { formatErrors } from 'src/utils/helpers';
import { ApiErrors, SignUpType } from 'src/utils/enums';
import { copyToJson } from 'src/utils/formatters';
import { jwtConstants } from 'src/utils/constants';
import environment from 'src/environments';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user's login credentials
   * @param loginId
   * @param password
   * @returns
   */
  public validateUser = async (
    loginId: string,
    password: string,
  ): Promise<any> => {
    const user: UserInterface = await this.usersService.findOne({ loginId }, 1);
    const passwordMatches = user ? compareSync(password, user.password) : false;
    if (user && passwordMatches) {
      user.password = undefined;
      return user;
    }

    return null;
  };

  /**
   * Verifies a user's sign up token
   * @param signUpToken
   * @returns
   */
  public verifyUser = async (signUpToken: string) => {
    const user = await this.usersService.findOne({ signUpToken });
    if (!user) {
      throw formatErrors(ApiErrors.NOT_FOUND, 'User not found.');
    }
    if (new Date(user.tokenExpires) < new Date()) {
      throw formatErrors(
        ApiErrors.TOKEN_EXPIRED,
        'Verification token expired.',
      );
    }
    user.status = true;
    user.save();
    return this.login(user);
  };

  /**
   * Logs a user in
   * @param user
   * @returns
   */
  public login = async (user: UserInterface) => {
    const access_token = this.jwtService.sign(copyToJson(user), {
      expiresIn: jwtConstants.expiresIn,
    });
    const cookie_token = `Refresh=${access_token}; HttpOnly; Path=/; Max-Age=${environment.jwtRefreshTokenExpirationTime}`;
    return {
      access_token,
      cookie_token,
    };
  };

  /**
   * Registers a user
   * @param user
   * @returns
   */
  public signUp = async (user: UserSignUpDto): Promise<UserInterface> =>
    await this.usersService.create(user, SignUpType.REGISTRATION);
}
