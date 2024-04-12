import database from '@/services/database/database'
import { DataType, Model } from 'sequelize-typescript'

interface UserAttributes {
  id: number
  name: string
  email: string | null
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number
  public name!: string
  public email!: string | null
}

export const UserModel = database.define<User>('user123', {
  id: {
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      min: 2,
      max: 50
    }
  },
  email: {
    type: DataType.STRING(60),
    validate: {
      isEmail: true
    },
    unique: true
  }
})
