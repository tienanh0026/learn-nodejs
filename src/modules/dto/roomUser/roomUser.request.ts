import { RoomUserRole } from '@/domain/entity/roomUser.entity'

type AddUserRequestBody = {
  user: {
    id: string
    role: RoomUserRole
  }[]
}

type RemoveUserRequestBody = {
  userId: string
}

type AddUserRequestParams = {
  roomId: string
}

type ReadMessageRequestBody = {
  messageId: string
}

export type { AddUserRequestBody, AddUserRequestParams, RemoveUserRequestBody, ReadMessageRequestBody }
