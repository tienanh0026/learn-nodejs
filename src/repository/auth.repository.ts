import { AuthEntity, AuthCreateParams } from '@/domain/entity/auth.entity'

export interface AuthRepository {
  create(auth: AuthCreateParams): Promise<AuthEntity>
}
