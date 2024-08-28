import { ScheduleMessageCreateParams } from '@/domain/entity/scheduleMessage.entity'

type CreateScheduleMessageBody = Omit<
  ScheduleMessageCreateParams,
  'id' | 'messageId' | 'ownerId' | 'roomId' | 'media' | 'scheduleAt'
> & {
  scheduleAt: string
}

type MessageScheduleMessageParams = {
  roomId: string
}

export type { CreateScheduleMessageBody, MessageScheduleMessageParams }
