const db = require('../models')

module.exports = {
  getBySbi: async function (searchSbi) {
    return db.scheme.findAll({
      where: {
        sbi: searchSbi
      }
    })
  },
  create: async function (scheme) {
    return db.scheme.upsert({
      id: scheme.id,
      sbi: scheme.sbi,
      agreementCode: scheme.agreementCode,
      agreementDesc: scheme.agreementDesc,
      schemeOption: scheme.schemeOption,
      schemeOptionDesc: scheme.schemeOptionDesc,
      duration: scheme.duration,
      agreementStartYear: scheme.agreementStartYear,
      agreementEndYear: scheme.agreementEndYear,
      agreementStartDate: scheme.agreementStartDate,
      agreementEndDate: scheme.agreementEndDate,
      parcelId: scheme.parcelId,
      parcel: scheme.parcel,
      hectares: scheme.hectares
    })
  }
}
