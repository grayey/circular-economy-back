import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { compareSync } from 'bcrypt';
import { UserInterface } from 'src/interfaces/user.interface';
import { responseOk } from 'src/utils/formatters';
import { OtpInterface } from 'src/interfaces/otp.interface';
import SmsService from './sms.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UserService, private jwtService:JwtService, 
    private smsService: SmsService, @InjectModel('Otp') private otpModel: Model<OtpInterface>) {}


  public validateUser = async(loginId: string, password: string): Promise<any>  => {
    const user: UserInterface = await this.usersService.findOne({ loginId }, 1);
    const passwordMatches =  compareSync(password, user.password);
    if (user && passwordMatches) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  public login = async (user: UserInterface) =>({ access_token: this.jwtService.sign({...user}) });

  public signUp = async (user:UserInterface):Promise<UserInterface> => await this.usersService.create(user);

  public sendOtp = async(phoneNumber:string, otpObject:OtpInterface) => {
   const otpInstance = new this.otpModel(otpObject);
   const newOtp = await otpInstance.save();
   return await this.smsService.sendMessage(phoneNumber, newOtp.otp);
   
  }

}
