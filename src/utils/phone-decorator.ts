import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPhoneBR(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneBR',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage() {
          return 'Telefone inválido. Use o formato (11) 91234-5678 ou 11912345678';
        },
      },
    });
  };
}
