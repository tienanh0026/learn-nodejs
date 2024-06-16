export interface ServerToClientEvents {
  serverMsg: (data: { content: string; roomId: string }) => void
}
