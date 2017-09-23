const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const app = express()
const log = require('./src/log')

dotenv.config()

// Express middleware: json request parser
app.use(bodyParser.json())

// Express static files
app.use(express.static('public'))

// Express routes
require('./src/routes/v1')(app)

// Express middleware: error handler
app.use((error, req, res, next) => {
  if (!(error instanceof Object)) {
    res.status(500).send({ error })
  }

  const message = error.message || 'Oops... Some dog ate your request!'
  const status = error.status || 500
  const type = error.name || 'InternalServerError'
  res.status(status).send({ error: message, type })
})

// Initialize Express server
const port = process.env.PORT
app.listen(port, () => log.info('Up and running!'))

// Initialize Mongoose ORM
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
})

module.exports = app
