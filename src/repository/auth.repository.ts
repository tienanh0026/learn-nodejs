import { AuthEntity, AuthCreateParams } from '@/domain/entity/auth.entity'

export interface AuthRepository {
  saveToken(auth: AuthCreateParams): Promise<AuthEntity>
  getAuth(token: string): Promise<AuthEntity | null>
}
