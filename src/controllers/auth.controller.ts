import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';
import { UserInterface } from 'src/interfaces/user.interface';
import { formatErrors } from 'src/utils/helpers';
import { UserSignUpDto, UserVerfiyDto } from 'src/dtos/user.dto';
import { ApiErrors } from 'src/utils/enums';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('verify-user')
  async verifyUser(@Body() { signUpToken }: UserVerfiyDto) {
    return await this.authService.verifyUser(signUpToken);
  }

  @Post('register')
  async signUp(@Body() user: UserSignUpDto): Promise<UserInterface> {
    try {
      return await this.authService.signUp(user);
    } catch (error: any) {
      throw formatErrors(ApiErrors.NOT_FOUND, error?.message);
    }
  }
}
