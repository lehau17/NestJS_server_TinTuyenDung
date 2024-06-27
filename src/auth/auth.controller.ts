import { LocalAuthGuard } from './local-auth.guard'

import { AuthService } from './auth.service'
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { Public } from 'src/decoration/customize'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user
  }
}
