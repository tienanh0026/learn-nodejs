import { AuthModel } from '@/models/auth/auth.model'
import { UserModel } from '@/models/user/user.model'
import database from './database'

UserModel.hasMany(AuthModel, { foreignKey: 'userId', sourceKey: 'id' })
AuthModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id' })

//only run when create table
database.sync()
