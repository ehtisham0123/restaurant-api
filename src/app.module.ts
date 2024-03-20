import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';

import config from './configs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [config] }),
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: join(__dirname, '..', 'public', 'images'),
    }),
    UserModule,
    PrismaModule,
    AdminModule,
    CustomerModule,
    // AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }