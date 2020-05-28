const Joi = require('@hapi/joi')

module.exports = Joi.object({
  Id: Joi.integer().required(),
  SBI: Joi.string().required(),
  AGREEMENT_CODE: Joi.string().required(),
  AGREEMENT_DESC: Joi.string().required(),
  SCHEME_OPTION: Joi.string().required(),
  SCHEME_OPTION_DESC: Joi.string().required(),
  DURATION: Joi.string().required(),
  AGREEMENT_START_YR: Joi.string().required(),
  AGREEMENT_END_YR: Joi.string().required(),
  AGREEMENT_START_DT: Joi.string().required(),
  AGREEMENT_END_DT: Joi.string().required(),
  PARCEL_ID: Joi.string().required(),
  PARCEL: Joi.string().required(),
  HECTARES: Joi.string().required()
})
