const Joi = require('@hapi/joi')
const databaseConfig = require('./database-config')

// Define config schema
const schema = Joi.object({
  env: Joi.string().valid('development', 'production').default('development'),
  logRequests: Joi.string().valid('true', 'false').default('true'),
  port: Joi.number().default(3004)
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  logRequests: process.env.LOG_REQUESTS,
  port: process.env.PORT
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
const value = {
  ...result.value,
  databaseConfig,
  isDev: result.value.env === 'development',
  isProd: result.value.env === 'production',
  logRequests: result.value.logRequests === 'true'
}

module.exports = value
