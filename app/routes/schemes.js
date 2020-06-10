const Joi = require('@hapi/joi')
const schemesService = require('../service/schemes-service')

module.exports = {
  method: 'GET',
  path: '/schemes/{sbi}',
  options: {
    handler: async (request, h) => {
      const { sbi } = request.params
      const schemes = await schemesService.getBySbi(sbi)
      if (schemes.length > 0) {
        const result = {
          items: schemes
        }
        return h.response(result).code(200)
      } else {
        return h.response().code(204)
      }
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
