import { ResponseBody } from '@/controllers/types'

function formatResponse<T>(data: T, message?: string) {
  const response: ResponseBody<T> = {
    message: message || 'success',
    data: data
  }
  return response
}

export { formatResponse }
