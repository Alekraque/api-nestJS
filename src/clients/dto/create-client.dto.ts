import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator'



export class CreateClientDto {
  @IsString({ message: 'O nome deve ser um conjunto de letras' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @Length(8, 255)
  email: string

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'Telefone deve ser uma string' })
  @IsPhoneNumber('BR', { message: 'Telefone deve estar no formato +55 11 12345-6789' })
  telefone: string
  
  @IsNotEmpty({ message: 'Role é obrigatória' })
  @IsString({ message: 'Role deve ser uma string' })
  role: string

  @IsOptional()
  user_id: string
}