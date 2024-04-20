import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiBody({ type: CreateStudentDto })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @HttpCode(200)
  @Get('on-register')
  findAll() {
    return this.studentsService.findAllReqClients();
  }

  @HttpCode(202)
  @Post('on-register/accept/:id')
  acceptClient(@Param('id') id: string) {
    return this.studentsService.acceptReqClient(id);
  }

  @HttpCode(200)
  @Delete('on-register/cancel/:id')
  remove(@Param('id') id: string) {
    return this.studentsService.cancelReqClient(id);
  }

  @HttpCode(200)
  @Delete('on-register/delete-many')
  deleteManyReq(@Body() ids: string[]) {
    return this.studentsService.deleteManyOnReq(ids);
  }

  @HttpCode(200)
  @Get('on-process')
  findAllStudents() {
    return this.studentsService.findAllStudents();
  }

  @HttpCode(200)
  @Get('on-process/:course')
  getStudentByCourse(
    @Param('course') course: 'web' | 'computer-learning' | 'computer-repairing',
  ) {
    return this.studentsService.GetStudentByCategory(course);
  }

  @HttpCode(200)
  @Delete('on-process/delete/:id')
  deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(id);
  }

  @HttpCode(200)
  @Delete('on-process/delete-many')
  deleteManyStudent(@Query('id') ids: string[]) {
    return this.studentsService.deleteManyOnStudents(ids);
  }
}
