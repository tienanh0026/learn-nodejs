import database from '@/services/database/database'
import { DataType, Model } from 'sequelize-typescript'

export interface UserAttributes {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number
  public name!: string
  public email!: string
  public createdAt?: Date
  public updatedAt?: Date
}

export const UserModel = database.define<User>('user', {
  id: {
    field: 'id',
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    field: 'name',
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      min: 2,
      max: 50
    }
  },
  email: {
    field: 'email',
    type: DataType.STRING(60),
    validate: {
      isEmail: true
    },
    unique: true
  },
  createdAt: {
    field: 'created_at',
    type: 'timestamp',
    allowNull: false,
    defaultValue: database.fn('NOW')
  },
  updatedAt: {
    field: 'updated_at',
    type: 'timestamp',
    defaultValue: database.fn('NOW'),
    allowNull: false
  }
})
