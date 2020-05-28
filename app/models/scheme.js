'use strict'
module.exports = (sequelize, DataTypes) => {
  const scheme = sequelize.define('scheme', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    sbi: { field: 'SBI', type: DataTypes.STRING },
    agreementCode: { field: 'AGREEMENT_CODE', type: DataTypes.STRING },
    agreementDesc: { field: 'AGREEMENT_DESC', type: DataTypes.STRING },
    schemeOption: { field: 'SCHEME_OPTION', type: DataTypes.STRING },
    schemeOptionDesc: { field: 'SCHEME_OPTION_DESC', type: DataTypes.STRING },
    duration: { field: 'DURATION', type: DataTypes.STRING },
    agreementStartYear: { field: 'AGREEMENT_START_YR', type: DataTypes.STRING },
    agreementEndYear: { field: 'AGREEMENT_END_YR', type: DataTypes.STRING },
    agreementStartDate: { field: 'AGREEMENT_START_DT', type: DataTypes.DATE },
    agreementEndDate: { field: 'AGREEMENT_END_DT', type: DataTypes.DATE },
    parcelId: { field: 'PARCEL_ID', type: DataTypes.STRING },
    parcel: { field: 'PARCEL', type: DataTypes.STRING },
    hectares: { field: 'HECTARES', type: DataTypes.STRING }
  }, {
    freezeTableName: true,
    tableName: 'scheme'
  })
  scheme.associate = function (models) {
    // associations can be defined here
  }
  return scheme
}
