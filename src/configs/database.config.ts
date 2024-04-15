import { registerAs } from "@nestjs/config";
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from "@nestjs/mongoose";

export default registerAs('databaseConfig',():MongooseModuleAsyncOptions=>({
  useFactory:()=>({
    uri:`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@it-centre.bsxeuja.mongodb.net/?retryWrites=true&w=majority&appName=it-centre`
  })
}))