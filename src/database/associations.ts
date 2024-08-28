import { AuthModel } from '@/database/models/auth/auth.model'
import { UserModel } from '@/database/models/user/user.model'
import { RoomModel } from './models/room/room.model'
import { MessageModel } from './models/message/message.model'
import { SubscriptionModel } from './models/subscription/subscription.model'
import { RoomUserModel } from './models/room-user/room-user.model'
import { ScheduleMessageModel } from './models/schedule-message/schedule-message.model'

UserModel.hasMany(AuthModel, { foreignKey: 'userId', sourceKey: 'id' })
AuthModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id' })

// RoomModel.hasOne(AuthModel, { foreignKey: 'ownerId', sourceKey: 'id' })
RoomModel.hasOne(UserModel, {
  foreignKey: 'id',
  sourceKey: 'ownerId',
  as: 'owner'
})
MessageModel.hasOne(RoomModel, {
  foreignKey: 'id',
  sourceKey: 'roomId',
  as: 'room'
})

MessageModel.hasOne(UserModel, {
  foreignKey: 'id',
  sourceKey: 'ownerId',
  as: 'owner'
})

SubscriptionModel.belongsTo(UserModel, {
  foreignKey: 'id'
})

SubscriptionModel.belongsTo(RoomModel, {
  foreignKey: 'id'
})

RoomUserModel.hasOne(UserModel, {
  foreignKey: 'id',
  sourceKey: 'userId',
  as: 'user'
})

RoomUserModel.hasOne(RoomModel, {
  foreignKey: 'id',
  sourceKey: 'userId',
  as: 'room'
})

UserModel.hasOne(ScheduleMessageModel, {
  foreignKey: 'ownerId',
  sourceKey: 'id'
  // as: 'owner'
})
