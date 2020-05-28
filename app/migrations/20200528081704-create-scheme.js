'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('schemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SBI: {
        type: Sequelize.STRING
      },
      AGREEMENT_CODE: {
        type: Sequelize.STRING
      },
      AGREEMENT_DESC: {
        type: Sequelize.STRING
      },
      SCHEME_OPTION: {
        type: Sequelize.STRING
      },
      SCHEME_OPTION_DESC: {
        type: Sequelize.STRING
      },
      DURATION: {
        type: Sequelize.STRING
      },
      AGREEMENT_START_YR: {
        type: Sequelize.STRING
      },
      AGREEMENT_END_YR: {
        type: Sequelize.STRING
      },
      AGREEMENT_START_DT: {
        type: Sequelize.DATE
      },
      AGREEMENT_END_DT: {
        type: Sequelize.DATE
      },
      PARCEL_ID: {
        type: Sequelize.STRING
      },
      PARCEL: {
        type: Sequelize.STRING
      },
      HECTARES: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('schemes')
  }
}
