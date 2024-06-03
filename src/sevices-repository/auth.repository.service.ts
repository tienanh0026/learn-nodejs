import { AuthCreateParams, AuthEntity } from '@/domain/entity/auth.entity'
import { AuthModel } from '@/models/auth/auth.model'
import { AuthRepository } from '@/repository/auth.repository'

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
      { deletedAt: new Date() }, // Set the `deletedAt` field to the current timestamp
      {
        where: {
          token
        },
        paranoid: false
      }
    )
  }
}
