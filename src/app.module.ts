import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer'
//configs
import database from './configs/database.config';
import mailerConfig from './configs/mailer.config';

console.log(mailerConfig())

@Module({
  imports: [StudentsModule, 
  MongooseModule.forRootAsync(database()),
  ConfigModule.forRoot({
    isGlobal:true
  }),
  MailerModule.forRoot(mailerConfig())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
