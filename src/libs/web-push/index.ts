import { MessageRepositoryService } from '@/sevices-repository/message.repository.service'
import { SubscriptionRepositoryService } from '@/sevices-repository/subscription.repository.service'
import { Op } from 'sequelize'
import webpush from 'web-push'

const _subscriptionRepositoryService = new SubscriptionRepositoryService()
const _messageRepositoryService = new MessageRepositoryService()

const publicKey = process.env.WEB_PUSH_PUBLIC || ''
const privateKey = process.env.WEB_PUSH_PRIVATE || ''
webpush.setVapidDetails('mailto:tienahn0026@gmail.com', publicKey, privateKey)

const sendPushNotification = async (messageId: string, ownerId: string) => {
  try {
    const message = await _messageRepositoryService.getOne(messageId)
    if (!message) return
    console.log(message)

    const subscriptionList = await _subscriptionRepositoryService.findAll({
      roomId: message.room.id,
      userId: {
        [Op.ne]: ownerId
      }
    })
    for (const subscription of subscriptionList) {
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: JSON.parse(JSON.stringify(subscription.key)) as { p256dh: string; auth: string }
      }
      console.log(pushSubscription)
      webpush
        .sendNotification(
          pushSubscription,
          JSON.stringify({
            title: `In room ${message.room.name}`,
            body: message.content,
            data: {
              roomId: message.room.id
            },
            cons123: 'test'
          })
        )
        .then(() => {
          console.log('Push notification sent successfully')
        })
        .catch((error) => {
          _subscriptionRepositoryService.delete({
            id: subscription.id
          })
          console.error('Failed to send push notification', error)
        })
    }
  } catch (error) {
    console.log('co loi', error)
  }
}

const validateSubscriptions = async () => {
  try {
    const subscriptionList = await _subscriptionRepositoryService.findAll()
    for (const subscription of subscriptionList) {
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: JSON.parse(JSON.stringify(subscription.key)) as { p256dh: string; auth: string }
      }
      console.log(pushSubscription)
      webpush.sendNotification(pushSubscription, JSON.stringify({ silent: true })).catch((error) => {
        _subscriptionRepositoryService.delete({
          id: subscription.id
        })
        console.error('Failed to send push notification', error)
      })
    }
  } catch (error) {
    //
  }
}

export { webpush, sendPushNotification, validateSubscriptions }
