import { SubscriptionCreateParams, SubscriptionEnity } from '@/domain/entity/subscription.entity'

interface SubscriptionRepository {
  create: (params: SubscriptionCreateParams) => Promise<SubscriptionEnity>
  delete: (params: Partial<SubscriptionEnity>) => void
  softDelete: (params: Partial<SubscriptionEnity>) => void
}

export type { SubscriptionRepository }
