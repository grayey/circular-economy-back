import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { formatErrors } from '../helpers';
import { ApiErrors } from '../enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'loginId' });
  }

  async validate(loginId: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(loginId, password);
    if (!user) {
      throw formatErrors(ApiErrors.UNAUTHORIZED, 'Incorrect credentials');
    }
    if (!user.status) {
      throw formatErrors(
        ApiErrors.UNAUTHORIZED,
        'User inactive, please contact admin.',
      );
    }
    return user;
  }
}
