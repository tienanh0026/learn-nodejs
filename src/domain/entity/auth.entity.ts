export type AuthEntity = {
  id: string
  userId: string
  token: string
  createdAt: string
  deletedAt?: Date
}

export type AuthCreateParams = Omit<AuthEntity, 'createdAt' | 'deletedAt'>
