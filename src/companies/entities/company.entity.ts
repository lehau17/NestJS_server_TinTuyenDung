import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CompanyDocument = HydratedDocument<Company>

@Schema({ timestamps: true })
export class Company {
  @Prop()
  name: string

  @Prop()
  address: string

  @Prop()
  desciption: string

  @Prop()
  createdAt: Date

  @Prop()
  updateAt: Date

  @Prop()
  isDeleted: boolean
  @Prop()
  deletedAt: Date

  @Prop({ type: {} })
  createdBy: { _id: string; email: string }

  @Prop({ type: {} })
  updatedBy: { _id: string; email: string }

  @Prop({ type: {} })
  deletedBY: { _id: string; email: string }
}

export const CompanySchema = SchemaFactory.createForClass(Company)
