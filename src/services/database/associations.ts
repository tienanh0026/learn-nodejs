import { AuthModel } from '@/database/models/auth/auth.model'
import { UserModel } from '@/database/models/user/user.model'

UserModel.hasMany(AuthModel, { foreignKey: 'userId', sourceKey: 'id' })
AuthModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id' })
