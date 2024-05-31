export default class BaseError extends Error {
  public readonly httpCode: number

  constructor(message: string, httpCode: number) {
    super(message) // Pass the message to the Error constructor
    Object.setPrototypeOf(this, new.target.prototype) // Ensure proper prototype chain
    this.name = this.constructor.name
    this.httpCode = httpCode
    Error.captureStackTrace(this, this.constructor)
  }

  getStatus() {
    return this.httpCode
  }
}
