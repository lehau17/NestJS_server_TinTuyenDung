import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import mongoose, { Model } from 'mongoose'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
@Injectable()
export class UsersService {
  // kéo User đã được khai báo bên model về sửa dụng
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) {}

  //hash password
  private hashPassword(password: string) {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      ...createUserDto,
      password: this.hashPassword(createUserDto.password)
    })
    return user
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'id is not valid'
    return this.userModel.findOne({ _id: id })
  }

  isValidPassword(password: string, hash: string): boolean {
    return compareSync(password, hash)
  }

  findUserByUserName(userName: string) {
    return this.userModel.findOne({ email: userName })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'id is not valid'

    return this.userModel.updateOne({ _id: id }, { ...updateUserDto })
  }

  remove(id: string) {
    return this.userModel.softDelete({_id:id})
  }
}
