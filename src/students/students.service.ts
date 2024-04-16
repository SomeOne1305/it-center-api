import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//DTOS
import { CreateStudentDto } from './dto/create-student.dto';
//Schemas
import { isMongoId } from 'class-validator';
import { identifyCourse } from 'src/helpers';
import renderTemplate from 'src/mail/template';
import { RequestDocument, Requests } from './schema/requests.schema';
import { Student, StudentDocument } from './schema/student.schema';

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
        from: 'anonymousmrx55@mail.ru',
        to: 'itpark00001@gmail.com',
        subject: `${data.name} ${data.surname} ${identifyCourse(data.course)} kursiga yozildi.`,
        html: renderTemplate(
          data.name,
          data.surname,
          identifyCourse(data.course),
        ),
      });
      return {
        status: 201,
        message: 'You are registered successfully',
        data,
      };
    } catch (error) {
      throw {
        status: 500,
        message: error,
        data: [],
      };
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
      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.error,
      };
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
        return {
          success: false,
          message: error.response.data.message,
          error: error.response.data.error,
        };
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
          success: false,
          message: error.response.data.message,
          error: error.response.data.error,
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
        return {
          success: false,
          message: error.response.data.message,
          error: error.response.data.error,
        };
      }
    } else {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid ID',
      });
    }
  }

  async deleteManyOnReq(ids: string[]) {
    try {
      await this.requestedCustomers.deleteMany({ _id: { $in: ids } }).exec();
      return {
        status: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error,
      };
    }
  }

  async findAllStudents() {
    try {
      return {
        status: 200,
        message: 'Datas are ready to use',
        data: await this.students.find({}),
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.error,
      };
    }
  }

  async deleteStudent(id: string) {
    if (isMongoId(id)) {
      try {
        await this.students.deleteOne({ _id: id });
        return {
          status: HttpStatus.OK,
          message: 'Student is removed successfully !',
        };
      } catch (error) {
        return {
          success: false,
          message: error.response.data.message,
          error: error.response.data.error,
        };
      }
    } else {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid ID',
      });
    }
  }

  async deleteManyOnStudents(ids: string[]) {
    try {
      await this.students.deleteMany({ _id: { $in: ids } }).exec();
      return {
        status: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error,
      };
    }
  }

  async GetStudentByCategory(
    course: 'web' | 'computer-learning' | 'computer-repairing',
  ) {
    try {
      return {
        status: 200,
        message: 'Datas are ready to use',
        data: await this.students.find({ course: course }),
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.error,
      };
    }
  }
}
