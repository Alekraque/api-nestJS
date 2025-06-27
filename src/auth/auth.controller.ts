import { Controller, Body, Post, Res, UseGuards, Req, Get } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { Public } from './constants/constants'
import { AuthDTO } from './dto/auth.dto'
import { AuthGuard } from './AuthGuard/authGuard'

interface TokenResponse {
  status?: number
  accessToken?: string
}

interface AuthRequest extends Request{
  user: {
    id: string
    email: string
    role: string
    iat: number
    exp: number
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async signIn(
    @Body() login: AuthDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenResponse> {
    const authLogin = await this.authService.signIn(login)

    if (authLogin.accessToken) {
      res.cookie('token', authLogin.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        path: '/',
      })
    }

    return authLogin
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  authProfile(@Req() req:AuthRequest):object {
    return req.user
  }
}
