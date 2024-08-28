import { ScheduleMessageCreateParams, ScheduleMessageEntity } from '@/domain/entity/scheduleMessage.entity'

export interface ScheduleMessageRepository {
  create(scheduleMessage: ScheduleMessageCreateParams): Promise<ScheduleMessageEntity>
  getOneById(id: string): Promise<ScheduleMessageEntity | null>
  getAllByUserId(id: string): Promise<ScheduleMessageEntity[]>
  delete(id: string): Promise<unknown>
  getAll(): Promise<ScheduleMessageEntity[]>
  getOneByMessageId(id: string): Promise<ScheduleMessageEntity | null>
}
