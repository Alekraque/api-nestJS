import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator'

export class CreateClientDto {
  @IsString({ message: 'O nome deve ser um conjunto de letras' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @Length(3, 40, {message: "Seu nome nao pode exceder 40 caracteres"})
  name: string

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'Telefone deve ser uma string' })
  // @IsPhoneNumber('BR', {
  //   message: 'Telefone deve estar no formato +55 11 12345-6789',
  // })
  @Length(13, 15, {message: "Telefone invalido"})
  telefone: string

  @IsOptional()
  user_id: string
}
