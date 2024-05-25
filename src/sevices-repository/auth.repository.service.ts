import { AuthCreateParams, AuthEntity } from '@/domain/entity/auth.entity'
import { AuthModel } from '@/models/auth/auth.model'
import { AuthRepository } from '@/repository/auth.repository'

export class AuthRepositoryService implements AuthRepository {
  create(auth: AuthCreateParams): Promise<AuthEntity> {
    return AuthModel.create(auth)
  }
}
