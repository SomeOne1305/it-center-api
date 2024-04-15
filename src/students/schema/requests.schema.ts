import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";


@Schema({timestamps:true})
export class Requests {
  @Prop({isRequired:true})
  name:string

  @Prop({isRequired:true})
  surname:string

  @Prop({isRequired:true})
  phone_number:string

  @Prop({isRequired:true})
  course:"web"|"computer-learning"|"computer-repairing"
}

export type RequestDocument = HydratedDocument<Requests>;
export const RequestSchema = SchemaFactory.createForClass(Requests);
