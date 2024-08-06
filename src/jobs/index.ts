// import { validateSubscriptions } from '@/libs/web-push/'
import cron from 'node-cron'

cron.schedule('* * * * *', () => {
  console.log('Schedule at ', new Date().toLocaleString())
})

export default cron
// validateSubscriptions()
