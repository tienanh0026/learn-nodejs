import { QueryInterface, DataTypes } from 'sequelize'
;('use strict')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn('message', 'type', {
      type: Sequelize.ENUM('1', '2', '3', '4'),
      allowNull: false,
      defaultValue: '1'
    })
    await queryInterface.addColumn('message', 'media', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('message', 'type')
    await queryInterface.removeColumn('message', 'media')
  }
}
