import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer'

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

// SCHEMAS
import { Student, StudentSchema } from './schema/student.schema';
import { RequestSchema, Requests } from './schema/requests.schema';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports:[MongooseModule.forFeature([{name:Student.name, schema:StudentSchema}]),
  MongooseModule.forFeature([{name:Requests.name,schema:RequestSchema}]),
],
})
export class StudentsModule {}
