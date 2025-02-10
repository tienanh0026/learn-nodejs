import { formatErrorReponse } from '@/common/response/response'
import rateLimit from 'express-rate-limit'

const otpLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: formatErrorReponse(null, 'You can only make 1 requests every mintute.')
})

export { otpLimiter }
