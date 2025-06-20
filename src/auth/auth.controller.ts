import { Controller, Body, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './constants/constants'
import { AuthDTO } from './dto/auth.dto'

interface TokenResponse {
  status?: number
  accessToken?: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async signIn(@Body() login: AuthDTO): Promise<TokenResponse> {
    const authLogin = await this.authService.signIn(login)
    return authLogin
  }
}
