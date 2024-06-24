import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUserName(username)
    if (user) {
      const isMatch = this.usersService.isValidPassword(password, user.password)
      if (isMatch) {
        return user
      }
    }
    return null
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}