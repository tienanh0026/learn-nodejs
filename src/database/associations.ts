import { AuthModel } from '@/database/models/auth/auth.model'
import { UserModel } from '@/database/models/user/user.model'
import { RoomModel } from './models/room/room.model'

UserModel.hasMany(AuthModel, { foreignKey: 'userId', sourceKey: 'id' })
AuthModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id' })

// RoomModel.hasOne(AuthModel, { foreignKey: 'ownerId', sourceKey: 'id' })
RoomModel.hasOne(UserModel, { foreignKey: 'id', sourceKey: 'ownerId' })
