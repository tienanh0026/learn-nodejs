import { Request } from 'express'

function getToken(req: Request<unknown>) {
  return req.headers.authorization?.replace('Bearer ', '') || ''
}

export { getToken }
