type RoomSubcribeNotiRequest = {
  key: string
  subscriptionId: string
  endpoint: string
}

type RoomUnsubscribeNotiRequest = {
  endpoint: string
}

export type { RoomSubcribeNotiRequest, RoomUnsubscribeNotiRequest }
