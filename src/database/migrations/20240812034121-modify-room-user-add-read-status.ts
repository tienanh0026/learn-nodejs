import { DataTypes, QueryInterface } from 'sequelize'
;('use strict')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn('room-user', 'read_at', {
      type: 'timestamp',
      allowNull: true
    })
    await queryInterface.addColumn('room-user', 'last_read_message_id', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.addColumn('room', 'latest_message_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'message',
        key: 'id'
      }
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('room-user', 'read_at')
    await queryInterface.removeColumn('room-user', 'last_read_message_id')
    await queryInterface.removeColumn('room', 'latest_message_id')
  }
}
