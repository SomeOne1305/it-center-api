import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Students")
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @Post("register")
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get("on-register")
  findAll() {
    return this.studentsService.findAllReqClients();
  }

  @Get("on-process")
  findAllStudents(){
    return this.studentsService.findAllStudents()
  }

  @Delete('on-register/cancel/:id')
  remove(@Param('id') id: string) {
    return this.studentsService.cancelReqClient(id);
  }
}
