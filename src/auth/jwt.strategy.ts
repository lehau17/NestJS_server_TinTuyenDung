import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IUser } from 'src/users/user.interface'
//provider tiêm cho toàn bộ dự án tự động chạy hàm validate và gán vào req.user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY')
    })
  }

  async validate(payload: IUser) {
    const { _id, name, email, role } = payload
    return { _id, name, email, role }
  }
}
