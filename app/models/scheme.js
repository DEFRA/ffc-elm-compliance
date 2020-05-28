'use strict'
module.exports = (sequelize, DataTypes) => {
  const scheme = sequelize.define('scheme', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    SBI: DataTypes.STRING,
    AGREEMENT_CODE: DataTypes.STRING,
    AGREEMENT_DESC: DataTypes.STRING,
    SCHEME_OPTION: DataTypes.STRING,
    SCHEME_OPTION_DESC: DataTypes.STRING,
    DURATION: DataTypes.STRING,
    AGREEMENT_START_YR: DataTypes.STRING,
    AGREEMENT_END_YR: DataTypes.STRING,
    AGREEMENT_START_DT: DataTypes.DATE,
    AGREEMENT_END_DT: DataTypes.DATE,
    PARCEL_ID: DataTypes.STRING,
    PARCEL: DataTypes.STRING,
    HECTARES: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'scheme'
  })
  scheme.associate = function (models) {
    // associations can be defined here
  }
  return scheme
}
