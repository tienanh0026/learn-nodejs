import sequelizeConnection from '@/database/connection'
import { OtpCreateParams, OtpEntity } from '@/domain/entity/otp.entity'
import { Model } from 'sequelize'
import { DataType } from 'sequelize-typescript'

export class Otp extends Model<OtpEntity, OtpCreateParams> implements OtpEntity {
  public id!: string
  public userId!: string
  public otp!: string
  public expiresAt!: Date
  public createdAt!: string
  public updatedAt!: string
}

export const OtpModel = sequelizeConnection.define<Otp>(
  'otp',
  {
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
    otp: {
      field: 'otp',
      type: DataType.STRING,
      allowNull: false
    },
    expiresAt: {
      field: 'expires_at',
      type: DataType.DATE,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: 'timestamp',
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: 'timestamp',
      allowNull: false
    }
  },
  {
    tableName: 'otp',
    paranoid: false
  }
)
