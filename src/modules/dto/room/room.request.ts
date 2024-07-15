import { RoomType } from '@/domain/entity/room.entity'

type RoomCreateReq = {
  name: string
  image?: string
  type?: RoomType
}
type RoomEditReq = {
  name: string
  image?: string
  type?: RoomType
}

export type { RoomCreateReq, RoomEditReq }
