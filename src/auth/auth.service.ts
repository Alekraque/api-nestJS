import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt-ts'
import { UsersService } from 'src/users/users.service'
import { AuthDTO } from './dto/auth.dto'

interface SignInResponse {
  status?: number
  accessToken?: string
  errorMessage?: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(login: AuthDTO): Promise<SignInResponse> {
    const user = await this.userService.findOneByEmail(login.email)

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }
    const match = await compare(login.password, user.password)

    if (!match) {
      throw new UnauthorizedException('Credenciais inválidas')
    }
    const payload = { id: user.id, username: user.email }
    return {
      status: 200,
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
