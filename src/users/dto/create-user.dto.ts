import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { IsCPF } from 'src/utils/cpf-decorator'
import { IsPhoneBR } from 'src/utils/phone-decorator'

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser um conjunto de letras' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string

  @IsString({ message: 'A senha deve ser um conjunto de letras' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'Telefone deve ser uma string' })
  @IsPhoneBR({ message: 'Telefone deve estar no formato (XX) XXXXX-XXXX' })
  telefone: string

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString({ message: 'CPF deve ser uma string' })
  @IsCPF({ message: 'CPF deve estar no formato 000.000.000-00' })
  cpf: string

  @IsNotEmpty({ message: 'Role é obrigatória' })
  @IsString({ message: 'Role deve ser uma string' })
  role: string
}
