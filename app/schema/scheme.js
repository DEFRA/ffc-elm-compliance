const Joi = require('@hapi/joi')

module.exports = Joi.object({
  id: Joi.number().integer(),
  sbi: Joi.string().required(),
  agreementCode: Joi.string().required(),
  agreementDesc: Joi.string().required(),
  schemeOption: Joi.string().required(),
  schemeOptionDesc: Joi.string().required(),
  duration: Joi.string().required(),
  agreementStartYear: Joi.string().required(),
  agreementEndYear: Joi.string().required(),
  agreementStartDate: Joi.string().required(),
  agreementEndDate: Joi.string().required(),
  parcelId: Joi.string().required(),
  parcel: Joi.string().required(),
  hectares: Joi.string()
})
