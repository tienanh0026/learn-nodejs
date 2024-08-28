import { MessageType } from './message.entity'

export type ScheduleMessageEntity = {
  id: string
  ownerId: string
  roomId: string
  messageId: string
  content: string
  type: MessageType
  media?: string
  createdAt: string
  scheduleAt: string
}

export type ScheduleMessageCreateParams = Omit<ScheduleMessageEntity, 'createdAt'>
