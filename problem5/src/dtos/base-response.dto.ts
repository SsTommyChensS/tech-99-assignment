export interface BaseResponseDto<T = any> {
  success: boolean
  message: string
  data?: T
}
