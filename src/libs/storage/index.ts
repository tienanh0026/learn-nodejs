import fs from 'fs'
import multer from 'multer'
import path from 'path'

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase()
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join('src', 'public', 'storage')
    console.log('uploadPath', uploadPath)

    if (file.mimetype.startsWith('image')) {
      uploadPath += '/image'
    } else if (file.mimetype.startsWith('video')) {
      uploadPath += '/video'
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    // Generate unique filename using UUID
    const { filename } = req.query
    const ext = filename ? filename + path.extname(file.originalname) : file.originalname
    cb(null, `${Date.now()}-` + sanitizeFilename(ext))
  }
})

const upload = multer({ storage: storage })

const getFilePathname = (file: Express.Multer.File) => {
  const filename = file.filename
  let path = '/storage'
  if (file.mimetype.startsWith('image')) {
    path += '/image/'
  } else if (file.mimetype.startsWith('video')) {
    path += '/video/'
  }
  return path + filename
}
export { upload, getFilePathname }
