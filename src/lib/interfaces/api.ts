export type PaginatedData<T> = {
  data: T[],
  page: number,
  limit: number,
  total: number
}