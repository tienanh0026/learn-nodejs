type CreateMessageRequest = {
  content: string
}

type GetMessageListRequestQuery = {
  page?: string
  perPage?: string
}

export type { CreateMessageRequest, GetMessageListRequestQuery }
