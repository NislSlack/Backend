//custom morgan middleware
const morgan = require('morgan')
const Logger = require('./winston')


const format = () => {
  const result = 'combined' === 'production' ? 'combined' : 'common'
  return result
}

const stream = { write: (message) => Logger.http(message) }

const skip = (_, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.statusCode < 400
  }
  return false
}

const morganMiddleware = morgan(format(), { stream, skip })

module.exports = morganMiddleware