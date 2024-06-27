import { Injectable } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Company, CompanyDocument } from './entities/company.entity'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { IUser } from 'src/users/user.interface'
import aqp from 'api-query-params'

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) {}
  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const company = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: { _id: user._id, email: user.email }
    })
    return company
  }
  /**
   *
   *
   */
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs)
    //không sử dụng mặt định vì lấy tham số từ query url
    delete filter.page
    delete filter.limit

    const offset = (+currentPage - 1) * +limit
    const defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.companyModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore : Unreachable code
      .sort(sort)
      .populate(population)
      .exec()

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.updateOne({ _id: id }, { ...updateCompanyDto })
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.updateOne(
      { _id: id },
      { deletedAt: { _id: user._id, email: user.email } }
    )
    return this.companyModel.softDelete({ _id: id })
  }
}
