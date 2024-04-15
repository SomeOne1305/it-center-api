import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";


@Schema({timestamps:true})
export class Student {
  @Prop({isRequired:true})
  name:string

  @Prop({isRequired:true})
  surname:string

  @Prop({isRequired:true})
  phone_number:string

  @Prop({isRequired:true})
  course:"web"|"computer-learning"|"computer-repairing"
}

export type StudentDocument = HydratedDocument<Student>;
export const StudentSchema = SchemaFactory.createForClass(Student);
