import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // cấu hình global check header jwt
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  app.useGlobalPipes(new ValidationPipe())
  //cors config
  app.enableCors()
  await app.listen(port)
}
bootstrap()
