// import HttpStatusCode from 'http-status-codes'

// export class HttpException1 extends Error {
//   status: number
//   constructor(message: string, status: number) {
//     super()
//     this.message = message
//     this.status = status
//     // this.name = 'HttpException1'
//     this.name = this.constructor.name
//   }
//   getStatus() {
//     return this.status
//   }
// }
export class HttpException extends Error {
  status: number
  constructor(message: string, status: number) {
    super()
    this.message = message
    this.status = status
    // this.name = 'HttpException1'
    this.name = this.constructor.name
  }
  getStatus() {
    return this.status
  }
}

export class BaseError extends Error {
  public readonly message: string
  public readonly httpCode: number

  constructor(message: string, httpCode: number) {
    super()
    // Object.setPrototypeOf(this, new.target.prototype)

    this.message = message
    this.httpCode = httpCode

    // Error.captureStackTrace(this)
  }
  getStatus() {
    return this.httpCode
  }
}
