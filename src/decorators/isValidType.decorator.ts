// is-valid-type.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidType', async: false })
export class IsValidTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return ['web', 'computer-learning', 'computer-repairing'].includes(value);
  }

  defaultMessage() {
    return 'Invalid course type';
  }
}

export function IsValidType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidTypeConstraint,
    });
  };
}
