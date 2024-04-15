import { IsNotEmpty, IsPhoneNumber, IsString,isPhoneNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
  @ApiProperty({required:true, default:"Abduraim"})
  @IsNotEmpty()
  @IsString()
  name:string;

  @ApiProperty({required:true, default:"Qo'ziyev"})
  @IsNotEmpty()
  @IsString()
  surname:string;

  @ApiProperty({required:true, default:"+998912345678"})
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber("UZ")
  phone_number:string;

  @ApiProperty({required:true, default:"web"})
  @IsNotEmpty()
  course:"web"|"computer-learning"|"computer-repairing"
}
