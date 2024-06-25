type RoomSubcribeNotiRequest = {
  key: JSON
  subscriptionId: string
  endpoint: string
}

type RoomUnsubscribeNotiRequest = {
  endpoint: string
}

export type { RoomSubcribeNotiRequest, RoomUnsubscribeNotiRequest }
