import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { IsValidType } from '../../decorators/isValidType.decorator';

export class CreateStudentDto {
  @ApiProperty({ required: true, default: 'Abduraim' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, default: "Qo'ziyev" })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ required: true, default: '+998912345678' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({ required: true, default: 'web' })
  @IsNotEmpty()
  @IsValidType()
  course: 'web' | 'computer-learning' | 'computer-repairing';
}
