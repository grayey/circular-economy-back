import { Module } from '@nestjs/common';
import { AppController } from 'src/controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import environment from 'src/environments';
import { UserModule } from 'src/modules/user.module';
import { AuthModule } from 'src/modules/auth.module';
import { AdminModule } from './admin.module';
import { ProductsModule } from './products.module';
import { NotificationModule } from './notification.module';
import { EventsModule } from './events.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoUri),
    AuthModule,
    UserModule,
    AdminModule,
    ProductsModule,
    NotificationModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
