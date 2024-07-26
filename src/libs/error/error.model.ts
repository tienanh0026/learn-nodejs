export default class BaseError<T> extends Error {
  public readonly httpCode: number
  public readonly data: T | undefined
  constructor(message: string, httpCode: number, data?: T) {
    super(message) // Pass the message to the Error constructor
    Object.setPrototypeOf(this, new.target.prototype) // Ensure proper prototype chain
    this.name = this.constructor.name
    this.httpCode = httpCode
    this.data = data
    Error.captureStackTrace(this, this.constructor)
  }
  getStatus() {
    return this.httpCode
  }
}
