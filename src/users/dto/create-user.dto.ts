import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

/**
 * dio : data transfer object
 * Match data gửi từ decorator lấy ra các trường được khai báo ở đây
 */
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  @MinLength(8)
  password: string
  name: string
  address: string
}
