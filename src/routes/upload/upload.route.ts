import { formatResponse } from '@/common/response/response'
import { upload } from '@/libs/storage'
import { Router } from 'express'

const uploadFileRoute = Router()
uploadFileRoute.post('/upload/file/', upload.single('file'), (req, res) => {
  const filename = req.file?.filename
  let path = '/storage'
  if (req.file?.mimetype.startsWith('image')) {
    path += '/image/'
  } else if (req.file?.mimetype.startsWith('video')) {
    path += '/video/'
  }
  const response = formatResponse({
    filename: path + filename
  })
  res.json(response)
})
export default uploadFileRoute
