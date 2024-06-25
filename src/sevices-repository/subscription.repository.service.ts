import { SubscriptionModel } from '@/database/models/subscription/subscription.model'
import { SubscriptionCreateParams, SubscriptionEnity } from '@/domain/entity/subscription.entity'
import { SubscriptionRepository } from '@/repository/subscription.repository'
import { Sequelize } from 'sequelize'

export class SubscriptionRepositoryService implements SubscriptionRepository {
  create(params: SubscriptionCreateParams): Promise<SubscriptionEnity> {
    return SubscriptionModel.create(params)
  }
  softDelete(params: Partial<SubscriptionEnity>) {
    return SubscriptionModel.update(
      {
        deletedAt: Sequelize.fn('NOW')
      },
      {
        where: params
      }
    )
  }
  delete(params: Partial<SubscriptionEnity>) {
    return SubscriptionModel.destroy({ where: params, force: true })
  }
  findAll(params: Partial<SubscriptionEnity>) {
    return SubscriptionModel.findAll({ where: params, paranoid: true })
  }
}
