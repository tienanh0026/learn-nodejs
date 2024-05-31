import { UserCreateParams, UserEntity } from '@/domain/entity/user.entity'
import database from '@/services/database/database'
import { DataType, Model } from 'sequelize-typescript'

export class User extends Model<UserEntity, UserCreateParams> implements UserEntity {
  public id!: string
  public name!: string
  public email!: string
  public createdAt!: string
  public updatedAt!: string
  public password!: string
}

export const UserModel = database.define<User>(
  'user',
  {
    id: {
      field: 'id',
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataType.UUIDV4
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
    password: {
      field: 'password',
      type: DataType.STRING(60),
      allowNull: false,
      validate: {
        min: 6
      }
    },
    createdAt: {
      field: 'created_at',
      type: 'timestamp',
      allowNull: false
      // defaultValue: database.fn('NOW')
    },
    updatedAt: {
      field: 'updated_at',
      type: 'timestamp',
      // defaultValue: database.fn('NOW'),
      allowNull: false
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    scopes: {
      withPassword: {
        attributes: {
          exclude: []
        }
      }
    }
  }
)
