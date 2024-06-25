type SubscriptionEnity = {
  id: string
  userId: string
  roomId: string
  endpoint: string
  key: JSON
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

type SubscriptionCreateParams = Omit<SubscriptionEnity, 'createdAt' | 'updatedAt' | 'deletedAt'>

export type { SubscriptionCreateParams, SubscriptionEnity }
