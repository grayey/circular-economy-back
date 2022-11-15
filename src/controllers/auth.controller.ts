import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';
import { ApiSuccessResponse } from 'src/interfaces/api.interface';
import { UserInterface } from 'src/interfaces/user.interface';
import { responseOk } from 'src/utils/formatters';
import { addMinutesToDate, isValidEmail } from 'src/utils/helpers';
import { MailService } from 'src/services/mail.service';
import * as otpGenerator from 'otp-generator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly mailService:MailService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signUp(@Body() user:UserInterface): Promise<ApiSuccessResponse>{
     const data:UserInterface = await this.authService.signUp(user);
     const { loginId } = data;
     isValidEmail(loginId) ? this.sendActivationLink(data) : this.sendOtp(loginId);
     return responseOk(data);
   }


   private async sendOtp(phoneNumber:string){
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    const now = new Date();
    const expiresBy = addMinutesToDate(now, 10).toISOString();
     try{
      await this.authService.sendOtp(phoneNumber, {otp, expiresBy, verified:true});
     }catch(e){
      
     }
  }

private async sendActivationLink(user:UserInterface, clientUrl:string = 'https://localhost:3000/verify-email'){
    try{
      this.mailService.sendSignUpEmail(user, clientUrl);
    }catch(e){
  
    }
  }
}
