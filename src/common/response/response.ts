import { ResponseBody } from '@/controllers/types'

function formatResponse<T>(data: T) {
  const response: ResponseBody<T> = {
    message: 'success',
    data: data
  }
  return response
}

export { formatResponse }
