type ResponseBody<T> = {
  message: string
  data: T
}

type ResponsePaginationData<T> = {
  list: T
  perPage: number
  currentPage: number
  total: number
  totalPages: number
}

export { ResponseBody, ResponsePaginationData }
