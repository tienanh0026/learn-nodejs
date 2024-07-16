import { QueryInterface } from 'sequelize'
;('use strict')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addConstraint('room-user', {
      fields: ['user_id', 'room_id'],
      type: 'unique',
      name: 'unique room user'
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint('room-user', 'unique room user')
  }
}
