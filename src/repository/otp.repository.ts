import { OtpCreateParams, OtpEntity } from '@/domain/entity/otp.entity'

export interface OtpRepository {
  createOtp(otp: OtpCreateParams): Promise<OtpEntity>
  findOtp(userId: string, otp: string): Promise<OtpEntity | null>
  delete(id: string): Promise<unknown>
}
