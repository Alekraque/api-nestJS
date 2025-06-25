import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class AuthDTO {
  @IsNotEmpty()
  @IsEmail({}, {message: "Precisa ser um e-mail"})
  email: string

  @IsNotEmpty()
  @MinLength(6, {message: "A senha deve ter no minimo 6 caracteres"})
  password: string
}
