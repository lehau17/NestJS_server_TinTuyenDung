import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
/**
 * PartialType(CreateUserDto) : kế thừa toàn bộ thuộc tính của thằng truyền vào
 * OmitType(CreateUserDto, [''] as const) : Loại bỏ những trường k mún kế thừa
 */
export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {}
