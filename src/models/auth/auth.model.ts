import { AuthCreateParams, AuthEntity } from '@/domain/entity/auth.entity'
import database from '@/services/database/database'
import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export class Auth extends Model<AuthEntity, AuthCreateParams> implements AuthEntity {
  public id!: string
  public userId!: string
  public token!: string
  public createdAt!: string
  public deletedAt!: Date
}

export const AuthModel = database.define<Auth>('auth', {
  id: {
    field: 'id',
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  },
  userId: {
    field: 'user_id',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4
  },
  token: {
    field: 'token',
    allowNull: false,
    type: DataType.STRING
  },
  createdAt: {
    field: 'created_at',
    type: 'timestamp',
    allowNull: false
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataType.DATE,
    allowNull: true
  }
})
