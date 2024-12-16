import { ResponseBody, ResponseErrorBody } from '@/controllers/types'

function formatResponse<T>(data: T, message?: string) {
  const response: ResponseBody<T> = {
    message: message || 'success',
    data: data
  }
  return response
}

function formatErrorReponse<T>(data: T, message?: string) {
  const response: ResponseErrorBody<T> = {
    message: message || 'success',
    errors: data
  }
  return response
}

export { formatResponse, formatErrorReponse }
