import { ResponsePaginationData } from '@/controllers/types'
import { MessageEntity } from '@/domain/entity/message.entity'

type GetMessageListResponse = ResponsePaginationData<MessageEntity[]>

export type { GetMessageListResponse }
