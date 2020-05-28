const Joi = require('@hapi/joi')

// Define config schema
const schema = Joi.object({
  env: Joi.string().valid('development', 'production').default('development'),
  logRequests: Joi.string().valid('true', 'false').default('true'),
  port: Joi.number().default(3000),
  staticCacheTimeoutMillis: Joi.number().default(15 * 60 * 1000)
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  logRequests: process.env.LOG_REQUESTS,
  port: process.env.PORT,
  staticCacheTimeoutMillis: process.env.STATIC_CACHE_TIMEOUT_IN_MILLIS
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

value.logRequests = value.logRequests === 'true'

// Add some helper props
value.isDev = value.env === 'development'
value.isProd = value.env === 'production'
module.exports = value
