import { IsValidType } from '../../decorators/isValidType.decorator';

export class CourseTypeDto {
  @IsValidType()
  course: 'web' | 'computer-learning' | 'computer-repairing';
}
