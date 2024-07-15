import { QueryInterface, DataTypes } from 'sequelize'
;('use strict')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn('room', 'type', {
      type: Sequelize.ENUM('1', '2'),
      allowNull: false,
      defaultValue: '1'
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('room', 'type')
  }
}
