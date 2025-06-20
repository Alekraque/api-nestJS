import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt-ts';
import { UsersService } from 'src/users/users.service';
import { AuthDTO } from './dto/create-auth.dto';


interface SignInResponse {
  status?: number
  accessToken?: string
  errorMessage?: string
}

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService, 
    private readonly jwtService: JwtService
  ) {}

  async signIn(login: AuthDTO):Promise<SignInResponse> {
    const user = await this.userService.findOneByEmail(login.email)
    
    if(!user) {
      return {
        status: 404,
        errorMessage: "Usuario nao encontrado"
      }
    }
    const match = await compare(login.password, user.password)

    if(!match) {
      return {
        status: 400,
        errorMessage: "credenciais invalidas"
      }
    }
    const payload = {id: user.id, username: user.email}
    return {
      status: 200,
      accessToken : await this.jwtService.signAsync(payload)
    }
  }
}
