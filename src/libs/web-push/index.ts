import webpush from 'web-push'

const publicKey = process.env.WEB_PUSH_PUBLIC || ''
const privateKey = process.env.WEB_PUSH_PRIVATE || ''

webpush.setVapidDetails('mailto:tienahn0026@gmail.com', publicKey, privateKey)

export { webpush }
