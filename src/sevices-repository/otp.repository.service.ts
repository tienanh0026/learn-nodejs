import { OtpModel } from '@/database/models/otp/otp.model'
import { OtpCreateParams, OtpEntity } from '@/domain/entity/otp.entity'
import { OtpRepository } from '@/repository/otp.repository'

export class OtpRepositoryService implements OtpRepository {
  createOtp(otp: OtpCreateParams): Promise<OtpEntity> {
    return OtpModel.create(otp)
  }
  findOtp(userId: string, otp: string): Promise<OtpEntity | null> {
    return OtpModel.findOne({
      where: {
        otp,
        userId
      },
      paranoid: false
    })
  }
  delete(id: string): Promise<unknown> {
    return OtpModel.destroy({
      where: { id }
    })
  }
}
