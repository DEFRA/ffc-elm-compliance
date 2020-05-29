const repo = require('../repository/scheme-repository')

module.exports = {
  getBySbi: async (sbi) => {
    const schemes = await repo.getBySbi(sbi)
    const result = schemes.map(scheme => {
      return {
        sbi: sbi,
        schemeId: scheme.agreementCode,
        dateStart: scheme.dateStart,
        dateEnd: scheme.dateEnd
      }
    })
    return result
  }
}
