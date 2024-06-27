import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { IUser } from 'src/users/user.interface'
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
  async login(user: IUser) {
    const { _id, name, email, role } = user
    const payload = { sub: 'token login', iss: 'from server', _id, name, email, role }
    return {
      access_token: this.jwtService.sign(payload),
      _id,
      name,
      email,
      role
    }
  }
}
