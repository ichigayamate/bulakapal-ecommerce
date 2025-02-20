export type HTTPError = {
  code: number,
  message: string
}

export type PaginatedData<T> = {
  data: T[],
  page: number,
  limit: number,
  total: number
}