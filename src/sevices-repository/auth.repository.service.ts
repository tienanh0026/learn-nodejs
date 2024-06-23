import { AuthCreateParams, AuthEntity } from '@/domain/entity/auth.entity'
import { AuthModel } from '@/database/models/auth/auth.model'
import { AuthRepository } from '@/repository/auth.repository'
import { Sequelize } from 'sequelize'

export class AuthRepositoryService implements AuthRepository {
  saveToken(auth: AuthCreateParams): Promise<AuthEntity> {
    return AuthModel.create(auth)
  }
  getAuth(token: string) {
    return AuthModel.findOne({
      where: { token: token }
    })
  }
  deleteToken(token: string) {
    return AuthModel.update(
      { deletedAt: Sequelize.fn('NOW') },
      {
        where: {
          token
        },
        paranoid: false
      }
    )
  }
}
