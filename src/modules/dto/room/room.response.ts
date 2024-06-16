import { RoomDetailEntity, RoomEntity } from '@/domain/entity/room.entity'

type RoomCreateResponse = RoomEntity

type RoomGetListResponse = RoomEntity[]

type RoomDetailResponse = RoomDetailEntity

export type { RoomCreateResponse, RoomGetListResponse, RoomDetailResponse }
