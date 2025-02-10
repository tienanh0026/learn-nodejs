export type OtpEntity = {
  id: string
  userId: string
  otp: string
  expiresAt: Date
  createdAt: string
  updatedAt: string
}

export type OtpCreateParams = Omit<OtpEntity, 'id' | 'createdAt' | 'updatedAt'>
