import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(cpf: any, args: ValidationArguments) {
          if (typeof cpf !== 'string') return false;

          cpf = cpf.replace(/[^\d]/g, '');

          if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

          let sum = 0;
          for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
          let firstCheckDigit = (sum * 10) % 11;
          if (firstCheckDigit === 10 || firstCheckDigit === 11) firstCheckDigit = 0;
          if (firstCheckDigit !== parseInt(cpf.charAt(9))) return false;

          sum = 0;
          for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
          let secondCheckDigit = (sum * 10) % 11;
          if (secondCheckDigit === 10 || secondCheckDigit === 11) secondCheckDigit = 0;
          return secondCheckDigit === parseInt(cpf.charAt(10));
        },
        defaultMessage(): string {
          return 'CPF inválido';
        },
      },
    });
  };
}
