import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user.module';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { LocalStrategy } from 'src/utils/strategies/local.strategy';
import { jwtConstants } from 'src/utils/constants';
import { NotificationModule } from './notification.module';
import { Schemata } from 'src/schemas';

@Module({
  imports: [
    UserModule,
    PassportModule,
    NotificationModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([Schemata.OTP]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
