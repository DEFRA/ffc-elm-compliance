const Joi = require('@hapi/joi')

module.exports = {
  method: 'GET',
  path: '/schemes/{sbi}',
  options: {
    handler: async (request, h) => {
      const { sbi } = request.params
      console.log(sbi)
      const result = {
        items: [
        ]
      }
      return h.response(result).code(200)
    },
    validate: {
      params: Joi.object({
        sbi: Joi.string().pattern(/^\d{9}$/).required()
      }),
      failAction: async (request, h, error) => {
        console.log('rejected payload', request.payload)
        return h.response().code(400).takeover()
      }

    }
  }
}
