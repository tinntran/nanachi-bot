import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, '../public')))

app.all('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

export default () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!!!`)
  })
}
