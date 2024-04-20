import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { StudentsModule } from './students/students.module';
//configs
import database from './configs/database.config';
import mailerConfig from './configs/mailer.config';

@Module({
  imports: [
    StudentsModule,
    MongooseModule.forRootAsync(database()),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot(mailerConfig()),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
