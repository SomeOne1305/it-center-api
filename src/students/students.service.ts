import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';
//DTOS
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
//Schemas
import { StudentDocument, Student } from './schema/student.schema';
import { RequestDocument, Requests } from './schema/requests.schema';
import { identifyCourse } from 'src/helpers';
import { isMongoId } from 'class-validator';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly students: Model<StudentDocument>,
    @InjectModel(Requests.name)
    private readonly requestedCustomers: Model<RequestDocument>,
    private readonly mailer: MailerService,
  ) {}


  async create(createStudentDto: CreateStudentDto) {
    try {
      const data = await this.requestedCustomers.create(createStudentDto);
      await this.mailer.sendMail({
        from:"anonymousmrx55@mail.ru",
        to: 'anonymousmrx55@gmail.com',
        subject: `${data.name} ${data.surname} ${identifyCourse(data.course)} kursiga yozildi.`,
        template: '',
      });
      return {
        status: 201,
        message: 'You are registered successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException({
        status: 500,
        message: error,
        data: [],
      })
    }
  }

  async findAllReqClients() {
    try {
      return {
        status: 200,
        message: 'Datas are ready to use',
        data: await this.requestedCustomers.find({}),
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneReqClient(id: string) {
    if (isMongoId(id)) {
      try {
        return {
          status: 200,
          message: 'Data is ready to use',
          data: await this.requestedCustomers.findById(id),
        };
      } catch (error) {
        throw error;
      }
    } else {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid ID',
      });
    }
  }

  async acceptReqClient(id: string) {
    if (isMongoId(id)) {
      try {
        const reqClient = await this.requestedCustomers.findById(id);
        const newStudent = await this.students.create({
          name: reqClient.name,
          surname: reqClient.surname,
          phone_number: reqClient.phone_number,
          course: reqClient.course,
        });
        await this.requestedCustomers.deleteOne({ _id: id });
        return {
          status: HttpStatus.ACCEPTED,
          message: 'Client is accepted',
          data: newStudent,
        };
      } catch (error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Error occured',
          error: error,
        };
      }
    } else {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid ID',
      });
    }
  }

  async cancelReqClient(id: string) {
    if (isMongoId(id)) {
      try {
        return {
          status: 200,
          message: 'User data is deleted successfully',
          data: await this.requestedCustomers.findByIdAndDelete(id),
        };
      } catch (error) {
        throw error;
      }
    } else {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid ID',
      });
    }
  }

  async findAllStudents(){
    try {
      return {
        status: 200,
        message: 'Datas are ready to use',
        data: await this.students.find({}),
      };
    } catch (error) {
      return{
        status:HttpStatus.BAD_REQUEST,
        message:"Error occured",
        error
      }
    }
  }

  
}
