import { AuthService } from './auth/auth.service'
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { Public } from './decoration/customize'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private authService: AuthService
  ) {}
}
